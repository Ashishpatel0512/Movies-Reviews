import React from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(rating)].map((_, index) => (
        <FaStar key={index} className="text-yellow-400 w-5 h-5" />
      ))}
    </div>
  );
};

export default Rating;
