import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const OMDB_API_KEY = 'be3db0cb'; 

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=hollywood&type=movie`);
        setMovies(res.data.Search || []);
      } catch (error) {
        console.error('Error fetching Hollywood movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const searchMovies = async () => {
    if (!query) return;
    try {
      setLoading(true);
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}&type=movie`);
      setMovies(res.data.Search || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(https://wallpapercave.com/wp/wp7016910.jpg)` }}>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">🎬 Explore Movies</h1>

        <div className="flex items-center gap-2 mb-10">
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow p-3 rounded-lg bg-white text-black placeholder-gray-600 shadow-md focus:outline-none"
          />
          <button
            onClick={searchMovies}
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all duration-200 text-white flex items-center"
          >
            <FaSearch />
          </button>
        </div>

        {loading ? (
          <p className="text-center text-lg animate-pulse">Loading movies...</p>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {movies.map((movie) => (
              <motion.div
                key={movie.imdbID}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}








