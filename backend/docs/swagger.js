// docs/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Review App API',
      version: '1.0.0',
      description: 'API documentation for user registration and login',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Update with your server URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Points to where API doc comments are
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
