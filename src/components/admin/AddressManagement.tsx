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
import {
  PlusOutlined,
  EditOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Popconfirm } from "antd";

const { Title, Text } = Typography;

interface Address {
  id: number;
  street_number: string;
  street_name: string;
  city: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string;
  theaters: any[];
}

const SIZE = 5;

// Mock data (sau này thay bằng API)
const mockAddresses: Address[] = [
  {
    id: 1,
    street_number: "72",
    street_name: "Le Thanh Ton",
    city: "Ho Chi Minh",
    createdAt: "2025-12-01 10:00:00",
    updatedAt: null,
    createdBy: "admin",
    updatedBy: "admin",
    theaters: [],
  },
  {
    id: 2,
    street_number: "101",
    street_name: "Ton Dat Tien",
    city: "Ho Chi Minh",
    createdAt: "2025-12-05 09:30:00",
    updatedAt: null,
    createdBy: "admin",
    updatedBy: "admin",
    theaters: [{}, {}],
  },
];

const AddressManagement: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [open, setOpen] = useState(false);
  const [loading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1);

  const [form] = Form.useForm();

  useEffect(() => {
    // Sau này thay bằng API
    setAddresses(mockAddresses);
  }, [currentPage]);

  const columns = [
    {
      title: "Address",
      key: "address",
      render: (_: any, record: Address) => (
        <Space>
          <EnvironmentOutlined style={{ color: "#1677ff" }} />
          <div>
            <div style={{ fontWeight: 600 }}>
              {record.street_number} {record.street_name}
            </div>
            <Text type="secondary">ID: {record.id}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Theaters",
      key: "theaters",
      render: (_: any, record: Address) => (
        <Tag color="blue">
          {record.theaters ? record.theaters.length : 0} theaters
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
      align: "left" as const,
      render: (_: any, record: Address) => (
        <Space>
          <Button icon={<EditOutlined />} type="text" />

          <Popconfirm
            title="Delete address"
            description="Are you sure you want to delete this address?"
            icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
            // onConfirm={() => handleDelete(record.id)}
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
            Addresses
          </Title>
          <Text type="secondary">Centralized address book for theaters</Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          New Address
        </Button>
      </div>

      {/* TABLE */}
      <Table
        rowKey="id"
        loading={loading}
        dataSource={addresses}
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

      {/* MODAL CREATE ADDRESS */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Create Address"
        okText="Create"
        destroyOnClose
        onOk={() => {
          form.validateFields().then((values) => {
            console.log("Create address:", values);
            setOpen(false);
            form.resetFields();
          });
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Street Number"
            name="street_number"
            rules={[{ required: true, message: "Street number is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Street Name"
            name="street_name"
            rules={[{ required: true, message: "Street name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "City is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddressManagement;
