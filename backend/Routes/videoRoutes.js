
import {uploadVideo, getAllVideos, getVideoById, updateVideo, deleteVideo } from '../Controllers/videoController.js';
import { incrementViews, likeVideo, dislikeVideo } from '../Controllers/videoController.js';
import { protect } from '../middleware/authMiddleware.js';


export function videoRoutes(app) {

    app.get("/api/video", protect, getAllVideos);
    app.get("/api/video/:id", protect, getVideoById); 

    app.post("/api/video/upload", protect, uploadVideo);
    app.put("/api/video/:id", protect, updateVideo);
    app.delete("/api/video/:id", protect, deleteVideo);

    app.put("/api/video/:id/views", protect, incrementViews);
    app.put("/api/video/:id/like", protect, likeVideo);
    app.put("/api/video/:id/dislike", protect, dislikeVideo);
}