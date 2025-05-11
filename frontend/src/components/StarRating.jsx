import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function StarRating({ rating, setRating, editable = true }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex space-x-1">
      {[...Array(10)].map((_, index) => {
        const value = index + 1;
        return (
          <button
            key={value}
            type="button"
            onClick={() => editable && setRating(value)}
            onMouseEnter={() => editable && setHovered(value)}
            onMouseLeave={() => editable && setHovered(0)}
            className="focus:outline-none"
          >
            <FaStar
              size={24}
              className={
                value <= (hovered || rating)
                  ? 'text-amber-400'
                  : 'text-gray-400'
              }
            />
          </button>
        );
      })}
    </div>
  );
}
