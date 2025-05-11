// backend/routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const {
  searchMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', searchMovie); // ?search=title
router.post('/watchlist/:id', protect, addMovie);
router.put('/:id', protect, updateMovie);
router.delete('/:id', protect, deleteMovie);

router.get('/watchlist',protect, async (req, res) => {
    try {
        console.log(req.user);
    const myMovies = await Movie.find({ createdBy: req.user });
      res.json(myMovies);
      console.log(myMovies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
})
module.exports = router;
