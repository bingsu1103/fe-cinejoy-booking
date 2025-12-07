import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import PrimaryButton from "../components/PrimaryButton";

type MovieType = {
  id: string;
  title: string;
  rating: number;
  duration: number;
  poster: string;
  tags: string[];
  availableTheaters: string[];
};

const theaters = [
  {
    id: "cj01",
    name: "CineJoy Landmark 81",
    addressId: "hcm-binhthanh",
    address: "Bình Thạnh, TP.HCM",
    region: "Hồ Chí Minh",
  },
  {
    id: "cj02",
    name: "CineJoy Crescent Mall",
    addressId: "hcm-q7",
    address: "Q.7, TP.HCM",
    region: "Hồ Chí Minh",
  },
  {
    id: "cj03",
    name: "CineJoy Vincom Bà Triệu",
    addressId: "hn-batrieu",
    address: "Hai Bà Trưng, Hà Nội",
    region: "Hà Nội",
  },
  {
    id: "cj04",
    name: "CineJoy Royal City",
    addressId: "hn-thanhxuan",
    address: "Thanh Xuân, Hà Nội",
    region: "Hà Nội",
  },
];

const regions = [
  {
    id: "hcm",
    name: "Hồ Chí Minh",
    addresses: [
      { id: "hcm-binhthanh", name: "Bình Thạnh", theaters: ["cj01"] },
      { id: "hcm-q7", name: "Quận 7", theaters: ["cj02"] },
    ],
  },
  {
    id: "hn",
    name: "Hà Nội",
    addresses: [
      { id: "hn-batrieu", name: "Hai Bà Trưng", theaters: ["cj03"] },
      { id: "hn-thanhxuan", name: "Thanh Xuân", theaters: ["cj04"] },
    ],
  },
];

const mockMovies: MovieType[] = [
  {
    id: "mv1",
    title: "Hành Trình Vô Cực",
    rating: 8.6,
    duration: 128,
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1080&auto=format&fit=crop",
    tags: ["Hành động", "Phiêu lưu", "IMAX"],
    availableTheaters: ["cj01", "cj02"],
  },
  {
    id: "mv2",
    title: "Giai Điệu Cuối Thu",
    rating: 7.9,
    duration: 112,
    poster:
      "https://images.unsplash.com/photo-1508898578281-774ac4893f16?q=80&w=1080&auto=format&fit=crop",
    tags: ["Tâm lý", "Lãng mạn"],
    availableTheaters: ["cj02"],
  },
  {
    id: "mv3",
    title: "Vệ Binh Bầu Trời",
    rating: 8.2,
    duration: 135,
    poster:
      "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=1080&auto=format&fit=crop",
    tags: ["Viễn tưởng", "3D"],
    availableTheaters: ["cj03", "cj04"],
  },
  {
    id: "mv4",
    title: "Đêm Không Ngủ",
    rating: 7.5,
    duration: 101,
    poster:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1080&auto=format&fit=crop",
    tags: ["Kinh dị", "R18"],
    availableTheaters: ["cj01"],
  },
  {
    id: "mv5",
    title: "Chuyến Xe Cuối",
    rating: 7.1,
    duration: 95,
    poster:
      "https://images.unsplash.com/photo-1502920917128-1aa500764b0b?q=80&w=1080&auto=format&fit=crop",
    tags: ["Hành động", "Tâm lý"],
    availableTheaters: ["cj02", "cj04"],
  },
  {
    id: "mv6",
    title: "Sao Băng",
    rating: 8.0,
    duration: 122,
    poster:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1080&auto=format&fit=crop",
    tags: ["Lãng mạn", "Viễn tưởng"],
    availableTheaters: ["cj03"],
  },
  {
    id: "mv7",
    title: "Hồn Biển",
    rating: 7.8,
    duration: 110,
    poster:
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1080&auto=format&fit=crop",
    tags: ["Phiêu lưu", "Gia đình"],
    availableTheaters: ["cj01", "cj03"],
  },
  {
    id: "mv8",
    title: "Bóng Đêm",
    rating: 6.9,
    duration: 104,
    poster:
      "https://images.unsplash.com/photo-1517604931442-7d89f36d1c56?q=80&w=1080&auto=format&fit=crop",
    tags: ["Kinh dị"],
    availableTheaters: ["cj04"],
  },
];

const Movie: React.FC = () => {
  const { id } = useParams() as { id?: string };
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedAddress, setSelectedAddress] = useState<string>("all");
  const [selectedTheater, setSelectedTheater] = useState<string>("all");

  const allGenres = useMemo(() => {
    const s = new Set<string>();
    mockMovies.forEach((m) => m.tags.forEach((t) => s.add(t)));
    return ["all", ...Array.from(s)];
  }, []);

  const addressesForRegion = useMemo(() => {
    if (selectedRegion === "all") return [];
    const r = regions.find((x) => x.id === selectedRegion);
    return r ? r.addresses : [];
  }, [selectedRegion]);

  const theatersForAddress = useMemo(() => {
    if (selectedAddress === "all") return [];
    const addr = addressesForRegion.find((a) => a.id === selectedAddress);
    return addr
      ? addr.theaters
          .map((tid) => theaters.find((t) => t.id === tid)!)
          .filter(Boolean)
      : [];
  }, [selectedAddress, addressesForRegion]);

  const filtered = useMemo(() => {
    return mockMovies.filter((m) => {
      if (selectedGenre !== "all" && !m.tags.includes(selectedGenre))
        return false;
      if (
        selectedTheater !== "all" &&
        !m.availableTheaters.includes(selectedTheater)
      )
        return false;
      return true;
    });
  }, [selectedGenre, selectedTheater]);

  if (id) {
    const m = mockMovies.find((x) => x.id === id);
    if (!m) return <div className="p-8">Phim không tồn tại.</div>;
    return (
      <section className="min-h-screen mx-auto max-w-4xl px-4 py-12">
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={m.poster}
            alt={m.title}
            className="w-full sm:w-56 rounded-lg shadow-lg object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{m.title}</h1>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              {m.duration} phút • {m.tags.join(" • ")}
            </div>
            <p className="mt-4">Điểm đánh giá: {m.rating}</p>
            <div className="mt-6 flex gap-2">
              <PrimaryButton
                onClick={() => navigate(`/booking?movieId=${m.id}`)}
              >
                Đặt vé
              </PrimaryButton>
              <PrimaryButton onClick={() => navigate(-1)}>
                Quay lại
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Danh sách phim</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
        <div className="col-span-1 rounded-lg border p-4">
          <div className="mb-3 text-sm font-medium">Thể loại</div>
          <select
            className="w-full rounded-lg border px-3 py-2"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {allGenres.map((g) => (
              <option key={g} value={g}>
                {g === "all" ? "Tất cả" : g}
              </option>
            ))}
          </select>

          <div className="mt-4 mb-2 text-sm font-medium">Khu vực</div>
          <select
            className="w-full rounded-lg border px-3 py-2"
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedAddress("all");
              setSelectedTheater("all");
            }}
          >
            <option value="all">Tất cả khu vực</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          <div className="mt-4 mb-2 text-sm font-medium">Địa chỉ</div>
          <select
            className="w-full rounded-lg border px-3 py-2"
            value={selectedAddress}
            onChange={(e) => {
              setSelectedAddress(e.target.value);
              setSelectedTheater("all");
            }}
          >
            <option value="all">Chọn địa chỉ</option>
            {addressesForRegion.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>

          <div className="mt-4 mb-2 text-sm font-medium">Rạp</div>
          <select
            className="w-full rounded-lg border px-3 py-2"
            value={selectedTheater}
            onChange={(e) => setSelectedTheater(e.target.value)}
          >
            <option value="all">Tất cả rạp</option>
            {theatersForAddress.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {filtered.map((m) => (
              <article key={m.id} className="rounded-lg border p-3">
                <img
                  src={m.poster}
                  alt={m.title}
                  className="w-full h-44 object-cover rounded-lg"
                />
                <h3 className="mt-2 font-semibold">{m.title}</h3>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  {m.duration} phút
                </div>
                <div className="mt-3 flex gap-2">
                  <PrimaryButton
                    onClick={() => (window.location.href = `/movie/${m.id}`)}
                  >
                    Xem chi tiết
                  </PrimaryButton>
                  <PrimaryButton
                    onClick={() =>
                      (window.location.href = `/booking?movieId=${m.id}`)
                    }
                  >
                    Đặt vé
                  </PrimaryButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Movie;
