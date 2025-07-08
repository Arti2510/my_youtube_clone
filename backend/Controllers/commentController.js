import Comment from "../Models/Comment.model.js";
import Video from "../Models/Video.model.js";

// ✅ Create a new comment
export const createComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;
    const userId = req.user._id;

    // 🔍 Validate video
    const videoExists = await Video.findById(videoId);
    if (!videoExists) {
      return res.status(404).json({ message: "Video not found" });
    }

    const newComment = new Comment({ videoId, userId, text });
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Failed to post comment" });
  }
};

// ✅ Get all comments for a video (with video & user populated)
export const getCommentsByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.find({ videoId })
      .populate({
        path: "userId",
        select: "username email"
      })
      .populate({
        path: "videoId",
        select: "title videoUrl thumbnailUrl"
      })
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error("Error loading comments:", error);
    res.status(500).json({ message: "Failed to load comments" });
  }
};

// ✅ Update a comment
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this comment" });
    }

    comment.text = req.body.text || comment.text;
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

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment" });
  }
};
