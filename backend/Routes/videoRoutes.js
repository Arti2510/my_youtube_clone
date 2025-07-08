
import {createVideo, getAllVideos, getVideoById, updateVideo, deleteVideo } from '../Controllers/videoController.js';
import { incrementViews, likeVideo, dislikeVideo } from '../Controllers/videoController.js';
import { protect } from '../middleware/authMiddleware.js';


export function videoRoutes(app) {
    // Public routes
    app.get("/", getAllVideos);
    app.get("/:id", getVideoById);

    // Protected routes
    app.post("/video", protect, createVideo);
    app.put("/:id", protect, updateVideo);
    app.delete("/:id", protect, deleteVideo);

    // Video interactions
    app.put("/:id/views", incrementViews);
    app.put("/:id/like", protect, likeVideo);
    app.put("/:id/dislike", protect, dislikeVideo);
}