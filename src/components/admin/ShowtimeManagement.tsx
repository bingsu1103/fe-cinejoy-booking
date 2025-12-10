/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  DatePicker,
  TimePicker,
  Select,
  Space,
  Popconfirm,
  message,
  Typography,
  Divider,
  Row,
  Col,
  Modal,
  Input,
} from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import showtimeApi from "../../service/api-showtime";
import filmApi from "../../service/api-film";
import auditoriumApi from "../../service/api-auditorium";
import theaterApi from "../../service/api-theater";
import addressApi from "../../service/api-address";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const SIZE = 5;

const ShowtimeManagement = () => {
  // ===== TABLE DATA =====
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ===== CASCADE DATA =====
  const [addresses, setAddresses] = useState<any[]>([]);
  const [theaters, setTheaters] = useState<any[]>([]);
  const [auditoriums, setAuditoriums] = useState<any[]>([]);

  // ===== FILM MODAL =====
  const [films, setFilms] = useState<any[]>([]);
  const [filmModalOpen, setFilmModalOpen] = useState(false);
  const [filmPage, setFilmPage] = useState(1);
  const [filmTotalPages, setFilmTotalPages] = useState(1);
  const [filmKeyword, setFilmKeyword] = useState("");
  const [filmSelected, setFilmSelected] = useState<any>(null);

  // ===== PAGINATION =====
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [form] = Form.useForm();

  // ================= FETCH SHOWTIME =================
  const fetchShowtimes = async () => {
    try {
      setLoading(true);
      const res = await showtimeApi.getAll(currentPage - 1, SIZE);
      setShowtimes(res.data.data);
      setTotalPages(res.data.meta.totalPages);
    } catch {
      message.error("Lỗi tải suất chiếu");
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH ROOT DATA =================
  const fetchAddresses = async () => {
    const res = await addressApi.getAllAddresses();
    setAddresses(res.data.data);
  };

  useEffect(() => {
    fetchShowtimes();
  }, [currentPage]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  // ================= CASCADE SELECT =================
  const handleAddressChange = async (addressId: number) => {
    form.setFieldsValue({ theaterId: null, auditoriumId: null });
    setAuditoriums([]);

    // const res = await theaterApi.getByAddress(addressId);
    // setTheaters(res.data.data);
  };

  const handleTheaterChange = async (theaterId: number) => {
    form.setFieldsValue({ auditoriumId: null });

    // const res = await auditoriumApi.getByTheater(theaterId);
    // setAuditoriums(res.data.data);
  };

  // ================= FILM MODAL =================
  const fetchFilmsForModal = async () => {
    try {
      const res = await filmApi.getAllFilms(filmPage, 5, filmKeyword);
      setFilms(res.data.data);
      setFilmTotalPages(res.data.meta.totalPages);
    } catch {
      message.error("Lỗi tải danh sách phim");
    }
  };

  useEffect(() => {
    if (filmModalOpen) {
      fetchFilmsForModal();
    }
  }, [filmModalOpen, filmPage, filmKeyword]);

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    const values = await form.validateFields();

    const payload = {
      filmId: values.filmId,
      auditoriumId: values.auditoriumId,
      date: values.date.format("YYYY-MM-DD"),
      startTime: values.startTime.format("HH:mm:ss"),
      endTime: values.endTime.format("HH:mm:ss"),
      status: values.status,
    };

    try {
      await showtimeApi.create(payload);
      message.success("Tạo suất chiếu thành công");
      form.resetFields();
      setFilmSelected(null);
      fetchShowtimes();
    } catch {
      message.error("Tạo suất chiếu thất bại");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    try {
      await showtimeApi.delete(id);
      message.success("Xóa thành công");
      fetchShowtimes();
    } catch {
      message.error("Xóa thất bại");
    }
  };

  // ================= TABLE =================
  const columns = [
    { title: "Film", dataIndex: ["film", "title"] },
    { title: "Phòng", dataIndex: ["auditorium", "name"] },
    { title: "Ngày", dataIndex: "date" },
    { title: "Bắt đầu", dataIndex: "startTime" },
    { title: "Kết thúc", dataIndex: "endTime" },
    { title: "Trạng thái", dataIndex: "status" },
    {
      title: "Hành động",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Xóa suất chiếu?"
          icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger type="text" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Showtimes</Title>

      {/* ===== TABLE ===== */}
      <Table
        rowKey="id"
        loading={loading}
        dataSource={showtimes}
        columns={columns}
        pagination={false}
        bordered
      />

      {/* ===== PAGINATION ===== */}
      <div style={{ marginTop: 16, textAlign: "right" }}>
        <Space>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>
          <Text>
            Page {currentPage} / {totalPages}
          </Text>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </Space>
      </div>

      {/* ===== FORM CREATE ===== */}
      <Divider />
      <Title level={4}>Tạo suất chiếu</Title>

      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="addressId"
              label="Tỉnh / Thành"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Chọn tỉnh"
                onChange={handleAddressChange}
                options={addresses.map((a) => ({
                  value: a.id,
                  label: a.name,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="theaterId"
              label="Rạp"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Chọn rạp"
                onChange={handleTheaterChange}
                options={theaters.map((t) => ({
                  value: t.id,
                  label: t.name,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="auditoriumId"
              label="Phòng chiếu"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Chọn phòng"
                options={auditoriums.map((a) => ({
                  value: a.id,
                  label: a.name,
                }))}
              />
            </Form.Item>
          </Col>

          {/* ===== FILM BUTTON ===== */}
          <Col span={6}>
            <Form.Item label="Phim" required>
              <Space>
                <Input
                  value={filmSelected?.title || ""}
                  placeholder="Chưa chọn phim"
                  disabled
                />

                <Button onClick={() => setFilmModalOpen(true)}>
                  Chọn phim
                </Button>
              </Space>
            </Form.Item>

            <Form.Item
              name="filmId"
              hidden
              rules={[{ required: true, message: "Vui lòng chọn phim" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="date"
              label="Ngày chiếu"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="startTime"
              label="Giờ bắt đầu"
              rules={[{ required: true }]}
            >
              <TimePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="endTime"
              label="Giờ kết thúc"
              rules={[{ required: true }]}
            >
              <TimePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: "UPCOMING", label: "Sắp chiếu" },
                  { value: "ACTIVE", label: "Đang chiếu" },
                  { value: "CANCELLED", label: "Hủy" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" onClick={handleSubmit}>
          Tạo suất chiếu
        </Button>
      </Form>

      {/* ===== FILM MODAL ===== */}
      <Modal
        open={filmModalOpen}
        onCancel={() => setFilmModalOpen(false)}
        title="Chọn phim"
        footer={null}
        width={900}
        destroyOnHidden
      >
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Tìm theo tên phim..."
            value={filmKeyword}
            onChange={(e) => {
              setFilmPage(1);
              setFilmKeyword(e.target.value);
            }}
            style={{ width: 300 }}
          />
        </Space>

        <Table
          rowKey="id"
          dataSource={films}
          pagination={false}
          columns={[
            { title: "ID", dataIndex: "id", width: 70 },
            { title: "Tên phim", dataIndex: "title" },
            { title: "Thời lượng", dataIndex: "duration", width: 120 },
            {
              title: "Action",
              width: 120,
              render: (_: any, record: any) => (
                <Button
                  type="primary"
                  onClick={() => {
                    setFilmSelected(record); // hiển thị
                    form.setFieldsValue({ filmId: record.id }); // gán form thật
                    setFilmModalOpen(false);
                  }}
                >
                  Chọn
                </Button>
              ),
            },
          ]}
        />

        <div style={{ marginTop: 16, textAlign: "right" }}>
          <Space>
            <Button
              disabled={filmPage === 1}
              onClick={() => setFilmPage((p) => p - 1)}
            >
              Prev
            </Button>

            <Text>
              Page {filmPage} / {filmTotalPages}
            </Text>

            <Button
              disabled={filmPage === filmTotalPages}
              onClick={() => setFilmPage((p) => p + 1)}
            >
              Next
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default ShowtimeManagement;
