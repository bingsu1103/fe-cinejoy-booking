import {
  Calendar,
  ChevronDown,
  Clock,
  Film,
  MapPin,
  ShieldCheck,
  Star,
  Ticket,
  Youtube,
} from "lucide-react";
import * as Select from "@radix-ui/react-select";
import PrimaryButton from "./PrimaryButton";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

const cities = [
  { value: "hcm", label: "TP.HCM" },
  { value: "hn", label: "Hà Nội" },
  { value: "dn", label: "Đà Nẵng" },
  { value: "ct", label: "Cần Thơ" },
];
const today = new Date();
const formatDate = (d: Date) =>
  d
    .toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    })
    .replace(",", "");

Array.from({ length: 7 }).map((_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() + i);
  return { key: d.toISOString().slice(0, 10), label: formatDate(d) };
});

const mockMovies = [
  {
    id: "mv1",
    title: "Hành Trình Vô Cực",
    rating: 8.6,
    duration: 128,
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1080&auto=format&fit=crop",
    tags: ["Hành động", "Phiêu lưu", "IMAX"],
  },
  {
    id: "mv2",
    title: "Giai Điệu Cuối Thu",
    rating: 7.9,
    duration: 112,
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1080&auto=format&fit=crop",
    tags: ["Tâm lý", "Lãng mạn"],
  },
  {
    id: "mv3",
    title: "Vệ Binh Bầu Trời",
    rating: 8.2,
    duration: 135,
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1080&auto=format&fit=crop",
    tags: ["Viễn tưởng", "3D"],
  },
  {
    id: "mv4",
    title: "Đêm Không Ngủ",
    rating: 7.5,
    duration: 101,
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1080&auto=format&fit=crop",
    tags: ["Kinh dị", "R18"],
  },
];

const Hero: React.FC = () => (
  <section className="relative isolate overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,#c7d2fe_0%,#ffffff_50%,transparent_80%)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,#1f2937_0%,#09090b_60%,transparent_90%)]" />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
            <Youtube className="w-3.5 h-3.5" /> Trailer & suất chiếu mới cập
            nhật mỗi ngày
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Đặt vé xem phim <span className="text-indigo-600">nhanh</span>, chọn
            ghế <span className="text-indigo-600">dễ</span>, trải nghiệm{" "}
            <span className="text-indigo-600">đã</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-prose">
            CineJoy mang đến cho bạn trải nghiệm đặt vé mượt mà, thanh toán an
            toàn và hệ thống rạp hiện đại trên toàn quốc.
          </p>

          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur p-3 shadow-xl">
            <div className="grid md:grid-cols-[1fr_1fr_1fr_auto] gap-2">
              {/* City */}
              <Select.Root defaultValue={cities[0].value}>
                <Select.Trigger
                  aria-label="Chọn thành phố"
                  className="flex w-full items-center justify-between gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-zinc-500" />
                    <Select.Value />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1 shadow-xl">
                    <Select.Viewport className="max-h-64">
                      {cities.map((c) => (
                        <Select.Item
                          key={c.value}
                          value={c.value}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm data-highlighted:bg-zinc-100 dark:data-[highlighted]:bg-zinc-800"
                        >
                          <Select.ItemText>{c.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              {/* Date */}
              <button className="flex items-center justify-between gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-500" />
                  <span>Hôm nay, {formatDate(today)}</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              <PrimaryButton className="w-full md:w-auto">
                <Ticket className="w-4 h-4" />
                Tìm suất chiếu
              </PrimaryButton>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Thanh toán an toàn
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Clock className="w-4 h-4" /> Hoàn vé trong 60 phút
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-br from-indigo-300 to-fuchsia-300 opacity-50 rounded-[3rem]" />
            <div className="grid grid-cols-3 gap-4">
              {mockMovies.slice(0, 3).map((m, idx) => (
                <div
                  key={m.id}
                  className={`relative ${
                    idx === 1
                      ? "translate-y-6"
                      : idx === 2
                      ? "translate-y-12"
                      : ""
                  }`}
                >
                  <AspectRatio.Root ratio={2 / 3}>
                    <img
                      src={m.poster}
                      alt={m.title}
                      className="h-full w-full rounded-3xl object-cover shadow-2xl"
                    />
                  </AspectRatio.Root>
                  <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-black/60 px-3 py-2 text-white backdrop-blur">
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3" /> {m.rating} • {m.duration}{" "}
                      phút
                    </div>
                    <div className="font-semibold text-sm truncate">
                      {m.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default Hero;
