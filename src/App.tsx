import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import authApi from "./service/api-auth";
import { useAuth } from "./store/useAuth";

const App: React.FC = () => {
  const setUser = useAuth((state) => state.setUser);

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
    <main className="bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default App;
