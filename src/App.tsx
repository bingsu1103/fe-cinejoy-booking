import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router";

const App: React.FC = () => {
  return (
    <main className="bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default App;
