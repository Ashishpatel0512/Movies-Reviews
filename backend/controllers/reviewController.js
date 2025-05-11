// backend/controllers/reviewController.js
const Review = require('../models/Review');
const axios = require('axios');
const getReviews = async (req, res) => {
  const { movieId } = req.params;
  try {
    const reviews = await Review.find({ movieId }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const OMDB_API_KEY = 'be3db0cb'; // Replace with your OMDb key

// POST /api/reviews
const addReview = async (req, res) => {
    const { id } = req.params;
    console.log(id);
  const { reviewmsg, rating } = req.body;
  console.log("req.body", req.body);
  console.log("user", req.user);
  console.log("reviewmsg", reviewmsg);
  const fetchMovie = async () => {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`);
    return res.data;
  };
  const data = await fetchMovie()
  console.log("data", data);
    console.log("hello")
    const review =await Review.create({
      movieId: id,
      movieTitle: data.Title,
      moviePoster: data.Poster,
      userId: req.user._id,
      rating:rating,
      comment: reviewmsg,
    });
    console.log("review")
    console.log("review", review);
    res.status(201).json(review);
  
};

// PUT /api/reviews/:reviewId
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not your review' });

    review.rating = req.body.rating ?? review.rating;
    review.comment = req.body.comment ?? review.comment;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/reviews/:reviewId
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not your review' });

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getReviews,
  addReview,
  updateReview,
  deleteReview,
};
