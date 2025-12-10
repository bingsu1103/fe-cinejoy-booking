/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Typography,
} from "antd";
import { PlusOutlined, EditOutlined, BankOutlined } from "@ant-design/icons";
import theaterApi from "../../service/api-theater";

const { Title, Text } = Typography;

interface Theater {
  id: number;
  name: string;
  address?: {
    id: number;
    street_number: string;
    street_name: string;
    city: string;
  };
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string;
  auditoriums?: any[];
}

const PAGE_SIZE = 5;

const TheaterManagement: React.FC = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        setLoading(true);

        const res = await theaterApi.getAllTheaters(currentPage - 1, PAGE_SIZE);

        const apiData = res.data;

        setTheaters(apiData.data);
        setTotalPages(apiData.meta.totalPages);
      } catch (err) {
        console.error("Fetch theaters failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, [currentPage]);

  // ✅ TABLE COLUMNS
  const columns = [
    {
      title: "Theater",
      key: "theater",
      render: (_: any, record: Theater) => (
        <Space>
          <BankOutlined style={{ color: "#1677ff" }} />
          <div>
            <div style={{ fontWeight: 600 }}>{record.name}</div>
            <Text type="secondary">ID: {record.id}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Address",
      key: "address",
      render: (_: any, record: Theater) =>
        record.address ? (
          <div>
            <div>
              {record.address.street_number} {record.address.street_name}
            </div>
            <Text type="secondary">{record.address.city}</Text>
          </div>
        ) : (
          <Text type="secondary">N/A</Text>
        ),
    },
    {
      title: "Auditoriums",
      key: "auditoriums",
      render: (_: any, record: Theater) => (
        <Tag color="blue">
          {record.auditoriums ? record.auditoriums.length : 0} rooms
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      align: "right" as const,
      render: () => <Button icon={<EditOutlined />} type="text" />,
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
            Theaters
          </Title>
          <Text type="secondary">Manage theaters and locations</Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          New Theater
        </Button>
      </div>

      {/* TABLE */}
      <Table
        rowKey="id"
        loading={loading}
        dataSource={theaters}
        columns={columns}
        pagination={false}
        bordered
      />

      {/* PAGINATION */}
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

      {/* MODAL CREATE THEATER */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Create Theater"
        okText="Create"
        destroyOnClose
        onOk={() => {
          form.validateFields().then((values) => {
            console.log("Create theater:", values);
            setOpen(false);
            form.resetFields();
          });
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Theater name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Street number"
            name="street_number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Street name"
            name="street_name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="City" name="city" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TheaterManagement;
