import Comment from "../Models/Comment.model.js";
import Video from "../Models/Video.model.js";

// ✅ Create a new comment
export const postComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { message } = req.body;
    const user = req.user.id;

    // 🔍 Validate video
    const videoExists = await Video.findById(videoId);
    if (!videoExists) {
      return res.status(404).json({ message: "Video not found" });
    }

    const newComment = new Comment({ video: videoId, user, message });
    await newComment.save();

    await Video.findByIdAndUpdate(videoId, {
      $push: { comments: newComment._id }
    });

    res.status(201).json({ message: "Comment posted", comment: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Failed to post comment" });
  }
};

// ✅ Get all comments for a video (with video & user populated)
export const getCommentsByVideo = async (req, res) => {
  try {    

    const { videoId } = req.params;
    const comments = await Comment.find({ video : videoId }).populate('user', 'channelName avatar username createdAt')
    .sort({ createdAt: -1 });
    res.status(200).json(comments);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update a comment
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    console.log("comment.user:", comment.user);
    console.log("req.user:", req.user);

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this comment" });
    }

    comment.message = req.body.message || comment.message;
    await comment.save();

    res.json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Error updating comment" });
  }
};

// ✅ Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!req.user || comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment" });
  }
};
