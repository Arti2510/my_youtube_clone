import { register, login, logout , getUserProfile } from '../Controllers/authController.js';
import express from 'express';
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Profile route (protected)
router.get("/profile/:id", protect, getUserProfile);
router.get("/current", protect, (req, res) => {
  res.json({ _id: req.user._id });
});

export default router;