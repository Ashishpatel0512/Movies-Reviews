// frontend/src/components/MovieCard.jsx
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
        alt={movie.Title}
        className="w-full h-72 object-cover"
      />
      <div className="p-2">
        <h3 className="font-bold text-lg">{movie.Title}</h3>
        <p className="text-sm text-gray-600">{movie.Year}</p>
        <Link
          to={`/movie/${movie.imdbID}`}
          className="mt-2 inline-block text-blue-600 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
