import Hero from "../components/Hero";
import MovieCarousel from "../components/MovieCarousel";
import Showtime from "../components/Showtime";

const Home: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <MovieCarousel />
      <Showtime />
    </main>
  );
};

export default Home;
