import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
// import MovieCast from "../../components/MovieCast/MovieCast";
// import MovieReviews from "../../components/MovieReviews/MovieReviews";
import { useEffect, useRef, useState } from "react";
import { getMovieById } from "../../components/moviesApi";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const location = useLocation();
  // console.log(location);
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchMovieById() {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieById();
  }, [movieId]);

  // if (!movie) {
  //   return <div>Loading...</div>;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <p>
        Oops, something wrong, please go to <Link to="/">home page</Link>!
      </p>
    );
  }
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div>
      {/* <h1>Movie detail page</h1> */}
      <div className={css.movieDetails}>
        <Link to={backLinkRef.current} className={css.goBack}>
          ← Go back
        </Link>
        <div className={css.movieInfo}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultImg
            }
            alt={movie.title}
            className={css.moviePoster}
          />
          <div className={css.movieContent}>
            <h2>
              {movie.title}({new Date(movie.release_date).getFullYear()})
            </h2>
            <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
            <div className={css.overview}>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
            <div className={css.genres}>
              <h3>Genres</h3>
              <p>{movie.genres.map((genre) => genre.name).join(" ")}</p>
            </div>
          </div>
        </div>
        <div className={css.additionalInfo}>
          <h3>Additional information</h3>
          <ul>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
