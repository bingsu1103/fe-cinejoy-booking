import * as Tabs from "@radix-ui/react-tabs";
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
const Showtime: React.FC = () => (
  <section
    id="lichchieu"
    className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12"
  >
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold">Lịch chiếu hôm nay</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Chọn rạp và khung giờ phù hợp.
        </p>
      </div>
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
        <Tabs.Content key={d.key} value={d.key} className="mt-4">
          <div className="grid lg:grid-cols-3 gap-4">
            {mockTheaters.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4"
              >
                <div className="mb-3">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    {t.location}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mockTimes.map((time) => (
                    <button
                      key={time}
                      className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
  </section>
);
export default Showtime;
