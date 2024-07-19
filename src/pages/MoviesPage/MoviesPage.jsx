import { useEffect, useState } from "react";
import { searchMovie } from "../../components/moviesApi";
import css from "./MoviesPage.module.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const movieFilter = searchParams.get("query") || "";

  useEffect(() => {
    if (movieFilter === "") {
      return;
    }

    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovie(movieFilter);
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [movieFilter]);
  const handleSearch = (query) => {
    setSearchParams({ query });
  };
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {movies.length > 0 && (
        <ul className={css.moviesList}>
          {movies.map((movie) => (
            <li key={movie.id} className={css.movieItem}>
              <Link to={`/movies/${movie.id}`} state={location}>
                <div className={css.movieContainer}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : defaultImg
                    }
                    alt={movie.title}
                    className={css.moviePoster}
                  />
                  {movie.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
