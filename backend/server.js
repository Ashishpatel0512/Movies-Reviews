// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');
// const Otp = require('./models/Otp');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
// const sendMail = require('./config/sendmail.js');
dotenv.config();
const app = express();
const axios = require('axios');
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);


// Route to fetch movie trailer by movie name
app.get('/api/movie-trailer', async (req, res) => {
  const movieName = req.query.name;
  console.log(movieName)
  if (!movieName) {
    return res.status(400).json({ error: 'Movie name is required.' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 1,
        q: `${movieName} trailer`,
        type: 'video',
        key: YOUTUBE_API_KEY
      }
    });
   console.log(response.data)
    const video = response.data.items[0];

    if (video) {
      const trailerUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
      res.json({ trailerUrl });
    } else {
      res.status(404).json({ error: 'Trailer not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching trailer.' });
  }
});


// DB + Server Start
const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://127.0.0.1:27017/moviedb'||process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
