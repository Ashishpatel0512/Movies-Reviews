import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaUserCircle, FaListUl, FaFilm } from 'react-icons/fa';

export default function Header() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <motion.header
      className="bg-gradient-to-r from-black via-gray-900 to-black text-white px-6 py-4 shadow-md sticky top-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold hover:text-yellow-400 transition duration-300"
        >
          <FaFilm className="text-yellow-400" />
          MyMovies
        </Link>

        <nav className="flex gap-5 items-center text-sm md:text-base">
          {username ? (
            <>
              <span className="flex items-center gap-1 text-yellow-300">
                <FaUserCircle /> {username}
              </span>

              <Link
                to="/watchlist"
                className="hover:text-yellow-400 transition duration-300 flex items-center gap-1"
              >
                <FaListUl />
                Watchlist
              </Link>

              <Link
                to="/myreviews"
                className="hover:text-yellow-400 transition duration-300"
              >
                My Reviews
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition duration-300"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-400 transition duration-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-yellow-400 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
}




// // frontend/src/components/Header.jsx
// import { Link, useNavigate } from 'react-router-dom';

// export default function Header() {
//   const navigate = useNavigate();
//   const username = localStorage.getItem('username');

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     navigate('/login');
//   };

//   return (
//     <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
//       <Link to="/" className="text-xl font-bold">🎬 MyMovies</Link>
//       <div className="flex gap-4 items-center">
//         {username ? (
//           <>
//             <span>Hello, {username}</span>
//             <button
//               onClick={logout}
//               className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//              <Link to="/watchlist" className="hover:underline">
//              Watchlist
//             </Link>
//            <Link to="/myreviews" className="hover:underline">My Reviews</Link>

//           </>
//         ) : (
//           <>
//             <Link to="/login" className="hover:underline">Login</Link>
//             <Link to="/register" className="hover:underline">Register</Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
