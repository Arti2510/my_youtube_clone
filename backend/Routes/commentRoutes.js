import express from 'express';
const router = express.Router();

import { 
  postComment, 
  getCommentsByVideo, 
  updateComment, 
  deleteComment 
} from "../Controllers/commentController.js";

import { protect } from "../middleware/authMiddleware.js"; // Middleware to verify JWT and get req.user

// ==========================================
// Comment Routes Configuration
// ==========================================

// Create a new comment for a video (must be logged in)
router.post("/comment/:videoId", protect, postComment);

// Get all comments for a specific video (public)
router.get("/comment/:videoId", getCommentsByVideo);

// Update a specific comment (only by the comment's owner)
router.put("/comment/:id", protect, updateComment);

// Delete a specific comment (only by the comment's owner)
router.delete("/comment/:id", protect, deleteComment);

// Export the router to use in main app
export default router;
