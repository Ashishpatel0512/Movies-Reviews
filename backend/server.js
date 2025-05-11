// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// DB + Server Start
const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://127.0.0.1:27017/moviedb'||process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
