import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js'; // Middleware to authenticate and authorize users

import {
  uploadVideo,
  getAllVideos,
  getVideoById,
  getAllVideosByUserId,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo
} from '../Controllers/videoController.js';

// =========================================
// Video Routes Configuration
// =========================================

// Upload a new video (authenticated user required)
router.post('/:userId/:channelId/uploadVideo', protect, uploadVideo);

// Get all videos (with optional filters via query params)
router.get('/getallvideo', getAllVideos);

// Get a single video by its ID
router.get('/getVideoById/:id', getVideoById);

// Get all videos uploaded by a specific user
router.get('/user/:id', getAllVideosByUserId);

// Update a specific video (only uploader can update)
router.put('/video/:id', protect, updateVideo);

// Delete a specific video (only uploader can delete)
router.delete('/video/:id', protect, deleteVideo);

// Like a video (toggle like/dislike logic handled in controller)
router.put('/video/:id/like', protect, likeVideo);

// Dislike a video (toggle logic)
router.put('/video/:id/dislike', protect, dislikeVideo);

// Export the video router to be used in the main app
export default router;
