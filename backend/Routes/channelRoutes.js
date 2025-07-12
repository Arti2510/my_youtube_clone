
// import { createChannel, getAllChannels, getChannelById, updateChannel, deleteChannel } from "../Controllers/channelController.js";
import { protect } from "../middleware/authMiddleware.js"; // optional JWT middleware
import express from 'express';
const router = express.Router();
import { createChannel, getAllChannels, getChannelById, updateChannel, deleteChannel } from "../Controllers/channelController.js";


router.post("/:userId/channel", protect, createChannel);
router.get("/channels", getAllChannels); 
router.get("/channel/:id", getChannelById); 
router.put("/channel/:id", protect, updateChannel); 
router.delete("/channel/:id", protect, deleteChannel); 





export default router;