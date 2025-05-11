// backend/models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  imdbID: { type: String },
  title: { type: String, required: true },
  year: String,
  genre: String,
  director: String,
  plot: String,
  Poster: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  favorite: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
