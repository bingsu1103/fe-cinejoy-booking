import { Box, Flex, Button, Text, Avatar } from "@radix-ui/themes";
import {
  FileIcon,
  HomeIcon,
  PersonIcon,
  SewingPinIcon,
  StopwatchIcon,
  LayersIcon,
  ClipboardIcon,
} from "@radix-ui/react-icons";
import { Link, useLocation, Outlet } from "react-router";
import { ArrowLeftFromLine, LogOut } from "lucide-react";
import { useAuth } from "../../store/useAuth"; // ✅ IMPORT STORE
import { Card, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import AvatarGroup from "antd/es/avatar/AvatarGroup";

const navItems = [
  { label: "Overview", icon: HomeIcon, to: "/admin" },
  { label: "Users", icon: PersonIcon, to: "/admin/users" },
  { label: "Theaters", icon: SewingPinIcon, to: "/admin/theaters" },
  { label: "Auditoriums", icon: LayersIcon, to: "/admin/auditoriums" },
  { label: "Films", icon: FileIcon, to: "/admin/films" },
  { label: "Showtimes", icon: StopwatchIcon, to: "/admin/showtimes" },
  { label: "Addresses", icon: SewingPinIcon, to: "/admin/addresses" },
  { label: "Bookings", icon: ClipboardIcon, to: "/admin/bookings" },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();

  // ✅ LẤY USER TỪ STORE
  const user = useAuth((state) => state.user);
  const clearUser = useAuth((state) => state.clearUser);

  return (
    <Flex className="w-full min-h-screen overflow-hidden">
      {/* SIDEBAR */}
      <Box className="w-64 shrink-0 border-r-2 border-[#ECECEC] flex flex-col">
        {/* BACK HOME */}
        <Box className="px-6 py-5 border-b-2 border-[#ECECEC]">
          <Link to="/">
            <ArrowLeftFromLine />
          </Link>
        </Box>

        {/* NAV */}
        <Box className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;

            const active =
              location.pathname === item.to ||
              location.pathname === `${item.to}/`;

            const itemClass =
              "px-3 py-2 rounded-lg text-sm flex items-center gap-3 transition " +
              (active ? "shadow bg-slate-100" : "hover:bg-slate-100");

            return (
              <Link key={item.to} to={item.to}>
                <div className={itemClass}>
                  <Icon />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </Box>

        {/* ✅ USER INFO + LOGOUT */}
        <div
          style={{
            padding: 16,
            borderTop: "2px solid #ECECEC",
          }}
        >
          {user ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Typography.Text strong>{user.username}</Typography.Text>

              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {user.email}
              </Typography.Text>

              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {/* Role: {user.} */}
              </Typography.Text>
            </div>
          ) : (
            <Typography.Text
              type="secondary"
              style={{ textAlign: "center", display: "block" }}
            >
              Not logged in
            </Typography.Text>
          )}
        </div>
      </Box>

      {/* MAIN */}
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Box className="flex-1 overflow-y-auto p-6">
          <Box className="max-w-7xl mx-auto w-full">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminLayout;
