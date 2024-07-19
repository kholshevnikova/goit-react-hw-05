import axios from 'axios';

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY1M2ZmNjRiNzA1ODA5ZWI5MjIxZjViMTIyNmM1OCIsIm5iZiI6MTcyMTI5MjM2NC41NjkyNTgsInN1YiI6IjY2OTgyNjE0M2JiYjVjMzg3NDI0ZDc5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C4TC0_4u-mTkElPs5bclhBGfqEz0oeHRQipwDY6QQYY";// const urlSearchTrending = 'https://api.themoviedb.org/3/trending/movie/day'



axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const options = {
  headers: {
      Authorization: `Bearer ${API_TOKEN}`
  }
};

export const getTrendingMovies = async () => {
    const response = await axios.get(`trending/movie/day`, options);
    // console.log(response);
    return response.data;
    
  
}

export const getMovieById = async (movieId) => {
    const response = await axios.get(`movie/${movieId}`, options);
    // console.log(response);
    return response.data;
}

export const getMovieCast = async (movieId) => {
    const response = await axios.get(`movie/${movieId}/credits`, options)
    // console.log(response);
    return response.data;
}

export const getMovieRewiews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, options)
  // console.log(response);
  return response.data;
}
export const searchMovie = async (query) => {
  const response = await axios.get(`/search/movie?query=${query}`, options)
  // console.log(response);
  return response.data;
}