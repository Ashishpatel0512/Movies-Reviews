// frontend/src/pages/Watchlist.jsx
import { useEffect, useState } from 'react';
import API from '../api';
import MovieCard from '../components/MovieCard';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  console.log('Watchlist:', watchlist);
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await API.get('/movies/watchlist');
        setWatchlist(res.data);
      } catch (err) {
        console.error('Error fetching watchlist:', err);
      }
    };
    fetchWatchlist();
  }, []);

  if (!localStorage.getItem('token')) {
    return <div className="text-center mt-10">Please log in to view your watchlist.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
      {watchlist?.length === 0 ? (
        <p className="text-gray-600">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {watchlist?.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
