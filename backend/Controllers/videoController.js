import Video from "../Models/Video.model.js";
import channel from "../Models/Channel.model.js";

// ================================
// Upload a new video
// ================================
export const uploadVideo = async (req, res) => {
  try {

    const { title, videoUrl, thumbnailUrl, description, channelId, videoType } = req.body;
    const uploader = req.user?._id;

    // Validate required fields
    if (!title || !videoUrl || !thumbnailUrl || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new video document
    const newVideo = new Video({
      title,
      videoUrl,
      thumbnailUrl,
      description,
      uploader,
      videoType: videoType || "All",
      channelId,
      views: 0,
      likes: [],
      dislikes: [],
      comments: [],
    });

    await newVideo.save();

    // Add video to channel’s video array
    await channel.findByIdAndUpdate(
      channelId,
      { $push: { video: newVideo._id } },
      { new: true }
    );

    res.status(201).json({ message: "Video uploaded", video: newVideo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// Get all videos (with filter)
// ================================
export const getAllVideos = async (req, res) => {
  try {
    const { type, title } = req.query;

    // Build dynamic filter object
    const filter = {};
    if (type && type !== "All") {
      filter.videoType = { $regex: `^${type}$`, $options: "i" };
    }
    if (title && title.trim() !== "") {
      filter.title = { $regex: title, $options: "i" };
    }

    const videos = await Video.find(filter)
      .populate({
        path: 'uploader',
        select: 'username avatar createdAt channels',
        populate: {
          path: 'channels',
          select: 'channelName channelBanner subscribers createdAt',
        },
      })
      .populate("channelId", "channelName description channelBanner subscribers video createdAt")
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username avatar channels',
          populate: {
            path: 'channels',
            select: 'channelName',
          },
        },
      });

    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// Get a video by ID
// ================================
export const getVideoById = async (req, res) => {
  try {

    const video = await Video.findById(req.params.id)
      .populate({
        path: 'uploader',
        select: 'username avatar createdAt channels',
        populate: {
          path: 'channels',
          select: 'channelName channelBanner subscribers createdAt'
        }
      })
      .populate({
        path: 'channelId',
        select: 'channelName description channelBanner subscribers video createdAt'
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username avatar channels',
          populate: {
            path: 'channels',
            select: 'channelName'
          }
        }
      });

    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================================
// Update video (only owner)
// ================================
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Ensure only uploader can update
    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Only update allowed fields
    const allowedFields = ["title", "description", "thumbnailUrl", "videoUrl", "videoType"];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.status(200).json(updatedVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================================
// Delete video (only owner)
// ================================
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Ensure only uploader can delete
    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await video.deleteOne();
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================================
// Like a video (toggle)
// ================================
export const likeVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.user._id?.toString();

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Fallback in case arrays are undefined
    video.likes = video.likes || [];
    video.dislikes = video.dislikes || [];

    const likes = video.likes.map(id => id.toString());
    const dislikes = video.dislikes.map(id => id.toString());

    // Remove from dislikes if present
    if (dislikes.includes(userId)) {
      video.dislikes = video.dislikes.filter(id => id.toString() !== userId);
    }

    // Toggle like
    if (likes.includes(userId)) {
      video.likes = video.likes.filter(id => id.toString() !== userId);
    } else {
      video.likes.push(req.user._id);
    }

    const updated = await video.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================================
// Dislike a video (toggle)
// ================================
export const dislikeVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.user._id?.toString();

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.likes = video.likes || [];
    video.dislikes = video.dislikes || [];

    const likes = video.likes.map(id => id.toString());
    const dislikes = video.dislikes.map(id => id.toString());

    // Remove from likes if present
    if (likes.includes(userId)) {
      video.likes = video.likes.filter(id => id.toString() !== userId);
    }

    // Toggle dislike
    if (dislikes.includes(userId)) {
      video.dislikes = video.dislikes.filter(id => id.toString() !== userId);
    } else {
      video.dislikes.push(req.user._id);
    }

    const updated = await video.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================================
// Get all videos uploaded by a user
// ================================
export const getAllVideosByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const videos = await Video.find({ uploader: userId })
      .populate({
        path: 'uploader',
        select: 'username avatar createdAt channels about',
        populate: {
          path: 'channels',
          select: 'channelName channelBanner subscribers createdAt'
        }
      })
      .populate({
        path: 'channelId',
        select: 'channelName description channelBanner subscribers video createdAt'
      });

    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: "No videos found for this user" });
    }

    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
