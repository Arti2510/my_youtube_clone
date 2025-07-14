import express from 'express';
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js"; // Middleware to protect routes (validates JWT)

import {
  createChannel,
  getAllChannels,
  getChannelById,
  updateChannel,
  deleteChannel,
  getChannelByUserId
} from "../Controllers/channelController.js";

// ====================================
// Channel Routes Configuration
// ====================================

// Create a new channel for a user (protected)
router.post("/:userId/channel", protect, createChannel);

// Get all channels (public)
router.get("/channels", getAllChannels);

// Get a specific channel by its ID (public)
router.get("/channel/:id", getChannelById);

// Update a channel by ID (protected, only by owner)
router.put("/channel/:id", protect, updateChannel);

// Delete a channel by ID (protected, only by owner)
router.delete("/channel/:id", protect, deleteChannel);

// Get channel by user ID (protected)
router.get("/channel/user/:userId", protect, getChannelByUserId);

// Export the router to be used in the main application
export default router;
