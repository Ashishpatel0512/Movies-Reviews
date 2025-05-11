// backend/utils/omdb.js
const axios = require('axios');

const fetchMovieFromOMDb = async (title) => {
  const apiKey = process.env.OMDB_API_KEY;
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;

  const response = await axios.get(url);
  if (response.data.Response === 'False') {
    throw new Error(response.data.Error);
  }

  return response.data;
};


module.exports = { fetchMovieFromOMDb };
