import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import { RiDeleteBinFill } from "react-icons/ri";

import API from '../api';
export default function MovieCard({ movie,remove, setremove }) {
   const Deletewatchlist =async (movieId) => {
     const res =await API.delete(`/movies/${movieId}`);
     setremove(!remove);
  }
  return (
    <motion.div
      className="rounded-xl overflow-hidden backdrop-blur-lg bg-white bg-opacity-10 shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
        alt={movie.Title}
        className="w-full h-72 object-cover"
      />
      <div className="p-3 text-white">
        <h3 className="font-semibold text-lg truncate">{movie.Title}</h3>
        <p className="text-sm text-gray-300">{movie.Year}</p>
        <div className='flex justify-between items-center'>
        <Link
          to={`/movie/${movie.imdbID}`}
          className="mt-2 inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition duration-200"
        >
          <FaEye className="text-sm" /> View Details
        </Link>
          <p onClick={() => { Deletewatchlist(movie._id) }}>
            <RiDeleteBinFill />

          </p>
          </div>
      </div>
     
    </motion.div>
  );
}






// // frontend/src/components/MovieCard.jsx
// import { Link } from 'react-router-dom';

// export default function MovieCard({ movie }) {
//   return (
//     <div className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
//       <img
//         src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
//         alt={movie.Title}
//         className="w-full h-72 object-cover"
//       />
//       <div className="p-2">
//         <h3 className="font-bold text-lg">{movie.Title}</h3>
//         <p className="text-sm text-gray-600">{movie.Year}</p>
//         <Link
//           to={`/movie/${movie.imdbID}`}
//           className="mt-2 inline-block text-blue-600 hover:underline"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// }
