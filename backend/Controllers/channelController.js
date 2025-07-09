import Channel from "../Models/Channel.model.js";
import User from "../Models/User.model.js";

// ✅ Create a new channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner, subscribers } = req.body;
    const owner = req.user._id; // from auth middleware

    // Check for existing channel name
    const existing = await Channel.findOne({ channelName });
    if (existing) return res.status(400).json({ message: "Channel name already taken" });

    const newChannel = new Channel({ channelName, description, channelBanner, owner, subscribers });
    await newChannel.save();

     await User.findByIdAndUpdate(owner, { $push: { channelId: newChannel._id } });

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
      .populate("owner", "username email")
      .populate({
        path: "videos",
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
      .populate("owner", "username email")
      .populate({
        path: "videos",
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

    if (channel.owner.toString() !== req.user._id.toString()) {
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

    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this channel" });
    }

    await channel.deleteOne();
    res.json({ message: "Channel deleted successfully" });
  } catch (error) {
    console.error("Error deleting channel:", error);
    res.status(500).json({ message: "Error deleting channel" });
  }
};
