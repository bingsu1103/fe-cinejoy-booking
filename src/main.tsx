import { createRoot } from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import { Theme } from "@radix-ui/themes";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
    <RouterProvider router={router} />
  </Theme>
);
