import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieRewiews } from "../moviesApi";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMoviesReviews() {
      try {
        const data = await getMovieRewiews(movieId);
        // console.log(data);
        setReviews(data.results);
      } catch (error) {
        // console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMoviesReviews();
  }, [movieId]);

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

  // if (!reviews) {
  //   return <div>Loading...</div>;
  // }

  if (reviews.length === 0) {
    return <div>We dont have any rewiews for this movie</div>;
  }
  return (
    <div>
      <ul className={css.reviewsList}>
        {reviews.map((review, index) => (
          <li className={css.reviewsItem} key={index}>
            <p>
              <strong>Author: {review.author}</strong>
            </p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
