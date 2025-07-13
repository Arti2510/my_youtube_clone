// import {uploadVideo, getAllVideos, getVideoById, updateVideo, deleteVideo } from '../Controllers/videoController.js';
// import { incrementViews, likeVideo, dislikeVideo } from '../Controllers/videoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadVideo, getAllVideos, getVideoById, getAllVideosByUserId, updateVideo, deleteVideo, likeVideo, dislikeVideo } from '../Controllers/videoController.js';
import express from 'express';
const router = express.Router();

router.post('/:userId/:channelId/uploadVideo', protect, uploadVideo);
router.get('/getallvideo', getAllVideos);
router.get('/getVideoById/:id', getVideoById);
router.get('/:userId/channel', getAllVideosByUserId);
router.put('/video/:id', protect, updateVideo);
router.delete('/video/:id', protect, deleteVideo);
router.put('/video/:id/like', protect, likeVideo);
router.put('/video/:id/dislike', protect, dislikeVideo);

export default router;