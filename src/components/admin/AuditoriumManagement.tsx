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
  Card,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  BankOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

/* ---------- TYPES ---------- */
interface SeatVariant {
  seatType: string;
  basePrice: number;
  bonus: number;
}

interface Seat {
  id: number;
  seatRow: string;
  number: number;
  status: string;
  seatVariant: SeatVariant;
}

interface Theater {
  id: number;
  name: string;
}

interface Auditorium {
  id: number;
  number: number;
  totalSeats: number;
  theater: Theater;
  seats: Seat[];
}

/* ---------- MOCK DATA ---------- */
const buildSeat = (
  row: string,
  number: number,
  status: string,
  seatType: string
): Seat => ({
  id: Number(row.charCodeAt(0) + "" + number),
  seatRow: row,
  number,
  status,
  seatVariant: {
    seatType,
    basePrice: 90000,
    bonus: seatType === "VIP" ? 30000 : 0,
  },
});

const mockTheaters: Theater[] = [
  { id: 1, name: "CineJoy Vincom Q1" },
  { id: 2, name: "CineJoy Crescent Mall" },
];

const mockAuditoriums: Auditorium[] = [
  {
    id: 1,
    number: 1,
    totalSeats: 40,
    theater: { id: 1, name: "CineJoy Vincom Q1" },
    seats: [
      ...Array.from({ length: 10 }).map((_, i) =>
        buildSeat("A", i + 1, "AVAILABLE", "STANDARD")
      ),
      ...Array.from({ length: 10 }).map((_, i) =>
        buildSeat("B", i + 1, "AVAILABLE", "STANDARD")
      ),
      ...Array.from({ length: 10 }).map((_, i) =>
        buildSeat("C", i + 1, "BOOKED", "VIP")
      ),
      ...Array.from({ length: 10 }).map((_, i) =>
        buildSeat("D", i + 1, "AVAILABLE", "VIP")
      ),
    ],
  },
  {
    id: 2,
    number: 2,
    totalSeats: 60,
    theater: { id: 1, name: "CineJoy Vincom Q1" },
    seats: [],
  },
];

/* ---------- SEAT GRID ---------- */
const SeatGrid: React.FC<{ seats: Seat[] }> = ({ seats }) => {
  const rows = Array.from(new Set(seats.map((s) => s.seatRow)));
  const numbers = Array.from(new Set(seats.map((s) => s.number)));

  return (
    <Card size="small" style={{ marginTop: 12 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        {rows.map((row) => (
          <div key={row} style={{ display: "flex", gap: 6 }}>
            <Text style={{ width: 24 }}>{row}</Text>
            {numbers.map((num) => {
              const seat = seats.find(
                (s) => s.seatRow === row && s.number === num
              );
              const isVip = seat?.seatVariant.seatType.toUpperCase() === "VIP";
              const bg =
                seat?.status === "BOOKED"
                  ? "#999"
                  : isVip
                  ? "#722ed1"
                  : "#52c41a";

              return (
                <div
                  key={num}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    background: bg,
                    color: "#fff",
                    fontSize: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {row}
                  {num}
                </div>
              );
            })}
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <Tag color="blue">SCREEN</Tag>
        </div>
      </Space>
    </Card>
  );
};

/* ---------- MAIN COMPONENT ---------- */
const AuditoriumManagement: React.FC = () => {
  const [theaterId, setTheaterId] = useState<number | null>(null);
  const [auditoriums, setAuditoriums] = useState<Auditorium[]>([]);
  const [selectedAuditorium, setSelectedAuditorium] =
    useState<Auditorium | null>(null);

  const [openCreate, setOpenCreate] = useState(false);
  const [form] = Form.useForm();

  /* ✅ FILTER AUDITORIUM BY THEATER */
  useEffect(() => {
    if (!theaterId) return;

    const filtered = mockAuditoriums.filter((a) => a.theater.id === theaterId);

    setAuditoriums(filtered);
    setSelectedAuditorium(null);
  }, [theaterId]);

  /* ---------- TABLE COLUMNS ---------- */
  const columns = [
    {
      title: "Room",
      dataIndex: "number",
      key: "number",
      render: (v: number) => <Text strong>Room {v}</Text>,
    },
    {
      title: "Seats",
      key: "seats",
      render: (_: any, r: Auditorium) => (
        <Tag color="blue">
          {r.seats.length}/{r.totalSeats}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "right" as const,
      render: (_: any, r: Auditorium) => (
        <Space>
          <Button size="small" onClick={() => setSelectedAuditorium(r)}>
            View
          </Button>
          <Button size="small" icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Title level={3} style={{ marginBottom: 0 }}>
            Auditoriums
          </Title>
          <Text type="secondary">Select theater to manage rooms and seats</Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          disabled={!theaterId}
          onClick={() => setOpenCreate(true)}
        >
          New Auditorium
        </Button>
      </div>

      {/* ✅ SELECT THEATER */}
      <Card style={{ marginTop: 16 }}>
        <Space style={{ width: "100%" }}>
          <BankOutlined />
          <Select
            placeholder="Select theater"
            style={{ width: 320 }}
            onChange={(value) => setTheaterId(value)}
          >
            {mockTheaters.map((t) => (
              <Select.Option key={t.id} value={t.id}>
                {t.name}
              </Select.Option>
            ))}
          </Select>
        </Space>
      </Card>

      {/* ✅ ONLY RENDER AFTER SELECT */}
      {theaterId && (
        <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
          {/* ROOMS */}
          <Card title="Auditoriums" style={{ width: 360 }}>
            <Table
              rowKey="id"
              dataSource={auditoriums}
              columns={columns}
              pagination={false}
              size="small"
            />
          </Card>

          {/* SEATS */}
          <Card
            title={
              selectedAuditorium ? (
                <>
                  Room {selectedAuditorium.number} •{" "}
                  {selectedAuditorium.totalSeats} seats
                </>
              ) : (
                "Seat Layout"
              )
            }
            style={{ flex: 1 }}
          >
            {selectedAuditorium ? (
              <SeatGrid seats={selectedAuditorium.seats} />
            ) : (
              <Text type="secondary">Select a room to configure seats</Text>
            )}
          </Card>
        </div>
      )}

      {/* ✅ CREATE AUDITORIUM MODAL */}
      <Modal
        open={openCreate}
        onCancel={() => setOpenCreate(false)}
        title="Create Auditorium"
        okText="Create"
        destroyOnClose
        onOk={() => {
          form.validateFields().then((values) => {
            console.log(values);
            setOpenCreate(false);
            form.resetFields();
          });
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Room Number"
            name="number"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Total Seats"
            name="totalSeats"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AuditoriumManagement;
