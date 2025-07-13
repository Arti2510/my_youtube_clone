import { postComment, getCommentsByVideo, updateComment, deleteComment } from "../Controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js"; // for req.user._id
import express from 'express';
const router = express.Router();


// Create a comment
router.post("/comment/:videoId", protect, postComment);

// Get all comments for a video
router.get("/comment/:videoId", getCommentsByVideo);

// Update a specific comment
router.put("/comment/:id", protect, updateComment);

// Delete a specific comment
router.delete("/comment/:id", protect, deleteComment);


export default router;


