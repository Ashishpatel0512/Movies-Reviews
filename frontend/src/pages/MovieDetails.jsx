// frontend/src/pages/MovieDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API from '../api';
import { FaStar } from "react-icons/fa";
// import Rating from '../components/Rating';

const OMDB_API_KEY = 'be3db0cb'; // Replace with your OMDb key

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const username = localStorage.getItem('username');
  const  [change, setChange] = useState(false);
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`);
      setMovie(res.data);
    };
    const fetchReviews = async () => {
      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data);
    };
    fetchMovie();
    fetchReviews();
  }, [id,change, setChange]);

  const addToWatchlist = async () => {
    try {
      await API.post('movies/watchlist/add', { title: movie.Title,  });
      alert('Added to watchlist!');
    } catch (err) {
      alert('Failed to add. Please login.');
    }
  };

  const postReview = async () => {
    if (!reviewText) return;
    try {
      const res = await API.post(`/reviews/${id}`,{ reviewmsg: reviewText });
        //   setReviews([res.data, ...reviews]);
        console.log(res)
      setReviewText('');
      setChange(!change)
    } catch (err) {
      alert('Login required to post review.');
    }
  };

  if (!movie) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
          alt={movie.Title}
          className="w-64 rounded-xl"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-gray-700 mb-2">{movie.Plot}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          {username && (
            <button
              onClick={addToWatchlist}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ➕ Add to Watchlist
            </button>
          )}
        </div>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">Reviews</h2>
      {username && (
        <div className="mb-4">
          <textarea
            rows="3"
            className="w-full p-2 border rounded mb-2"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            onClick={postReview}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Post Review
          </button>
        </div>
      )}
        <div className="space-y-4">
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No reviews yet.</p>
      ) : (
        reviews.map((r, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-fadeIn"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800 animate-fadeInUp">{r.userId.username}</h4>
              <div className="flex items-center space-x-1">
                {[...Array(r.rating || 2)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-400 w-5 h-5 animate-fadeInUp delay-[100ms]" />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed animate-fadeInUp delay-[200ms]">{r.comment}</p>
          </div>
        ))
      )}
    </div>
    </div>
  );
}
