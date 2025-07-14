import Channel from "../Models/Channel.model.js";
import User from "../Models/User.model.js";

// ===============================
// Create a new channel
// ===============================
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner, subscribers, video } = req.body;
    const userId = req.user.id; // user ID from auth middleware

    // 🔍 Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent duplicate channel for the same user
    if (user.channels) {
      return res.status(400).json({ message: "User already has a channel" });
    }

    // Check if channel name is already taken
    const existing = await Channel.findOne({ channelName });
    if (existing) return res.status(400).json({ message: "Channel name already taken" });

    // Create and save new channel
    const newChannel = new Channel({ channelName, description, channelBanner, user, subscribers, video });
    await newChannel.save();

    // Save channel reference to user's record
    user.channels = newChannel._id;
    await user.save(); // persist the update

    res.status(201).json({ message: "Channel created", channel: newChannel });
  } catch (error) {
    res.status(500).json({ message: "Server error while creating channel." });
  }
};

// ==========================================
// Get all channels with user and videos
// ==========================================
export const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find()
      .populate("user", "username email") // show owner basic info
      .populate({
        path: "video",
        select: "title thumbnailUrl videoUrl createdAt" // show video info
      });

    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch channels" });
  }
};

// ==========================================
// Get a single channel by its ID
// ==========================================
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("user", "username email avatar") // include owner info
      .populate({
        path: "video",
        select: "title thumbnailUrl videoUrl createdAt" // include videos
      });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching channel" });
  }
};

// ==========================
// Update a channel
// ==========================
export const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    // If channel doesn't exist
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Allow update only if logged-in user is the owner
    if (channel.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this channel" });
    }

    // Only update allowed fields
    const allowedFields = ["channelName", "description", "channelBanner"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        channel[field] = req.body[field];
      }
    });

    await channel.save(); // Save updates
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: "Error updating channel" });
  }
};

// ==========================
// Delete a channel
// ==========================
export const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    // Channel not found
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Only owner can delete their channel
    if (channel.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this channel" });
    }

    // Delete channel (note: related videos should be handled if required)
    await channel.deleteOne();
    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting channel" });
  }
};

// ==================================================
// Get a channel by user ID (user’s own channel)
// ==================================================
export const getChannelByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const channel = await Channel.findOne({ user: userId })
      .populate("user", "username email avatar") // include user info
      .populate({
        path: "video",
        select: "title thumbnailUrl videoUrl createdAt uploader", // video info + uploader
        populate: {
          path: "uploader",
          select: "_id username email avatar", // uploader's info
        },
      });

    if (!channel) {
      return res.status(404).json({ message: "No channel found for this user" });
    }

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching channel by user ID" });
  }
};
