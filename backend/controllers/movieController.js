// backend/controllers/movieController.js
const Movie = require('../models/Movie');
const { fetchMovieFromOMDb } = require('../utils/omdb');

// GET /api/movies?search=Batman
const searchMovie = async (req, res) => {
  const { search } = req.query;
  try {
    const movie = await fetchMovieFromOMDb(search);
    res.json(movie);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// POST /api/movies
const addMovie = async (req, res) => {
    const { title } = req.body;
    console.log(title);
  try {
    const omdbData = await fetchMovieFromOMDb(title);

    const movie = new Movie({
      imdbID: omdbData.imdbID,
      title: omdbData.Title,
      year: omdbData.Year,
      genre: omdbData.Genre,
      director: omdbData.Director,
      plot: omdbData.Plot,
      Poster: omdbData.Poster,
      createdBy: req.user._id,
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/movies/:id
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    movie.favorite = req.body.favorite ?? movie.favorite;
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/movies/:id
const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  searchMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
