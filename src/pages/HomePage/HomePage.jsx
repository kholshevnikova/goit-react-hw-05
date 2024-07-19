import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../components/moviesApi";
import MovieList from "../../components/MovieList/MovieList";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  // console.log(location);

  useEffect(() => {
    async function fetchTrendingMovies() {
      setLoading(true);
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <p>Oops, something wrong, please reload page!</p>;
  }

  return (
    <div>
      <h2>Trending today</h2>
      {movies.length > 0 && <MovieList movies={movies} location={location} />}
    </div>
  );
};

export default HomePage;
