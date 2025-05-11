// frontend/src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">🎬 MyMovies</Link>
      <div className="flex gap-4 items-center">
        {username ? (
          <>
            <span>Hello, {username}</span>
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
             <Link to="/watchlist" className="hover:underline">
             Watchlist
            </Link>
           <Link to="/myreviews" className="hover:underline">My Reviews</Link>

          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
