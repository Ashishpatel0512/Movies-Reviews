import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://wallpapercave.com/wp/wp6889279.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60" />

      <motion.div
        className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-violet-700 mb-6">
          Create Account
        </h2>
        {error && (
          <p className="text-red-500 text-center font-medium mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              name="username"
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}





// // frontend/src/pages/Register.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../api';

// export default function Register() {
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post('/users/register', form);
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('username', res.data.username);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
//       <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="username"
//           placeholder="Username"
//           className="w-full p-2 border rounded"
//           value={form.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }
