import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import API from '../api';
import { FaStar } from "react-icons/fa";
import { motion } from 'framer-motion';
import StarRating from '../components/StarRating';
import { FaCheckDouble } from "react-icons/fa6";
import AlertBox from '../components/AlertBox';

const OMDB_API_KEY = 'be3db0cb'; // Replace with your OMDb key

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const username = localStorage.getItem('username');
  const [change, setChange] = useState(false);
  const [rating, setRating] = useState(0);
  const [watchlist, setWatchlist] = useState(false);
  const [changeWatchlist, setChangeWatchlist] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  console.log("rating", rating)
  console.log("watchlist", watchlist)
  //
 
  const [showAlert, setShowAlert] = useState(false);

  

  // 
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`);
      setMovie(res.data);
    };
    const fetchReviews = async () => {
      const res = await API.get(`/reviews/${id}`);
      console.log("res", res.data)
      const total = res.data.reduce((sum, review) => sum + review.rating, 0);
      const average = total / res.data.length;
      // return average.toFixed();
      console.log("average", average.toFixed())
      if (Number.isNaN(average)) {
        setRatingValue(0);
      }
      else {
        setRatingValue(average.toFixed());
      }
      
     console.log("ratingValue", ratingValue)
      setReviews(res.data);
    };
     const fetchWatchlist = async () => {
     const res = await API.get('/movies/watchlist');
       console.log(res.data);
       const data = res.data.some(movie => movie.imdbID === id);
       console.log("data", data)
       setWatchlist(data);
    };
            
    fetchWatchlist();
    fetchMovie();
    fetchReviews();
  }, [id, change,changeWatchlist, setChangeWatchlist]);

  const addToWatchlist = async () => {
    try {
      await API.post('movies/watchlist/add', { title: movie.Title });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Auto-close after 3s
      setChangeWatchlist(!changeWatchlist);
    } catch (err) {
      alert('Failed to add. Please login.');
    }
  };

  const postReview = async () => {
    if (!reviewText) return;
    try {
      const res = await API.post(`/reviews/${id}`, { reviewmsg: reviewText,rating });
      setReviewText('');
      setChange(!change);
    } catch (err) {
      alert('Login required to post review.');
    }
  };

  if (!movie) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white p-6">
       <AlertBox
        show={showAlert}
        onClose={() => setShowAlert(false)}
        message="✅ Movie added to Watchlist!"
      />
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row gap-6 mb-10 bg-black/30 p-6 rounded-xl shadow-2xl backdrop-blur-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
            alt={movie.Title}
            className="w-64 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://www.disneydining.com/wp-content/uploads/2021/09/000-avengersw.jpg'; // Default image URL
            }}
          />
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-cyan-400 mb-2">{movie.Title}</h1>
              <p className="text-gray-300 mb-3 leading-relaxed">{movie.Plot}</p>
              <p><strong>🎭 Genre:</strong> {movie.Genre}</p>
              <p><strong>📅 Released:</strong> {movie.Released}</p>
              <p><strong>🎬 Director:</strong> {movie.Director}</p>
            </div>
            <div className='flex items-center justify-between mt-4'>
             <div className="flex">
                  {[...Array(Number(ratingValue))]?.map((_, index) => (
                    <FaStar key={index} className="text-yellow-400 w-5 h-5" />
                  ))}
              </div>

                <Link to={`/trailer/${movie.Title}  ${movie.Director} `}>
       <motion.button
      // onClick={onClick}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl shadow-xl text-lg flex items-center justify-center gap-3 hover:scale-110 hover:shadow-2xl focus:outline-none"
    >
      <span className="text-2xl">▶️</span> Watch Trailer
    </motion.button>
      </Link>
            {/* <div className='flex justify- items-center'>{ratingValue} <FaStar className="text-yellow-400 w-5 h-5" /></div> */}
            {username && (
            <div>
              {watchlist ?<span className='text-white flex items-center justify-left gap-3'><FaCheckDouble className='text-green-600 text-2xl' />  Your Watchlist</span> :(
                <button
                  onClick={addToWatchlist}
                  className="mt-4 w-fit bg-cyan-600 px-4 py-2 rounded hover:bg-cyan-700 transition-transform hover:scale-105"
                >
                  ➕ Add to Watchlist
                </button>
                )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <hr className="my-8 border-gray-700" />

        <motion.h2 
          className="text-2xl font-semibold mb-4 text-cyan-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          💬 Reviews
        </motion.h2>
        
        {username && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <textarea
              rows="3"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-400 mb-2"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
              <div className="mb-4">
             <label className="block text-sm font-semibold text-gray-200 mb-3">Rating</label>
             <StarRating rating={rating} setRating={setRating} />
             </div>

            <button
              onClick={postReview}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:scale-105 transition-transform"
            >
              ✅ Post Review
            </button>
          </motion.div>
        )}

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-400 text-center text-lg">No reviews yet.</p>
          ) : (
            reviews.map((r, i) => (
              <motion.div
                key={i}
                className="bg-white/10 shadow-md rounded-xl p-4 border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-cyan-200">{r.userId.username}</h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(r.rating || 2)].map((_, index) => (
                      <FaStar key={index} className="text-yellow-400 w-5 h-5" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed">{r.comment}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
      {/* <motion.button
      // onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg text-lg flex items-center justify-center gap-2"
    >
      <span>▶️</span> Watch Trailer
    </motion.button> */}
      {/* <Link to={`/trailer/${movie.Title}  ${movie.Director} `}>
       <motion.button
      // onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg text-lg flex items-center justify-center gap-2"
    >
      <span>▶️</span> Watch Trailer
    </motion.button>
      </Link> */}
    </div>
  );
}





// // frontend/src/pages/MovieDetails.jsx
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import API from '../api';
// import { FaStar } from "react-icons/fa";
// // import Rating from '../components/Rating';

// const OMDB_API_KEY = 'be3db0cb'; // Replace with your OMDb key

// export default function MovieDetails() {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState('');
//   const username = localStorage.getItem('username');
//   const  [change, setChange] = useState(false);
//   useEffect(() => {
//     const fetchMovie = async () => {
//       const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`);
//       setMovie(res.data);
//     };
//     const fetchReviews = async () => {
//       const res = await API.get(`/reviews/${id}`);
//       setReviews(res.data);
//     };
//     fetchMovie();
//     fetchReviews();
//   }, [id,change, setChange]);

//   const addToWatchlist = async () => {
//     try {
//       await API.post('movies/watchlist/add', { title: movie.Title,  });
//       alert('Added to watchlist!');
//     } catch (err) {
//       alert('Failed to add. Please login.');
//     }
//   };

//   const postReview = async () => {
//     if (!reviewText) return;
//     try {
//       const res = await API.post(`/reviews/${id}`,{ reviewmsg: reviewText });
//         //   setReviews([res.data, ...reviews]);
//         console.log(res)
//       setReviewText('');
//       setChange(!change)
//     } catch (err) {
//       alert('Login required to post review.');
//     }
//   };

//   if (!movie) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="flex flex-col md:flex-row gap-6 mb-6">
//         <img
//           src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
//           alt={movie.Title}
//           className="w-64 rounded-xl"
//         />
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
//           <p className="text-gray-700 mb-2">{movie.Plot}</p>
//           <p><strong>Genre:</strong> {movie.Genre}</p>
//           <p><strong>Released:</strong> {movie.Released}</p>
//           <p><strong>Director:</strong> {movie.Director}</p>
//           {username && (
//             <button
//               onClick={addToWatchlist}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               ➕ Add to Watchlist
//             </button>
//           )}
//         </div>
//       </div>

//       <hr className="my-6" />

//       <h2 className="text-xl font-semibold mb-2">Reviews</h2>
//       {username && (
//         <div className="mb-4">
//           <textarea
//             rows="3"
//             className="w-full p-2 border rounded mb-2"
//             placeholder="Write your review..."
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//           />
//           <button
//             onClick={postReview}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Post Review
//           </button>
//         </div>
//       )}
//         <div className="space-y-4">
//       {reviews.length === 0 ? (
//         <p className="text-gray-500 text-center text-lg">No reviews yet.</p>
//       ) : (
//         reviews.map((r, i) => (
//           <div
//             key={i}
//             className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-fadeIn"
//           >
//             <div className="flex justify-between items-start mb-2">
//               <h4 className="font-semibold text-gray-800 animate-fadeInUp">{r.userId.username}</h4>
//               <div className="flex items-center space-x-1">
//                 {[...Array(r.rating || 2)].map((_, index) => (
//                   <FaStar key={index} className="text-yellow-400 w-5 h-5 animate-fadeInUp delay-[100ms]" />
//                 ))}
//               </div>
//             </div>
//             <p className="text-sm text-gray-700 leading-relaxed animate-fadeInUp delay-[200ms]">{r.comment}</p>
//           </div>
//         ))
//       )}
//     </div>
//     </div>
//   );
// }
