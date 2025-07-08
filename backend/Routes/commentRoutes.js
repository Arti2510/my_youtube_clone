
import { createComment, getCommentsByVideo, updateComment, deleteComment } from "../Controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js"; // for req.user._id


export function commentRoutes(app) {
    app.post("/api/comment", protect, createComment);
    app.get("/api/comment/:videoId", getCommentsByVideo);
    app.put("/api/comment/:id", protect, updateComment);
    app.delete("/api/comment/:id", protect, deleteComment);
}


