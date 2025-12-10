import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import authApi from "./service/api-auth";
import { useAuth } from "./store/useAuth";
import { Theme } from "@radix-ui/themes";

const App: React.FC = () => {
  const setUser = useAuth((state) => state.setUser);
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await authApi.fetchAccount();
      if (res.statusCode === 200 && res.data) {
        setUser(res.data);
      }
    };
    fetchAccount();
  }, [setUser]);

  return (
    <Theme
      appearance={mode}
      accentColor="crimson"
      grayColor="sand"
      radius="large"
      scaling="95%"
    >
      <main>
        <Header mode={mode} setMode={setMode} />
        <Outlet />
        <Footer />
      </main>
    </Theme>
  );
};

export default App;
