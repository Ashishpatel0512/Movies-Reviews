/**
 * @swagger
 * tags:
 *   - name: Movies
 *     description: Movie search and data retrieval
 *   - name: Watchlist
 *     description: User's personal movie list
 *
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         imdbID:
 *           type: string
 *           description: The IMDb ID of the movie
 *           example: tt0848228
 *         title:
 *           type: string
 *           description: The title of the movie
 *           example: The Avengers
 *         year:
 *           type: string
 *           description: The release year of the movie
 *           example: "2012"
 *         genre:
 *           type: string
 *           description: The genre of the movie
 *           example: Action, Adventure, Sci-Fi
 *         director:
 *           type: string
 *           description: The director of the movie
 *           example: Joss Whedon
 *         plot:
 *           type: string
 *           description: The plot of the movie
 *           example: Earth's mightiest heroes must come together to defeat an alien invasion.
 *         Poster:
 *           type: string
 *           description: The URL of the movie poster image
 *           example: https://m.media-amazon.com/images/I/91dG4wCjy6L._AC_SY679_.jpg
 *         createdBy:
 *           type: string
 *           description: The ID of the user who added the movie to the watchlist
 *           example: 60f93f8c19d7400bb87e9f1d
 *         favorite:
 *           type: boolean
 *           description: Indicates whether the movie is marked as a favorite
 *           example: true
 *
 * paths:
 *   /api/movies:
 *     get:
 *       tags: [Movies]
 *       summary: Search for a movie by title
 *       description: This endpoint allows searching for a movie by its title.
 *       parameters:
 *         - in: query
 *           name: search
 *           required: true
 *           schema:
 *             type: string
 *           description: The title of the movie to search for
 *           example: Batman
 *       responses:
 *         '200':
 *           description: A list of movies matching the search query
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Title:
 *                     type: string
 *                     example: Batman Begins
 *                   Year:
 *                     type: string
 *                     example: "2005"
 *                   Genre:
 *                     type: string
 *                     example: Action, Adventure
 *         '404':
 *           description: Movie not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Movie not found"
 *
 *   /api/movies/watchlist:
 *     get:
 *       tags: [Watchlist]
 *       summary: Get a user's watchlist
 *       description: This endpoint retrieves all movies added to the user's watchlist.
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: A list of movies in the user's watchlist
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Movie'
 *         '401':
 *           description: Unauthorized, no token provided
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "No token provided"
 *
 *   /api/movies/watchlist/{id}:
 *     post:
 *       tags: [Watchlist]
 *       summary: Add a movie to the user's watchlist
 *       description: This endpoint adds a movie to the user's watchlist using the movie's IMDb ID.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The IMDb ID of the movie
 *           example: tt0848228
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '201':
 *           description: Movie successfully added to the watchlist
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Movie'
 *         '401':
 *           description: Unauthorized, no token provided
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "No token provided"
 *         '400':
 *           description: Failed to fetch movie data
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Failed to fetch movie data"
 * 
 *   /api/movies/{id}/delete:
 *     delete:
 *       tags: [Watchlist]
 *       summary: Remove a movie from the user's watchlist
 *       description: This endpoint deletes a movie from the user's watchlist.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the movie
 *           example: 60f93f8c19d7400bb87e9f1d
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Movie successfully deleted
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Movie deleted"
 *         '404':
 *           description: Movie not found
 *         '401':
 *           description: Unauthorized, no token provided
 */

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
