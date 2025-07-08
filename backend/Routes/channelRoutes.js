
import { createChannel, getAllChannels, getChannelById, updateChannel, deleteChannel } from "../Controllers/channelController.js";

import { protect } from "../middleware/authMiddleware.js"; // optional JWT middleware

export function channelRoutes(app) {
    app.post("/api/channels", protect, createChannel);
    app.get("/api/channels", getAllChannels); 
    app.get("/api/channels/:id", getChannelById); 
    app.put("/api/channels/:id", protect, updateChannel); 
    app.delete("/api/channels/:id", protect, deleteChannel); 
}
