/* eslint-disable @typescript-eslint/no-explicit-any */
import Brand from "../Brand";
import * as Separator from "@radix-ui/react-separator";
import * as Popover from "@radix-ui/react-popover";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DashboardIcon, GearIcon } from "@radix-ui/react-icons";
import { Moon, Sun } from "lucide-react";
import {
  ChevronRight,
  Clock,
  Film,
  LogOut,
  MapPin,
  Menu,
  Search,
  Smartphone,
  Ticket,
} from "lucide-react";
import AuthDialog from "../AuthDialog";
import { useAuth } from "../../store/useAuth";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import GhostButton from "../GhostButton";
import authApi from "../../service/api-auth";
import { useToast } from "../../hooks/useToast";
import { Link } from "react-router";
import { useDebounce } from "../../hooks/useDebauce";
import filmApi from "../../service/api-film";

type HeaderProps = {
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

const Header: React.FC<HeaderProps> = ({ mode, setMode }) => {
  const user = useAuth((state) => state.user);
  const authenticated = useAuth((state) => state.authenticated);
  const setUser = useAuth((state) => state.setUser);
  const clearUser = useAuth((state) => state.clearUser);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [films, setFilms] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"login" | "register">("login");

  const { success, error } = useToast();

  const handleLogout = async () => {
    const res = await authApi.logout();
    if (res.statusCode === 200) {
      clearUser();
      success("Đăng xuất thành công!");
    } else {
      error("Đăng xuất thất bại!");
    }
  };

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setFilms([]);
      setPage(1);
      setHasMore(true);
      return;
    }

    const fetchFilms = async () => {
      try {
        setLoading(true);

        const res = await filmApi.getAllFilms(page, 5, debouncedSearch);
        const apiWrapper = res.data;
        const newData = apiWrapper?.data || [];
        const meta = apiWrapper?.meta;

        if (page === 1) setFilms(newData);
        else setFilms((prev) => [...prev, ...newData]);

        if (meta) setHasMore(meta.currentPage < meta.totalPages);
        else setHasMore(false);
      } catch (e) {
        console.error("Search error:", e);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [debouncedSearch, page]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur">
      <AuthDialog
        open={open}
        onOpenChange={setOpen}
        mode={dialogMode}
        setUser={setUser}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-6 h-full">
            <Brand />

            <nav className="hidden md:flex items-center h-16 gap-2">
              {[
                { label: "Phim", href: "/movie" },
                { label: "Rạp", href: "/authorium" },
                { label: "Lịch chiếu", href: "#lichchieu" },
                { label: "Ưu đãi", href: "#uudai" },
                { label: "Hỗ trợ", href: "#hotro" },
              ].map((i) => (
                <Link
                  key={i.label}
                  to={i.href}
                  className="
        flex items-center 
        h-16 
        px-3 
        text-sm 
        font-medium 
        rounded-xl
        transition
        hover:opacity-80
      "
                >
                  {i.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ===== DESKTOP ===== */}
          <div className="hidden md:flex items-center gap-4">
            {/* SEARCH */}
            <div className="relative">
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                  setHasMore(true);
                }}
                placeholder="Tìm phim..."
                className="w-64 rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring-2"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />

              {films.length > 0 && (
                <div
                  onScroll={(e) => {
                    const target = e.currentTarget;
                    if (
                      target.scrollTop + target.clientHeight >=
                        target.scrollHeight - 5 &&
                      hasMore &&
                      !loading
                    ) {
                      setPage((prev) => prev + 1);
                    }
                  }}
                  className="
                  absolute top-full mt-2 w-[300px] max-h-[320px]
                  overflow-y-auto
                  rounded-md
                  border
                  shadow-xl
                  z-50
                "
                  style={{
                    backgroundColor: "var(--gray-1)",
                    color: "var(--gray-12)",
                  }}
                >
                  {films.map((film) => (
                    <Link
                      key={film.id}
                      to={`/movie/${film.id}`}
                      className="block px-3 py-4 text-sm"
                      onClick={() => {
                        setSearch("");
                        setFilms([]);
                        setPage(1);
                        setHasMore(true);
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold">{film.name}</span>
                        <span className="text-xs">{film.genre}</span>
                      </div>
                    </Link>
                  ))}

                  {hasMore && loading && (
                    <div className="px-3 py-2 text-xs text-center">
                      Đang tải thêm...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* TOGGLE THEME */}
            <button
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-md border transition"
              title="Toggle Dark Mode"
            >
              {mode === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* USER MENU */}
            {authenticated ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="w-9 h-9 cursor-pointer rounded-full flex items-center justify-center font-semibold transition border-2">
                    {user?.username?.charAt(0)?.toUpperCase()}
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    sideOffset={8}
                    className="min-w-[180px] rounded-md shadow-lg border p-2"
                    style={{
                      backgroundColor: "var(--gray-1)",
                      color: "var(--gray-12)",
                    }}
                  >
                    <DropdownMenu.Label className="px-2 py-1 text-xs">
                      {user?.username}
                    </DropdownMenu.Label>

                    <DropdownMenu.Item className="px-2 py-2 text-sm rounded outline-none cursor-pointer">
                      <Link className="flex items-center gap-2" to="/admin">
                        <DashboardIcon />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item className="px-2 py-2 text-sm rounded outline-none cursor-pointer">
                      <Link className="flex items-center gap-2" to="/setting">
                        <GearIcon />
                        <span>Setting</span>
                      </Link>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="my-2 h-px" />

                    <DropdownMenu.Item
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-2 py-2 text-sm rounded cursor-pointer outline-none"
                    >
                      <LogOut size={16} />
                      Đăng xuất
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <>
                <GhostButton
                  onClick={() => {
                    setDialogMode("login");
                    setOpen(true);
                  }}
                >
                  Đăng nhập
                </GhostButton>
                <PrimaryButton
                  onClick={() => {
                    setDialogMode("register");
                    setOpen(true);
                  }}
                >
                  Đăng ký
                </PrimaryButton>
              </>
            )}
          </div>

          {/* ===== MOBILE ===== */}
          <div className="md:hidden">
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="rounded-xl p-2">
                  <Menu className="w-5 h-5" />
                </button>
              </Popover.Trigger>

              <Popover.Content
                align="end"
                sideOffset={8}
                className="w-[88vw] max-w-sm rounded-2xl border p-4 shadow-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <Brand />
                </div>

                <Separator.Root className="h-px my-2" />

                <nav className="grid gap-1">
                  {[
                    {
                      label: "Phim",
                      href: "#phim",
                      icon: <Film className="w-4 h-4" />,
                    },
                    {
                      label: "Trang phim",
                      href: "/movie",
                      icon: <Film className="w-4 h-4" />,
                    },
                    {
                      label: "Đặt vé",
                      href: "/booking",
                      icon: <Ticket className="w-4 h-4" />,
                    },
                    {
                      label: "Rạp",
                      href: "#rap",
                      icon: <MapPin className="w-4 h-4" />,
                    },
                    {
                      label: "Lịch chiếu",
                      href: "#lichchieu",
                      icon: <Clock className="w-4 h-4" />,
                    },
                    {
                      label: "Ưu đãi",
                      href: "#uudai",
                      icon: <Ticket className="w-4 h-4" />,
                    },
                    {
                      label: "Hỗ trợ",
                      href: "#hotro",
                      icon: <Smartphone className="w-4 h-4" />,
                    },
                  ].map((i) => (
                    <a
                      key={i.label}
                      href={i.href}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
                    >
                      {i.icon}
                      <span>{i.label}</span>
                      <ChevronRight className="ml-auto w-4 h-4" />
                    </a>
                  ))}
                </nav>

                {/* TOGGLE MOBILE */}
                <button
                  onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                  className="flex items-center gap-2 rounded-lg border px-3 py-1 mt-3"
                >
                  {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  {mode === "dark" ? "Light" : "Dark"}
                </button>
              </Popover.Content>
            </Popover.Root>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
