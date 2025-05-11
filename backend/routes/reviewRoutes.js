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
