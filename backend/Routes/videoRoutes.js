
// import {uploadVideo, getAllVideos, getVideoById, updateVideo, deleteVideo } from '../Controllers/videoController.js';
// import { incrementViews, likeVideo, dislikeVideo } from '../Controllers/videoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadVideo, getAllVideos, getVideoById, getAllVideosByUserId, updateVideo, deleteVideo } from '../Controllers/videoController.js';
import express from 'express';
const router = express.Router();

router.post('/video', protect, uploadVideo);
router.get('/getallvideo', getAllVideos);
router.get('/getVideoById/:id', getVideoById);
router.get('/:userId/channel', getAllVideosByUserId);
router.put('/video/:id', protect, updateVideo);
router.delete('/video/:id', protect, deleteVideo);

export default router;