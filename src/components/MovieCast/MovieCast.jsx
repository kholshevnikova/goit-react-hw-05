import { useEffect, useState } from "react";
import { getMovieCast } from "../moviesApi";
import { Link, useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  // console.log(movieId);
  const [casts, setCasts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieCasts() {
      try {
        const data = await getMovieCast(movieId);
        // console.log(data);
        setCasts(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieCasts();
  }, [movieId]);
  // if (!casts) {
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
      <div className={css.castList}>
        {casts.map((castMember, index) => (
          <div className={css.castItem} key={index}>
            <img
              src={
                castMember.profile_path
                  ? `https://image.tmdb.org/t/p/w200${castMember.profile_path}`
                  : defaultImg
              }
              alt={castMember.name}
            />

            <div>
              <p>
                <strong>{castMember.name}</strong>
              </p>
              <p>Character: {castMember.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
