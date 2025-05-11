import React, { useEffect, useState } from 'react';
import { fetchMoviesByKeyword } from '../utils/omdb';
import MovieCategorySection from '../components/MovieCategorySection';

const categories = {
  Bollywood: 'shahrukh',
  Hollywood: 'hollywood',
  'Top Movies': 'dark knight',
  'Love Stories': 'romance',
  Horror: 'conjuring',
  Funny: 'hangover',
  Fight: 'john wick',
};

function Newpage() {
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      const results = {};
      for (const [label, keyword] of Object.entries(categories)) {
        results[label] = await fetchMoviesByKeyword(keyword);
      }
      setMovieData(results);
    };
    fetchAll();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {Object.entries(movieData).map(([label, movies]) => (
        <MovieCategorySection key={label} title={label} movies={movies} />
      ))}
    </div>
  );
}

export default Newpage;
