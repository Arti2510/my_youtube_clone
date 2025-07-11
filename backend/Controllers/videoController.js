
import Video from "../Models/Video.model.js";

// Create a new video
export const uploadVideo = async (req, res) => {
  try {
    const { title, videoUrl, thumbnailUrl, description, channelId, views, likes, dislikes, videoType, comments } = req.body;
    const uploader = req.user.id;

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
      videoType,
      comments,
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
    const videos = await Video.find().populate('uploader', 'channelName avatar username createdAt')
    .populate("channelId", "channelName description channelBanner subscribers video createdAt")
    .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username avatar channelName',
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
    const video = await Video.findById(req.params.id).populate('uploader', 'channelName avatar username createdAt')
    .populate("channelId", "channelName description channelBanner subscribers video createdAt")
    .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username avatar channelName',
        },
      }); 
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Update a video
// export const updateVideo = async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) return res.status(404).json({ message: "Video not found" });
//     // if (video.uploader.toString() !== req.user.id)
//     if (video.uploader.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     const updated = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updateFields = { ...req.body };

    // Optional: safely push into arrays instead of overwriting
    const updateQuery = {
      $set: {
        ...updateFields
      },
      $push: {}
    };

    if (req.body.channelId) {
      updateQuery.$push.channelId = { $each: req.body.channelId };
      delete updateQuery.$set.channelId;
    }

    if (req.body.commentId) {
      updateQuery.$push.commentId = { $each: req.body.commentId };
      delete updateQuery.$set.commentId;
    }

    // Remove empty $push if not used
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

// // Increment views
// export const incrementViews = async (req, res) => {
//   try {
//     const video = await Video.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { views: 1 } },
//       { new: true }
//     );
//     res.status(200).json(video);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Like video
// export const likeVideo = async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) return res.status(404).json({ message: "Video not found" });

//     video.likes += 1;
//     const updated = await video.save();
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Dislike video
// export const dislikeVideo = async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) return res.status(404).json({ message: "Video not found" });

//     video.dislikes += 1;
//     const updated = await video.save();
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const getAllVideosByUserId = async (req, res) => {
  try{
    let {userId} = req.params;
    const video = await Video.find({uploader:userId}).populate('uploader', 'channelName avatar username createdAt')
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.status(200).json(video);
  } catch(err){
    res.status(500).json({error: err.message});
  }
}
