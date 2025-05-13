import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const TrailerSearch = () => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [error, setError] = useState('');
  const { name } = useParams();

  useEffect(() => {
    if (name) {
      fetchTrailer(name);
    }
  }, [name]);

  const fetchTrailer = async (movieName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/movie-trailer?name=${encodeURIComponent(movieName)}`);
      const data = await response.json();

      if (data.trailerUrl) {
        const autoplayUrl = data.trailerUrl.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1';
        setTrailerUrl(autoplayUrl);
        setError('');
      } else {
        setTrailerUrl('');
        setError('Trailer not found.');
      }
    } catch (err) {
      setError('Error fetching trailer.');
      setTrailerUrl('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-red-500 flex items-center justify-center p-4">
      <motion.div
        className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-12 w-full max-w-6xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-white mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {name ? `${name} - Official Trailer` : 'Movie Trailer'}
        </motion.h2>

        {error && (
          <motion.p
            className="text-red-200 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {error}
          </motion.p>
        )}

        {trailerUrl && (
          <motion.div
            className="relative w-full overflow-hidden pb-[56.25%] rounded-xl shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={trailerUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Movie Trailer"
            ></iframe>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TrailerSearch;
