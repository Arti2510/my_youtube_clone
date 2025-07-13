
import Video from "../Models/Video.model.js";
import channel from "../Models/Channel.model.js";

// Create a new video
export const uploadVideo = async (req, res) => {
  try {
    console.log("📥 Video upload request body:", req.body);
    console.log("🔐 Authenticated user:", req.user);

    const { title, videoUrl, thumbnailUrl, description, channelId, videoType } = req.body;
    const uploader = req.user?._id;

    if (!title || !videoUrl || !thumbnailUrl || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newVideo = new Video({
      title,
      videoUrl,
      thumbnailUrl,
      description,
      uploader,
      videoType: videoType || "All",
      channelId: channelId,
      views: 0,
      likes: [],
      dislikes: [],
      comments: [],
    });

    console.log("📺 channelId received:", channelId);

    await newVideo.save();
    await channel.findByIdAndUpdate(
  channelId,
  { $push: { video: newVideo._id } }, // ✅ correct field name and variable
  { new: true }
);
    res.status(201).json({ message: "✅ Video uploaded", video: newVideo });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const getAllVideos = async (req, res) => {
  try {
    const { type, title } = req.query;

    // Build dynamic filter
    const filter = {};
    if (type && type !== "All") {
  filter.videoType = { $regex: `^${type}$`, $options: "i" }; // exact match, case-insensitive
}
    if (title && title.trim() !== "") {
      filter.title = { $regex: title, $options: "i" }; // Case-insensitive partial match
    }
    console.log("🎯 Final filter used:", filter);

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
    console.error("Backend error in getAllVideos:", err.message);
    res.status(500).json({ message: err.message });
  }
};




// // Get video by ID
export const getVideoById = async (req, res) => {
  try {
    console.log("Video ID:", req.params.id);
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


export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updateFields = { ...req.body };
    const updateQuery = {
      $set: { ...updateFields },
      $push: {}
    };

    // Push to array fields if provided
    if (req.body.channelId) {
      updateQuery.$push.channelId = { $each: req.body.channelId };
      delete updateQuery.$set.channelId;
    }

    if (req.body.comments) {
      updateQuery.$push.comments = { $each: req.body.comments };
      delete updateQuery.$set.comments;
    }

    // Remove empty $push
    if (Object.keys(updateQuery.$push).length === 0) {
      delete updateQuery.$push;
    }

    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, updateQuery, { new: true });

    res.status(200).json(updatedVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// // Delete a video
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

// Like video
// Like video
export const likeVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.user._id?.toString();

    console.log("🔐 User ID:", userId);
    console.log("🎬 Video ID:", videoId);

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // ✅ Fallback for old videos
    video.likes = video.likes || [];
    video.dislikes = video.dislikes || [];

    const likes = video.likes.map(id => id.toString());
    const dislikes = video.dislikes.map(id => id.toString());

    // Remove from dislikes
    if (dislikes.includes(userId)) {
      video.dislikes = video.dislikes.filter(id => id.toString() !== userId);
    }

    // Toggle like
    if (likes.includes(userId)) {
      video.likes = video.likes.filter(id => id.toString() !== userId);
      console.log("👍 Like removed");
    } else {
      video.likes.push(req.user._id);
      console.log("👍 Like added");
    }

    const updated = await video.save();
    res.status(200).json(updated);
  } catch (err) {
    console.error("🔥 LIKE VIDEO ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// Dislike video
export const dislikeVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.user._id?.toString();

    console.log("🔐 User ID:", userId);
    console.log("🎬 Video ID:", videoId);

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Ensure arrays exist
    video.likes = video.likes || [];
    video.dislikes = video.dislikes || [];

    const likes = video.likes.map(id => id.toString());
    const dislikes = video.dislikes.map(id => id.toString());

    // Remove from likes
    if (likes.includes(userId)) {
      video.likes = video.likes.filter(id => id.toString() !== userId);
    }

    // Toggle dislike
    if (dislikes.includes(userId)) {
      video.dislikes = video.dislikes.filter(id => id.toString() !== userId);
      console.log("👎 Dislike removed");
    } else {
      video.dislikes.push(req.user._id);
      console.log("👎 Dislike added");
    }

    const updated = await video.save();
    res.status(200).json(updated);
  } catch (err) {
    console.error("🔥 DISLIKE VIDEO ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};



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

