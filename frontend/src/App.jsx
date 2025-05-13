// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Header from './components/Header';
import Watchlist from './pages/Watchlist';
import MyReviews from './pages/MyReviews';
import Forgot from './pages/forgot';

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/myreviews" element={<MyReviews />} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
