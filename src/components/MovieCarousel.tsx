import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ChevronRight, Star, Ticket, X } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

const today = new Date();
const formatDate = (d: Date) =>
  d
    .toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    })
    .replace(",", "");

const next7 = Array.from({ length: 7 }).map((_, i) => {
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
const mockTheaters = [
  { id: "cj01", name: "CineJoy Landmark 81", location: "Bình Thạnh, TP.HCM" },
  { id: "cj02", name: "CineJoy Crescent Mall", location: "Q.7, TP.HCM" },
  {
    id: "cj03",
    name: "CineJoy Vincom Bà Triệu",
    location: "Hai Bà Trưng, Hà Nội",
  },
];
const mockTimes = [
  "09:30",
  "11:15",
  "13:45",
  "16:10",
  "18:00",
  "20:30",
  "22:15",
];
const MovieCarousel: React.FC = () => (
  <section id="phim" className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold">Đang chiếu</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Chọn phim và đặt vé chỉ trong vài bước.
        </p>
      </div>
      <a
        href="#lichchieu"
        className="hidden sm:inline-flex items-center text-sm font-medium text-indigo-600 hover:underline"
      >
        Xem lịch chiếu <ChevronRight className="w-4 h-4" />
      </a>
    </div>

    <ScrollArea.Root className="overflow-hidden">
      <ScrollArea.Viewport className="w-full">
        <div className="flex gap-4 pb-4">
          {mockMovies.map((m) => (
            <article key={m.id} className="min-w-[220px] max-w-[220px]">
              <div className="relative">
                <AspectRatio.Root ratio={2 / 3}>
                  <img
                    src={m.poster}
                    alt={m.title}
                    className="h-full w-full rounded-3xl object-cover shadow-xl"
                  />
                </AspectRatio.Root>
                <div className="absolute top-3 left-3 rounded-full bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                  <Star className="w-3 h-3" /> {m.rating}
                </div>
              </div>
              <div className="mt-2 truncate">
                <h3 className="font-semibold truncate">{m.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {m.duration} phút • {m.tags.join(" • ")}
                </p>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <PrimaryButton className="w-full mt-2">
                      <Ticket className="w-4 h-4" /> Đặt vé
                    </PrimaryButton>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-lg font-bold">
                          Chọn suất chiếu — {m.title}
                        </Dialog.Title>
                        <Dialog.Close asChild>
                          <button className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                            <X className="w-5 h-5" />
                          </button>
                        </Dialog.Close>
                      </div>
                      <Tabs.Root defaultValue={next7[0].key}>
                        <Tabs.List className="flex gap-2 overflow-x-auto pb-2">
                          {next7.map((d) => (
                            <Tabs.Trigger
                              key={d.key}
                              value={d.key}
                              className="whitespace-nowrap rounded-xl border px-3 py-1.5 text-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white border-zinc-200 dark:border-zinc-800"
                            >
                              {d.label}
                            </Tabs.Trigger>
                          ))}
                        </Tabs.List>
                        {next7.map((d) => (
                          <Tabs.Content
                            key={d.key}
                            value={d.key}
                            className="mt-4"
                          >
                            <div className="grid sm:grid-cols-2 gap-4">
                              {mockTheaters.map((t) => (
                                <div
                                  key={t.id}
                                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4"
                                >
                                  <div className="mb-2">
                                    <div className="font-semibold">
                                      {t.name}
                                    </div>
                                    <div className="text-xs text-zinc-600 dark:text-zinc-400">
                                      {t.location}
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {mockTimes.map((time) => (
                                      <button
                                        key={time}
                                        className="rounded-md border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                      >
                                        {time}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Tabs.Content>
                        ))}
                      </Tabs.Root>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
            </article>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal" className="h-2">
        <ScrollArea.Thumb className="bg-zinc-300 dark:bg-zinc-700 rounded" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  </section>
);
export default MovieCarousel;
