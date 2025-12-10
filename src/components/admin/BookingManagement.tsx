import { useEffect, useState } from "react";
import { Table, Button, Tag, Space, Modal, Typography } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";

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

interface Booking {
  id: number;
  user: User;
  status: "PENDING" | "COMPLETED" | "FAILED";
  total_price: number;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string;
  bookingItems: any[];
  payments: any[];
}

const SIZE = 5;

/* MOCK DATA – sau này thay bằng API */
const mockBookings: Booking[] = [
  {
    id: 101,
    user: {
      id: 2,
      username: "thuong.nguyen",
      email: "thuong@example.com",
      phone: "0912345678",
      role: "USER",
      createdAt: "",
      updatedAt: null,
      createdBy: "",
      updatedBy: "",
      refreshToken: "",
    },
    status: "PENDING",
    total_price: 180000,
    createdAt: "2025-12-10 18:30:00",
    updatedAt: null,
    createdBy: "system",
    updatedBy: "system",
    bookingItems: [],
    payments: [],
  },
  {
    id: 102,
    user: {
      id: 3,
      username: "nam.tran",
      email: "nam@example.com",
      phone: "0987654321",
      role: "USER",
      createdAt: "",
      updatedAt: null,
      createdBy: "",
      updatedBy: "",
      refreshToken: "",
    },
    status: "COMPLETED",
    total_price: 270000,
    createdAt: "2025-12-10 17:00:00",
    updatedAt: null,
    createdBy: "system",
    updatedBy: "system",
    bookingItems: [],
    payments: [],
  },
];

const statusTag = (status: string) => {
  if (status === "COMPLETED") return <Tag color="green">COMPLETED</Tag>;
  if (status === "FAILED") return <Tag color="red">FAILED</Tag>;
  return <Tag color="gold">PENDING</Tag>;
};

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [loading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1);

  useEffect(() => {
    // Sau này thay bằng API
    setBookings(mockBookings);
  }, [currentPage]);

  const columns = [
    {
      title: "Booking",
      key: "booking",
      render: (_: any, record: Booking) => (
        <Space>
          <ShoppingCartOutlined style={{ color: "#1677ff" }} />
          <div>
            <div style={{ fontWeight: 600 }}>#{record.id}</div>
            <Text type="secondary">{record.createdAt}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: "User",
      key: "user",
      render: (_: any, record: Booking) => (
        <div>
          <div style={{ fontWeight: 600 }}>{record.user.username}</div>
          <Text type="secondary">{record.user.email}</Text>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: ["user", "phone"],
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => statusTag(status),
    },
    {
      title: "Total",
      dataIndex: "total_price",
      key: "total_price",
      render: (value: number) => `${value.toLocaleString()}₫`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Booking) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => setSelected(record)}
        >
          Details
        </Button>
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
            Bookings
          </Title>
          <Text type="secondary">Track reservations and payments</Text>
        </div>
      </div>

      {/* TABLE */}
      <Table
        rowKey="id"
        loading={loading}
        dataSource={bookings}
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

      {/* MODAL BOOKING DETAILS */}
      <Modal
        open={!!selected}
        onCancel={() => setSelected(null)}
        footer={[
          <Button key="close" onClick={() => setSelected(null)}>
            Close
          </Button>,
        ]}
        title={`Booking Details #${selected?.id}`}
        destroyOnClose
      >
        {selected && (
          <Space direction="vertical" style={{ width: "100%" }}>
            <div>
              <Text type="secondary">User</Text>
              <div>
                {selected.user.username} • {selected.user.email}
              </div>
            </div>

            <div>
              <Text type="secondary">Phone</Text>
              <div>{selected.user.phone}</div>
            </div>

            <div>
              <Text type="secondary">Status</Text>
              <div>{statusTag(selected.status)}</div>
            </div>

            <div>
              <Text type="secondary">Total</Text>
              <div>{selected.total_price.toLocaleString()}₫</div>
            </div>

            <div>
              <Text type="secondary">Created At</Text>
              <div>{selected.createdAt}</div>
            </div>

            <div>
              <Text type="secondary">Items</Text>
              <Text type="secondary">
                Render booking items & seats here when API is ready.
              </Text>
            </div>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default BookingManagement;
