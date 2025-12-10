import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Box, Flex, Heading, Text, Badge } from "@radix-ui/themes";
import { Card, Select, Spin, Pagination } from "antd";
import PrimaryButton from "../components/PrimaryButton";
import filmApi from "../service/api-film";

type MovieType = {
  id: string;
  name: string;
  rating: number;
  duration: number;
  poster: string;
  genre: string;
};

const Movie: React.FC = () => {
  const { id } = useParams() as { id?: string };
  const navigate = useNavigate();

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(9);
  const [total, setTotal] = useState(0);
  const [genre, setGenre] = useState<string>("all");

  // ✅ GỌI API
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await filmApi.getAllFilms(page, size);
      const data = res.data;

      setMovies(data.content || data.data || []);
      setTotal(data.totalElements || data.total || 0);
    } catch (e) {
      console.error("Lỗi load phim", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, size]);

  // ===============================
  // ✅ GENRE
  // ===============================
  const allGenres = useMemo(() => {
    const s = new Set<string>();
    movies.forEach((m) => m.genre && s.add(m.genre));
    return ["all", ...Array.from(s)];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    if (genre === "all") return movies;
    return movies.filter((m) => m.genre === genre);
  }, [genre, movies]);

  // ===============================
  // ✅ CHI TIẾT PHIM
  // ===============================
  if (id) {
    const m = movies.find((x) => x.id === id);
    if (!m)
      return (
        <div className="p-8 text-zinc-300 bg-zinc-950 min-h-screen">
          Phim không tồn tại.
        </div>
      );

    return (
      <section className="min-h-screen max-w-5xl mx-auto p-8">
        <Flex gap="6">
          <img
            src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1080&auto=format&fit=crop"
            alt={m.name}
            className="w-64 rounded-xl shadow-lg object-cover"
          />

          <Box>
            <Heading size="6" className="text-zinc-100">
              {m.name}
            </Heading>

            <Text className="block mt-2 text-zinc-400">{m.duration} phút</Text>

            <Flex gap="2" className="mt-3">
              <Badge color="blue" className="bg-blue-600/20 text-blue-400">
                {m.genre}
              </Badge>
            </Flex>

            <Text className="block mt-4 text-zinc-300">⭐ {m.rating}</Text>

            <Flex gap="3" className="mt-6">
              <PrimaryButton
                className="!bg-blue-600 hover:!bg-blue-500"
                onClick={() => navigate(`/booking?movieId=${m.id}`)}
              >
                Đặt vé
              </PrimaryButton>

              <PrimaryButton
                className="!bg-zinc-700 hover:!bg-zinc-600"
                onClick={() => navigate(-1)}
              >
                Quay lại
              </PrimaryButton>
            </Flex>
          </Box>
        </Flex>
      </section>
    );
  }

  // ===============================
  // ✅ DANH SÁCH PHIM
  // ===============================
  return (
    <section className="min-h-screen max-w-7xl mx-auto p-6">
      <Flex justify="between" align="center" className="mb-6">
        <Heading size="5" className="text-zinc-100">
          Danh sách phim
        </Heading>

        <Select
          value={genre}
          onChange={(v) => setGenre(v)}
          style={{ width: 180 }}
          className="text-zinc-100"
          options={allGenres.map((g) => ({
            value: g,
            label: g === "all" ? "Tất cả thể loại" : g,
          }))}
        />
      </Flex>

      {loading ? (
        <Flex justify="center" className="py-20">
          <Spin size="large" />
        </Flex>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {filteredMovies.map((m) => (
            <Card
              style={{
                backgroundColor: "var(--gray-1)",
                color: "var(--gray-12)",
              }}
              key={m.id}
              cover={
                <img
                  src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1080&auto=format&fit=crop"
                  alt={m.name}
                  className="h-56 object-cover"
                />
              }
            >
              <Heading size="4">{m.name}</Heading>

              <Text className="text-sm mt-1">
                {m.duration} phút • ⭐ {m.rating}
              </Text>

              <Flex gap="1" className="mt-2 flex-wrap">
                <Badge color="green" className="">
                  {m.genre}
                </Badge>
              </Flex>

              <Flex gap="2" className="mt-4">
                <PrimaryButton onClick={() => navigate(`/movie/${m.id}`)}>
                  Chi tiết
                </PrimaryButton>

                <PrimaryButton
                  onClick={() => navigate(`/booking?movieId=${m.id}`)}
                >
                  Đặt vé
                </PrimaryButton>
              </Flex>
            </Card>
          ))}
        </div>
      )}

      <Flex justify="center" className="mt-10">
        <Pagination
          style={{
            backgroundColor: "var(--gray-1)",
            color: "var(--gray-12)",
          }}
          current={page}
          pageSize={size}
          total={total}
          onChange={(p, s) => {
            setPage(p);
            setSize(s);
          }}
        />
      </Flex>
    </section>
  );
};

export default Movie;
