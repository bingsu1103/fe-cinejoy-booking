import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Typography,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  UserOutlined,
  IeOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import userApi from "../../service/api-user";
import { Popconfirm } from "antd";
import authApi from "../../service/api-auth";
import { useToast } from "../../hooks/useToast";

const { Title, Text } = Typography;

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string;
  refreshToken: string;
}

const SIZE = 5;

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [form] = Form.useForm();
  const { success, error } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await userApi.getAllUsers(currentPage, SIZE);

        const apiData = res.data;

        setUsers(apiData.data);
        setTotalPages(apiData.meta.totalPages);
      } catch (err) {
        console.error("Fetch users failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handleCreateUser = async () => {
    try {
      const values = await form.validateFields();
      console.log("Create user:", values);

      const res = await authApi.register(
        values.username,
        values.email,
        values.password,
        values.phone,
        values.role
      );
      if (res.statusCode === 201) {
        success("Tạo user thành công!");
      } else {
        error("Tạo user thất bại!");
      }

      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.log("Validate failed:", error);
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "username",
      key: "username",
      render: (_: any, record: User) => (
        <Space>
          {record.role === "ADMIN" ? (
            <IeOutlined style={{ color: "#cf1322" }} />
          ) : (
            <UserOutlined style={{ color: "#1677ff" }} />
          )}
          <div>
            <div style={{ fontWeight: 600 }}>{record.username}</div>
            <Text type="secondary">ID: {record.id}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_: any, record: User) => (
        <div>
          <div>{record.email}</div>
          <Text type="secondary">{record.phone}</Text>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) =>
        role === "ADMIN" ? (
          <Tag color="red">ADMIN</Tag>
        ) : (
          <Tag color="blue">USER</Tag>
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
      render: (_: any, record: User) => (
        <Space>
          <Button icon={<EditOutlined />} type="text" />

          <Popconfirm
            title="Delete user"
            description="Are you sure you want to delete this user?"
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
            Users
          </Title>
          <Text type="secondary">Manage accounts and roles</Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          New User
        </Button>
      </div>

      {/* TABLE */}
      <Table
        rowKey="id"
        loading={loading}
        dataSource={users}
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

      {/* MODAL CREATE USER */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Create User"
        okText="Create"
        destroyOnClose
        onOk={handleCreateUser}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="CUSTOMER">CUSTOMER</Select.Option>
              <Select.Option value="ADMIN">ADMIN</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
