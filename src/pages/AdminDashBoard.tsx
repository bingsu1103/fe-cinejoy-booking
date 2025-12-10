import { Card, Row, Col, Statistic, Tag, Typography, Space, List } from "antd";
import {
  UserOutlined,
  RiseOutlined,
  VideoCameraOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const AdminDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24, width: "100%" }}>
      {/* HEADER */}
      <Space direction="vertical" size={4} style={{ marginBottom: 24 }}>
        <Title level={3}>Dashboard</Title>
        <Text type="secondary">System overview and daily performance</Text>
      </Space>

      {/* KPI */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={1245}
              prefix={<UserOutlined />}
            />
            <Tag color="green" style={{ marginTop: 8 }}>
              +8% this week
            </Tag>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card>
            <Statistic
              title="Bookings Today"
              value={132}
              prefix={<RiseOutlined />}
            />
            <Tag color="gold" style={{ marginTop: 8 }}>
              Peak 19:00
            </Tag>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card>
            <Statistic
              title="Occupancy Rate"
              value={72}
              suffix="%"
              prefix={<VideoCameraOutlined />}
            />
            <Tag color="blue" style={{ marginTop: 8 }}>
              All auditoriums
            </Tag>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card>
            <Statistic
              title="Revenue Today"
              value={34500000}
              prefix={<DollarOutlined />}
              suffix="₫"
            />
            <Tag color="green" style={{ marginTop: 8 }}>
              Estimated
            </Tag>
          </Card>
        </Col>
      </Row>

      {/* INSIGHT */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {/* Top Films */}
        <Col xs={24} lg={12}>
          <Card title="Top Films">
            <List
              dataSource={[
                { name: "Avengers", percent: "96%", color: "green" },
                { name: "Inside Out 2", percent: "89%", color: "blue" },
                { name: "Oppenheimer", percent: "82%", color: "gold" },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Text>{item.name}</Text>
                  <Tag color={item.color}>{item.percent}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Upcoming Showtimes */}
        <Col xs={24} lg={12}>
          <Card title="Upcoming Showtimes">
            <List
              dataSource={[
                { time: "19:00 • Avengers", status: "Fast", color: "green" },
                {
                  time: "20:30 • Inside Out 2",
                  status: "Medium",
                  color: "gold",
                },
                { time: "21:15 • Oppenheimer", status: "Few", color: "red" },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Text>{item.time}</Text>
                  <Tag color={item.color}>{item.status}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
