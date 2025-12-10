import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Select, Button } from "antd";
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
];

const mockTimes = ["09:30", "11:15", "13:45", "16:10", "18:00", "20:30"];

const regions = [
  {
    id: "hcm",
    name: "Hồ Chí Minh",
    theaters: ["CineJoy Landmark 81", "CineJoy Crescent Mall"],
  },
];

const Booking: React.FC = () => {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const movieId = params.get("movieId") || undefined;
  const movie = mockMovies.find((m) => m.id === movieId) || mockMovies[0];

  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTheater, setSelectedTheater] = useState("all");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const [holdVisible, setHoldVisible] = useState(false);
  const [countdown, setCountdown] = useState(300);

  const navigate = useNavigate();
  const PRICE = {
    NORMAL: 70000,
    VIP: 90000,
  };

  const getSeatPrice = (row: string) => {
    return row === "D" || row === "E" ? PRICE.VIP : PRICE.NORMAL;
  };

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => {
      const row = seat.charAt(0);
      return sum + getSeatPrice(row);
    }, 0);
  }, [selectedSeats]);

  const theaters = useMemo(() => {
    const r = regions.find((x) => x.id === selectedRegion);
    return r ? r.theaters : [];
  }, [selectedRegion]);

  const toggleSeat = (s: string) => {
    setSelectedSeats((prev) =>
      prev.includes(s) ? prev.filter((p) => p !== s) : [...prev, s]
    );
  };

  const rows = ["A", "B", "C", "D", "E"];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];

  // ✅ CHỈ 2 LOẠI GHẾ: THƯỜNG & VIP (D, E là VIP)
  const getSeatClass = (row: string) => {
    const isVip = row === "D" || row === "E";

    return isVip
      ? "bg-yellow-300 text-yellow-900" // VIP
      : "bg-zinc-200 text-zinc-800"; // Thường
  };

  // ✅ ĐẾM NGƯỢC GIỮ GHẾ
  useEffect(() => {
    if (!holdVisible) return;

    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(t);
          setHoldVisible(false);
          setSelectedSeats([]);
          alert("Hết thời gian giữ ghế!");
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [holdVisible]);

  const handleConfirmSeats = () => {
    setHoldVisible(true);
    setCountdown(300);
  };

  const handlePayment = () => {
    const q = new URLSearchParams();
    q.set("movieId", movie.id);
    q.set("theater", selectedTheater);
    q.set("time", selectedTime!);
    q.set("seats", selectedSeats.join(","));
    navigate(`/checkout?${q.toString()}`);
  };

  return (
    <section className="min-h-screen mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* ✅ ẢNH PHIM CỐ ĐỊNH */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-[220px] h-[320px] object-cover rounded-2xl shadow shrink-0"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-bold">Đặt vé — {movie.title}</h2>

          <div className="mt-4 rounded-md border p-4">
            {/* ✅ KHU VỰC */}
            <div className="text-sm mb-1">Chọn khu vực</div>
            <Select
              value={selectedRegion}
              className="w-full mb-3"
              onChange={(v) => {
                setSelectedRegion(v);
                setSelectedTheater("all");
                setSelectedTime(null);
                setSelectedSeats([]);
              }}
              options={[
                { value: "all", label: "Chọn khu vực" },
                ...regions.map((r) => ({
                  value: r.id,
                  label: r.name,
                })),
              ]}
            />

            {/* ✅ RẠP */}
            {selectedRegion !== "all" && (
              <>
                <div className="text-sm mb-1">Chọn rạp</div>
                <Select
                  value={selectedTheater}
                  className="w-full mb-3"
                  onChange={(v) => {
                    setSelectedTheater(v);
                    setSelectedTime(null);
                    setSelectedSeats([]);
                  }}
                  options={[
                    { value: "all", label: "Chọn rạp" },
                    ...theaters.map((t) => ({
                      value: t,
                      label: t,
                    })),
                  ]}
                />
              </>
            )}

            {/* ✅ SUẤT CHIẾU */}
            {selectedTheater !== "all" && (
              <>
                <div className="text-sm mb-1">Chọn suất chiếu</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mockTimes.map((time) => (
                    <Button
                      key={time}
                      type={selectedTime === time ? "primary" : "default"}
                      onClick={() => {
                        setSelectedTime(time);
                        setSelectedSeats([]);
                      }}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </>
            )}

            {/* ✅ GHẾ + MÀN HÌNH */}
            {selectedTime && (
              <>
                <div className="text-sm mb-2 font-medium">Chọn ghế</div>

                {/* ✅ MÀN HÌNH */}
                <div className="mb-4 flex flex-col items-center">
                  <div className="w-full max-w-xs h-3  rounded-full" />
                  <div className="mt-1 text-xs text-zinc-500">Màn hình</div>
                </div>

                {/* ✅ SƠ ĐỒ GHẾ CÓ HÀNG A–E */}
                <div className="p-4 rounded-xl">
                  {/* Header số ghế */}
                  <div className="flex justify-center mb-2 gap-2 text-xs text-zinc-500">
                    <span className="w-6" /> {/* chừa chỗ cho label hàng */}
                    {cols.map((c) => (
                      <span key={c} className="w-9 text-center">
                        {c}
                      </span>
                    ))}
                  </div>

                  {rows.map((r) => (
                    <div
                      key={r}
                      className="flex gap-2 justify-center items-center mb-2"
                    >
                      {/* Label hàng A/B/C/D/E */}
                      <span className="w-6 text-xs font-medium text-zinc-600">
                        {r}
                      </span>

                      {cols.map((c) => {
                        const seat = `${r}${c}`;
                        const selected = selectedSeats.includes(seat);

                        return (
                          <Button
                            key={seat}
                            type={selected ? "primary" : "default"}
                            onClick={() => toggleSeat(seat)}
                            className={`!w-9 !h-9 !p-0 ${
                              selected ? "" : getSeatClass(r)
                            }`}
                          >
                            {c}
                          </Button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* ✅ CHÚ THÍCH */}
                <div className="mt-4 flex gap-6 flex-wrap text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-zinc-200 rounded" />
                    Ghế thường (hàng A–C)
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-300 rounded" />
                    Ghế VIP (hàng D–E)
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-indigo-600 rounded" />
                    Đang chọn
                  </div>
                  <div className="mt-3 text-right text-lg font-semibold text-indigo-600">
                    Tạm tính: {totalPrice.toLocaleString()} đ
                  </div>
                </div>

                <div className="mt-5">
                  <PrimaryButton
                    className="w-full cursor-pointer"
                    onClick={handleConfirmSeats}
                    disabled={!selectedSeats.length}
                  >
                    Xác nhận & Giữ ghế
                  </PrimaryButton>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ MODAL GIỮ GHẾ */}
      {holdVisible && (
        <div className="fixed bottom-0 left-0 right-0 border-t shadow-xl p-10 bg-[#4F39F5] flex items-center justify-between z-50">
          <div>
            <div className="text-lg font-medium">
              Ghế: {selectedSeats.join(", ")}
            </div>
            <span className="text-5xl font-bold">
              {Math.floor(countdown / 60)}:
              {(countdown % 60).toString().padStart(2, "0")}
            </span>
          </div>

          <Button onClick={handlePayment}>Thanh toán</Button>
        </div>
      )}
    </section>
  );
};

export default Booking;
