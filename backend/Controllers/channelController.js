import Channel from "../Models/Channel.model.js";
import User from "../Models/User.model.js";

// ✅ Create a new channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner, subscribers, video } = req.body;
    const user = req.user.id; // from auth middleware

    // Check for existing channel name
    const existing = await Channel.findOne({ channelName });
    if (existing) return res.status(400).json({ message: "Channel name already taken" });

    const newChannel = new Channel({ channelName, description, channelBanner, user, subscribers, video });
    await newChannel.save();

    res.status(201).json({ message: "Channel created", channel: newChannel });
  } catch (error) {
    console.error("Create Channel Error:", error);
    res.status(500).json({ message: "Server error while creating channel." });
  }
};

// ✅ Get all channels (with owner and videos populated)
export const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find()
      .populate("user", "username email")
      .populate({
        path: "video",
        select: "title thumbnailUrl videoUrl createdAt"
      });

    res.json(channels);
  } catch (error) {
    console.error("Error fetching all channels:", error);
    res.status(500).json({ message: "Failed to fetch channels" });
  }
};

// ✅ Get single channel by ID (with videos populated)
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("user", "username email")
      .populate({
        path: "video",
        select: "title thumbnailUrl videoUrl createdAt"
      });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (error) {
    console.error("Error fetching channel:", error);
    res.status(500).json({ message: "Error fetching channel" });
  }
};

// ✅ Update channel
export const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (channel.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this channel" });
    }

    const { channelName, description, channelBanner } = req.body;

    channel.channelName = channelName || channel.channelName;
    channel.description = description || channel.description;
    channel.channelBanner = channelBanner || channel.channelBanner;

    await channel.save();
    res.json(channel);
    
  } catch (error) {
    console.error("Error updating channel:", error);
    res.status(500).json({ message: "Error updating channel" });
  }
};

// ✅ Delete channel
export const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (channel.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this channel" });
    }

    await channel.deleteOne();
    res.json({ message: "Channel deleted successfully" });
  } catch (error) {
    console.error("Error deleting channel:", error);
    res.status(500).json({ message: "Error deleting channel" });
  }
};
