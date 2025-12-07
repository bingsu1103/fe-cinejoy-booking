import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import PrimaryButton from "../components/PrimaryButton";

const mockMovies = [
  {
    id: "mv1",
    title: "Hành Trình Vô Cực",
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: "mv2",
    title: "Giai Điệu Cuối Thu",
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: "mv3",
    title: "Vệ Binh Bầu Trời",
    poster:
      "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: "mv4",
    title: "Đêm Không Ngủ",
    poster:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1080&auto=format&fit=crop",
  },
];

const mockTimes = ["09:30", "11:15", "13:45", "16:10", "18:00", "20:30"];

const regions = [
  {
    id: "hcm",
    name: "Hồ Chí Minh",
    addresses: [
      {
        id: "hcm-binhthanh",
        name: "Bình Thạnh",
        theaters: ["CineJoy Landmark 81"],
      },
      { id: "hcm-q7", name: "Quận 7", theaters: ["CineJoy Crescent Mall"] },
    ],
  },
  {
    id: "hn",
    name: "Hà Nội",
    addresses: [
      {
        id: "hn-batrieu",
        name: "Hai Bà Trưng",
        theaters: ["CineJoy Vincom Bà Triệu"],
      },
      {
        id: "hn-thanhxuan",
        name: "Thanh Xuân",
        theaters: ["CineJoy Royal City"],
      },
    ],
  },
];

const Booking: React.FC = () => {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const movieId = params.get("movieId") || undefined;
  const movie = mockMovies.find((m) => m.id === movieId) || mockMovies[0];

  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedAddress, setSelectedAddress] = useState<string>("all");
  const [selectedTheater, setSelectedTheater] = useState<string>("all");
  const [selectedTime, setSelectedTime] = useState<string>(mockTimes[0]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const navigate = useNavigate();

  const addresses = useMemo(() => {
    if (selectedRegion === "all") return [];
    const r = regions.find((x) => x.id === selectedRegion);
    return r ? r.addresses : [];
  }, [selectedRegion]);

  const theaters = useMemo(() => {
    if (selectedAddress === "all") return [];
    const a = addresses.find((x) => x.id === selectedAddress);
    return a ? a.theaters : [];
  }, [selectedAddress, addresses]);

  const toggleSeat = (s: string) => {
    setSelectedSeats((prev) =>
      prev.includes(s) ? prev.filter((p) => p !== s) : [...prev, s]
    );
  };

  const rows = ["A", "B", "C", "D", "E"];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="min-h-screen mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full sm:w-56 rounded-2xl object-cover shadow"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Đặt vé — {movie.title}</h2>

          <div className="mt-4 rounded-2xl border p-4">
            <div className="mb-3 text-sm text-zinc-600">Chọn khu vực</div>
            <select
              className="w-full rounded-xl border px-3 py-2"
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedAddress("all");
                setSelectedTheater("all");
              }}
            >
              <option value="all">Chọn khu vực</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            <div className="mt-3 text-sm text-zinc-600">Chọn địa chỉ</div>
            <select
              className="w-full rounded-xl border px-3 py-2"
              value={selectedAddress}
              onChange={(e) => {
                setSelectedAddress(e.target.value);
                setSelectedTheater("all");
              }}
            >
              <option value="all">Chọn địa chỉ</option>
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>

            <div className="mt-3 text-sm text-zinc-600">Chọn rạp</div>
            <select
              className="w-full rounded-xl border px-3 py-2"
              value={selectedTheater}
              onChange={(e) => setSelectedTheater(e.target.value)}
            >
              <option value="all">Chọn rạp</option>
              {theaters.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <div className="mt-4">
              <div className="text-sm text-zinc-600">Chọn suất</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {mockTimes.map((time) => (
                  <button
                    key={time}
                    className={`rounded-md border px-3 py-1.5 text-sm ${
                      selectedTime === time ? "bg-indigo-600 text-white" : ""
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {selectedTime && (
              <div className="mt-6">
                <div className="text-sm font-medium mb-2">Chọn ghế</div>
                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl">
                  <div className="mb-3 text-xs text-zinc-500">Màn hình</div>
                  <div className="mb-4 h-2 bg-zinc-200 rounded" />
                  <div className="grid gap-2">
                    {rows.map((r) => (
                      <div key={r} className="flex gap-2 justify-center">
                        {cols.map((c) => {
                          const seat = `${r}${c}`;
                          const selected = selectedSeats.includes(seat);
                          return (
                            <button
                              key={seat}
                              onClick={() => toggleSeat(seat)}
                              className={`w-9 h-9 rounded ${
                                selected
                                  ? "bg-indigo-600 text-white"
                                  : "bg-white border"
                              }`}
                            >
                              {c}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm">
                    Ghế đã chọn: {selectedSeats.join(", ") || "Chưa chọn"}
                  </div>
                  <PrimaryButton
                    onClick={() => {
                      if (!selectedTheater || selectedTheater === "all") {
                        alert("Vui lòng chọn rạp");
                        return;
                      }
                      if (!selectedSeats.length) {
                        alert("Vui lòng chọn ghế");
                        return;
                      }
                      const q = new URLSearchParams();
                      q.set("movieId", movie.id);
                      q.set("theater", selectedTheater);
                      q.set("time", selectedTime);
                      q.set("seats", selectedSeats.join(","));
                      navigate(`/checkout?${q.toString()}`);
                    }}
                  >
                    Xác nhận
                  </PrimaryButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
