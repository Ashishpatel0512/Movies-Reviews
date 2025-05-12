/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *           example: john_doe
 *         password:
 *           type: string
 *           description: The password of the user
 *           example: password123
 *       required:
 *         - username
 *         - password
 *       description: User login and registration details
 * 
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token for the authenticated user
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjk5Mzg0LThjNjItNGU3Ni05MzFkLTljZjZlZDhhZDAwZCIsImlhdCI6MTYzOTg1NzMzN30.H3g4_Xl9X01_ol5lz_Kmx9G8Ug9swX3cdmn8EzuzwFk"
 *         username:
 *           type: string
 *           description: The username of the authenticated user
 *           example: john_doe
 *       required:
 *         - token
 *         - username
 *       description: Response containing the authentication token and username.
 * 
 * paths:
 *   /api/users/register:
 *     post:
 *       summary: Register a new user
 *       description: This endpoint registers a new user and returns an authentication token.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '201':
 *           description: User successfully registered
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AuthResponse'
 *         '400':
 *           description: User already exists
 *         '500':
 *           description: Server error
 * 
 *   /api/users/login:
 *     post:
 *       summary: Login an existing user
 *       description: This endpoint logs in a user and returns an authentication token.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: User successfully logged in
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AuthResponse'
 *         '401':
 *           description: Invalid credentials
 *         '500':
 *           description: Server error
 */





// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
