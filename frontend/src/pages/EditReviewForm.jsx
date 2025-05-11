import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import API from "../api";
const EditReviewForm = ({ reviewId, initialRating, initialComment,edit,setEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
              const res= await API.put(`/reviews/${reviewId}`,{ rating, comment });

    //   const res = await fetch(`/api/reviews/${reviewId}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //     body: JSON.stringify({ rating, comment }),
    //   });
      console.log("res", res);
    //   const data = await res.json();
    //   if (!res.ok) {
    //     return alert(data.message || "Update failed");
    //   }
          setEdit(!edit)

      alert("Review updated successfully");
      setIsEditing(false);
    } catch (err) {
      alert("Error updating review");
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <FaEdit />
        <span>Edit</span>
      </button>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min={1}
              max={10}
              required
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              required
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Review
          </button>
        </form>
      )}
    </div>
  );
};

export default EditReviewForm;
