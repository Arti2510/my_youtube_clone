import { register, login, logout, getUserProfile } from '../Controllers/authController.js';
import express from 'express';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router(); // Create a new router instance

// =============================
// Auth Routes Configuration
// =============================

// Register a new user
router.post('/register', register);

// Login existing user
router.post('/login', login);

// Logout user (clears cookie/token)
router.post('/logout', logout);

// Get specific user's profile (protected route)
router.get("/profile/:id", protect, getUserProfile);

// Get currently logged-in user's ID (used for auto-login/session check)
router.get("/current", protect, (req, res) => {
  res.json({ _id: req.user._id }); // returns user ID extracted from verified token
});

// Export the router to be used in main app.js/server.js
export default router;
