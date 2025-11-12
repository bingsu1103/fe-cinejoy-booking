import Brand from "../Brand";
import * as Separator from "@radix-ui/react-separator";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Popover from "@radix-ui/react-popover";
import {
  ChevronRight,
  Clock,
  Film,
  MapPin,
  Menu,
  Search,
  Smartphone,
  Ticket,
} from "lucide-react";
import AuthDialog from "../AuthDialog";

const Header: React.FC = () => (
  <header className="sticky top-0 z-50 w-full backdrop-blur supports-backdrop-filter:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60 bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-100 dark:border-zinc-800">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex h-16 items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <Brand />
          <nav className="hidden md:block">
            <NavigationMenu.Root>
              <NavigationMenu.List className="flex items-center gap-1">
                {[
                  { label: "Phim", href: "#phim" },
                  { label: "Rạp", href: "#rap" },
                  { label: "Lịch chiếu", href: "#lichchieu" },
                  { label: "Ưu đãi", href: "#uudai" },
                  { label: "Hỗ trợ", href: "#hotro" },
                ].map((i) => (
                  <NavigationMenu.Item key={i.label}>
                    <a
                      href={i.href}
                      className="inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {i.label}
                    </a>
                  </NavigationMenu.Item>
                ))}
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <input
              placeholder="Tìm phim, rạp, diễn viên…"
              className="w-64 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          </div>
          <AuthDialog mode="login" />
          <AuthDialog mode="register" />
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                aria-label="Menu"
                className="rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <Menu className="w-5 h-5" />
              </button>
            </Popover.Trigger>
            <Popover.Content
              align="end"
              sideOffset={8}
              className="w-[88vw] max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <Brand />
                <div className="flex items-center gap-2">
                  <AuthDialog mode="login" />
                  <AuthDialog mode="register" />
                </div>
              </div>
              <Separator.Root className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
              <nav className="grid gap-1">
                {[
                  {
                    label: "Phim",
                    href: "#phim",
                    icon: <Film className="w-4 h-4" />,
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
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {i.icon}
                    <span>{i.label}</span>
                    <ChevronRight className="ml-auto w-4 h-4" />
                  </a>
                ))}
              </nav>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
    </div>
  </header>
);
export default Header;
