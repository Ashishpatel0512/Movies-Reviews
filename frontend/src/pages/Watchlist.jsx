import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import API from '../api';
import MovieCard from '../components/MovieCard';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
 const [remove,setremove] = useState(false)
  useEffect(() => {
    if (!token) return;
    const fetchWatchlist = async () => {
      try {
        const res = await API.get('/movies/watchlist');
        setWatchlist(res.data);
      } catch (err) {
        console.error('Error fetching watchlist:', err);
      }
    };
    fetchWatchlist();
  }, [token,remove,setremove]);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">
        🔒 Please log in to view your watchlist.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white py-10 px-4 transition-all duration-700 bg-opacity-200" 
      style={{
        backgroundImage:
          "url('https://genotipia.com/wp-content/uploads/2020/04/Netflix-Background-prueba-1.jpg')",
      }}
    >
      <div className="backdrop-blur-sm bg-black bg-opacity-60 p-6 rounded-xl max-w-6xl mx-auto shadow-lg transition-all duration-700">
        <motion.h1
          className="text-3xl font-bold mb-6 text-yellow-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎬 {username}'s Watchlist
        </motion.h1>

        {watchlist?.length === 0 ? (
          <motion.p
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your watchlist is empty. Add some movies to get started!
          </motion.p>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {watchlist.map((movie) => (
              <motion.div
                key={movie.imdbID}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <MovieCard movie={movie} remove={remove} setremove={setremove} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}




