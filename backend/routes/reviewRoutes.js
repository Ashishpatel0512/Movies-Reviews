/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Managing movie reviews by users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - movieId
 *         - userId
 *         - rating
 *       properties:
 *         _id:
 *           type: string
 *         movieId:
 *           type: string
 *         movieTitle:
 *           type: string
 *         moviePoster:
 *           type: string
 *         userId:
 *           type: string
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         comment:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 60adf0bd55b6c72c98e6b8a0
 *         movieId: tt0111161
 *         movieTitle: The Shawshank Redemption
 *         moviePoster: https://example.com/poster.jpg
 *         userId: 123abc
 *         rating: 5
 *         comment: A must-watch movie!
 *         createdAt: 2024-05-10T10:00:00Z
 *         updatedAt: 2024-05-10T10:00:00Z
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/reviews/user/myreviews:
 *   get:
 *     summary: Get all reviews by the authenticated user
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/reviews/{movieId}:
 *   get:
 *     summary: Get all reviews for a specific movie
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         schema:
 *           type: string
 *         required: true
 *         description: OMDb Movie ID (e.g., tt0111161)
 *     responses:
 *       200:
 *         description: List of reviews for the movie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */

/**
 * @swagger
 * /api/reviews/{id}:
 *   post:
 *     summary: Create a new review for a movie
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: OMDb Movie ID (e.g., tt0111161)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewmsg:
 *                 type: string
 *               rating:
 *                 type: number
 *             example:
 *               reviewmsg: An amazing movie with great performances
 *               rating: 4
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/reviews/{reviewId}:
 *   put:
 *     summary: Update an existing review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: Review ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *             example:
 *               rating: 3
 *               comment: Updated the review after rewatching
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - trying to edit someone else's review
 */

/**
 * @swagger
 * /api/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: Review ID to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - trying to delete someone else's review
 */





// backend/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const {
  getReviews,
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const Review = require('../models/Review');
// Get all reviews by current user
router.get('/user/myreviews', protect, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:movieId', getReviews); // ?movieId=abc
router.post('/:id', protect,addReview);
router.put('/:reviewId', protect, updateReview);
router.delete('/:reviewId', protect, deleteReview);

module.exports = router;
