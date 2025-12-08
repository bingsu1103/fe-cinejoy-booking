import { createRoot } from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Booking from "./pages/Booking";
import Checkout from "./pages/Checkout";
import { Theme } from "@radix-ui/themes";
import ToastProvider from "./components/context/ToastProvider";

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
]);

createRoot(document.getElementById("root")!).render(
  <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
    <ToastProvider />
    <RouterProvider router={router} />
  </Theme>
);
