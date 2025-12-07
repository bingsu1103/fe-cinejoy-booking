import React, { useMemo, useState } from "react";
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
      "https://images.unsplash.com/photo-1508898578281-774ac4893f16?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: "mv3",
    title: "Vệ Binh Bầu Trời",
    poster:
      "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=1080&auto=format&fit=crop",
  },
];

const Checkout: React.FC = () => {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const movieId = params.get("movieId") || undefined;
  const theater = params.get("theater") || "";
  const time = params.get("time") || "";
  const seats = (params.get("seats") || "").split(",").filter(Boolean);
  const movie = mockMovies.find((m) => m.id === movieId) || mockMovies[0];

  const [method, setMethod] = useState<string>("vnpay");

  const handlePay = () => {
    if (method === "vnpay") {
      alert(
        `Chuyển sang cổng VNPAY...\nPhim: ${
          movie.title
        }\nRạp: ${theater}\nSuất: ${time}\nGhế: ${seats.join(", ")}`
      );
      return;
    }
    if (method === "momo") {
      alert(
        `Chuyển sang cổng MoMo...\nPhim: ${
          movie.title
        }\nRạp: ${theater}\nSuất: ${time}\nGhế: ${seats.join(", ")}`
      );
      return;
    }
    if (method === "pickup") {
      alert(
        `Chọn nhận vé tại rạp.\nPhim: ${
          movie.title
        }\nRạp: ${theater}\nSuất: ${time}\nGhế: ${seats.join(", ")}`
      );
      return;
    }
  };

  return (
    <section className="min-h-screen mx-auto max-w-3xl px-4 py-8">
      <div className="flex gap-6">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-40 rounded-2xl object-cover"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Thanh toán</h2>
          <div className="text-sm text-zinc-600 mt-2">{movie.title}</div>
          <div className="text-sm text-zinc-600 mt-1">Rạp: {theater}</div>
          <div className="text-sm text-zinc-600 mt-1">Suất: {time}</div>
          <div className="text-sm text-zinc-600 mt-1">
            Ghế: {seats.join(", ")}
          </div>

          <div className="mt-6 rounded-2xl border p-4">
            <div className="mb-3 font-medium">Chọn hình thức thanh toán</div>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="pay"
                  checked={method === "vnpay"}
                  onChange={() => setMethod("vnpay")}
                />
                <span className="ml-2">VNPAY</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="pay"
                  checked={method === "momo"}
                  onChange={() => setMethod("momo")}
                />
                <span className="ml-2">MoMo</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="pay"
                  checked={method === "pickup"}
                  onChange={() => setMethod("pickup")}
                />
                <span className="ml-2">Nhận vé tại rạp</span>
              </label>
            </div>

            <div className="mt-6 flex justify-end">
              <PrimaryButton onClick={handlePay}>Hoàn tất</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
