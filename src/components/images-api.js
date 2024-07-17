import axios from "axios";

const API_KEY = 'HN_AEfRTGwx6jENK4SlKTZK4zjzhIfTTmdrNwJirh9Y';
axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 16,
};

export const getPhotos = async (topic, currentPage) => {
  const response = await axios.get(`/search/photos?client_id=${API_KEY}&query=${topic}&page=${currentPage}`);
  return response.data;
};