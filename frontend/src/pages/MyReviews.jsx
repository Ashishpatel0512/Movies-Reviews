import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import API from '../api';
import EditReviewForm from './EditReviewForm';

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [deleteReview, setDeleteReview] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const res = await API.get('/reviews/user/myreviews');
        setReviews(res.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    fetchMyReviews();
  }, [deleteReview, edit]);

  const deleteMyReviews = async (reviewId) => {
    try {
      await API.delete(`/reviews/${reviewId}`);
      setDeleteReview(!deleteReview);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (!localStorage.getItem('token')) {
    return <div className="text-center mt-10 text-lg text-gray-600">Please log in to view your reviews.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-lg">You haven’t posted any reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((movie) => (
            <div
              key={movie.movieId}
              className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={
                  movie.moviePoster !== 'N/A'
                    ? movie.moviePoster
                    : 'https://via.placeholder.com/300x445?text=No+Image'
                }
                alt={movie.movieTitle}
                className="w-full md:w-48 h-72 object-cover"
              />
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{movie.movieTitle}</h3>
                  <p className="mt-1 text-yellow-600 font-semibold">⭐ {movie.rating} / 10</p>
                  <p className="mt-2 text-gray-600 text-sm">{movie.comment}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Link
                    to={`/movie/${movie.movieId}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View Details →
                  </Link>

                  <button
                    onClick={() => deleteMyReviews(movie._id)}
                    className="text-red-500 hover:text-red-600 transition"
                    title="Delete Review"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <EditReviewForm
                  reviewId={movie._id}
                  initialRating={movie.rating}
                  initialComment={movie.comment}
                  edit={edit}
                  setEdit={setEdit}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}




// // frontend/src/pages/MyReviews.jsx
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import API from '../api';
// import EditReviewForm from './EditReviewForm';

// export default function MyReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [deleteReview, setDeleteReview] = useState(false);
//   const [edit, setEdit] = useState(false);
//  console.log(reviews);
//   useEffect(() => {
//     const fetchMyReviews = async () => {
//       try {
//         const res = await API.get('/reviews/user/myreviews');
//         setReviews(res.data);
//       } catch (err) {
//         console.error('Error fetching reviews:', err);
//       }
//     };
//     fetchMyReviews();
//   }, [setDeleteReview,deleteReview,edit,setEdit]);
//   const deleteMyReviews = async (reviewId) => {
//           console.log("deleteMyReviews", reviewId)
//         const res = await API.delete(`/reviews/${reviewId}`);
//         setDeleteReview(!deleteReview)
//     };
//   if (!localStorage.getItem('token')) {
//     return <div className="text-center mt-10">Please log in to view your reviews.</div>;
//   }

//  return (
//     <div className="max-w-5xl mx-auto mt-8 px-4">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">My Reviews</h1>

//       {reviews.length === 0 ? (
//         <p className="text-gray-500 text-lg">You haven’t posted any reviews yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {reviews.map((movie) => (
//             <div
//               key={movie.movieId}
//               className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
//             >
//               <img
//                 src={
//                   movie.moviePoster !== 'N/A'
//                     ? movie.moviePoster
//                     : 'https://via.placeholder.com/300x445?text=No+Image'
//                 }
//                 alt={movie.movieTitle}
//                 className="w-full md:w-48 h-72 object-cover"
//               />
//               <div className="flex-1 p-4 flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-800">{movie.movieTitle}</h3>
//                   <p className="mt-1 text-yellow-600 font-semibold">⭐ {movie.rating} / 10</p>
//                   <p className="mt-2 text-gray-600 text-sm">{movie.comment}</p>
//                 </div>

//                 <div className="mt-4">
//                   <Link
//                     to={`/movie/${movie.movieId}`}
//                     className="text-blue-600 font-medium hover:underline"
//                   >
//                     View Details →
//                   </Link>
//                   <p onClick={() => { deleteMyReviews(movie._id) }} className='cursor-pointer	'>DELETE</p>
//                   <EditReviewForm
//                   reviewId={movie._id}
//                   initialRating={movie.rating}
//                   initialComment={movie.comment}
//                   edit={edit}
//                   setEdit={setEdit}
//                   />

//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
