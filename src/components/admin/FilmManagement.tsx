import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Popconfirm,
  message,
  Image,
  Typography,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import filmApi from "../../service/api-film";
import { useToast } from "../../hooks/useToast";

const { Title, Text } = Typography;

interface Film {
  id: number;
  title: string;
  description: string;
  duration: number;
  releaseDate: string;
  status: "NOW_SHOWING" | "COMING_SOON" | "STOPPED";
  posterUrl: string;
}

const SIZE = 15;

const FilmManagement = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingFilm, setEditingFilm] = useState<Film | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [form] = Form.useForm();
  const { success, error } = useToast();

  const fetchFilms = async () => {
    try {
      setLoading(true);

      // giống user: page - 1
      const res = await filmApi.getAllFilms(currentPage, SIZE);
      const apiData = res.data;

      setFilms(apiData.data);
      setTotalPages(apiData.meta.totalPages);
    } catch {
      message.error("Lỗi tải danh sách phim");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, [currentPage]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingFilm) {
        // const res = await filmApi.update(editingFilm.id, values);
        // if (res.statusCode === 200) {
        //   message.success(res.message || "Cập nhật thành công");
        // } else {
        //   message.error(res.message || "Cập nhật thất bại");
        //   return;
        // }
        return;
      } else {
        const res = await filmApi.createFilm(values);

        if (res.statusCode === 201) {
          success(res.message || "Thêm phim thành công");
        } else {
          error(res.message || "Thêm phim thất bại");
          return;
        }
      }

      setOpen(false);
      setEditingFilm(null);
      form.resetFields();
      fetchFilms();
    } catch (e: any) {
      const msg = e?.response?.data?.message || e?.message || "Có lỗi xảy ra";
      error(msg);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      //   await filmApi.delete(id);
      message.success("Xóa thành công");
      fetchFilms();
    } catch {
      message.error("Xóa thất bại");
    }
  };

  const columns = [
    {
      title: "Poster",
      dataIndex: "posterUrl",
      render: (url: string) => <Image width={60} src={url} />,
    },
    { title: "Tên phim", dataIndex: "name" },
    { title: "Thời lượng", dataIndex: "duration" },
    { title: "Ngày chiếu", dataIndex: "releaseDate" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) =>
        status === "SHOWING"
          ? "SHOWING"
          : status === "UPCOMING"
          ? "UPCOMING"
          : "ENDED",
    },
    {
      title: "Hành động",
      render: (_: any, record: Film) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="text"
            onClick={() => {
              setEditingFilm(record);
              setOpen(true);
              form.setFieldsValue(record);
            }}
          />

          <Popconfirm
            title="Xóa phim"
            description="Bạn có chắc muốn xóa phim này?"
            icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
            okText="Xóa"
            okButtonProps={{ danger: true }}
            cancelText="Hủy"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <Title level={3} style={{ marginBottom: 0 }}>
            Films
          </Title>
          <Text type="secondary">Manage movies</Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setOpen(true);
            setEditingFilm(null);
            form.resetFields();
          }}
        >
          New Film
        </Button>
      </div>

      {/* TABLE */}
      <Table
        rowKey="id"
        loading={loading}
        dataSource={films}
        columns={columns}
        pagination={false}
        bordered
      />

      {/* PAGINATION (GIỐNG USER) */}
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

      {/* MODAL CREATE / UPDATE */}
      <Modal
        title={editingFilm ? "Cập nhật phim" : "Thêm phim"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
        destroyOnHidden
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Tên phim" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Thời lượng (phút)"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="release_date"
            label="Ngày chiếu"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item name="genre" label="Thể loại" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="language"
            label="Ngôn ngữ"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: "ENGLISH", label: "ENGLISH" },
                { value: "VIETNAMESE", label: "VIETNAMESE" },
              ]}
            />
          </Form.Item>

          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: "UPCOMING", label: "UPCOMING" },
                { value: "SHOWING", label: "SHOWING" },
                { value: "ENDED", label: "ENDED" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FilmManagement;
