
import { postComment, getCommentsByVideo, updateComment, deleteComment } from "../Controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js"; // for req.user._id
import express from 'express';
const router = express.Router();


router.post("/comment/:videoId", protect, postComment);
router.get("/comment/:videoId", getCommentsByVideo);
router.put("/comment/:id", protect, updateComment);
router.delete("/comment/:id", protect, deleteComment);


export default router;


