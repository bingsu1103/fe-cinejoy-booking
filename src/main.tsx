import { createRoot } from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Booking from "./pages/Booking";
import Checkout from "./pages/Checkout";
import ToastProvider from "./components/context/ToastProvider";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashBoard";
import UserManagement from "./components/admin/UserManagement";
import TheaterManagement from "./components/admin/TheaterManagement";
import AuditoriumManagement from "./components/admin/AuditoriumManagement";
import FilmManagement from "./components/admin/FilmManagement";
import ShowtimeManagement from "./components/admin/ShowtimeManagement";
import AddressManagement from "./components/admin/AddressManagement";
import BookingManagement from "./components/admin/BookingManagement";
import { ConfigProvider } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/movie",
        element: <Movie />,
      },
      {
        path: "/movie/:id",
        element: <Movie />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "theaters",
        element: <TheaterManagement />,
      },
      {
        path: "auditoriums",
        element: <AuditoriumManagement />,
      },
      {
        path: "films",
        element: <FilmManagement />,
      },
      {
        path: "showtimes",
        element: <ShowtimeManagement />,
      },
      {
        path: "addresses",
        element: <AddressManagement />,
      },
      {
        path: "bookings",
        element: <BookingManagement />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <ConfigProvider
      theme={{
        token: {
          // ✅ NỀN – TEXT LẤY TỪ RADIX
          colorBgBase: "var(--gray-1)",
          colorTextBase: "var(--gray-12)",

          // ✅ BORDER – DIVIDER
          colorBorder: "var(--gray-6)",
          colorSplit: "var(--gray-6)",

          // ✅ PRIMARY (map theo tone bạn muốn, ví dụ indigo)
          colorPrimary: "#4f46e5",

          // ✅ BACKGROUND CỦA COMPONENT
          colorBgContainer: "var(--gray-2)",
          colorBgElevated: "var(--gray-3)",

          // ✅ TEXT PHỤ
          colorTextSecondary: "var(--gray-10)",

          borderRadius: 8,
        },
      }}
    >
      <ToastProvider />
      <RouterProvider router={router} />
    </ConfigProvider>
  </>
);
