
import User from "../Models/User.model.js";
import Channel from "../Models/Channel.model.js";
import Video from "../Models/Video.model.js";

// Create a new video
export const uploadVideo = async (req, res) => {
  try {
    const { title, videoUrl, thumbnailUrl, description, channelId } = req.body;
    const uploader = req.user._id;
    console.log("req.user in createVideo:", req.user);

    const newVideo = new Video({
      title,
      videoUrl,
      thumbnailUrl,
      description,
      channelId,
      uploader,
      views,
      likes,
      dislikes,
    });

    await newVideo.save();
    res.status(201).json({ message: "Video uploaded", video: newVideo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    console.log("Fetching videos for user:", req.user);
    const videos = await Video.find()
      .populate("uploader", "username avatar")  // Optional: select fields
      .populate("channelId", "channelName");
    res.status(200).json(videos);
  } catch (err) {
    console.error("Backend error in getAllVideos:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get video by ID
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("uploader", "username")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username", // show commenter name
        },
      });
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a video
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (video.uploader.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const updated = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (video.uploader.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await video.deleteOne();
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Increment views
export const incrementViews = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like video
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.likes += 1;
    const updated = await video.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dislike video
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.dislikes += 1;
    const updated = await video.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
