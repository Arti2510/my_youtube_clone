import Comment from "../Models/Comment.model.js";
import Video from "../Models/Video.model.js";

// ====================================
// Post a new comment to a video
// ====================================
export const postComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { message } = req.body;
    const user = req.user.id; // user ID from auth middleware

    // Check if the video exists before commenting
    const videoExists = await Video.findById(videoId);
    if (!videoExists) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Create and save new comment
    const newComment = new Comment({ video: videoId, user, message });
    await newComment.save();

    // Add comment ID to the video's comments array
    await Video.findByIdAndUpdate(videoId, {
      $push: { comments: newComment._id }
    });

    res.status(201).json({ message: "Comment posted", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Failed to post comment" });
  }
};

// ====================================
// Get all comments for a video
// ====================================
export const getCommentsByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    // Find all comments for a video, populate user info, and sort by newest first
    const comments = await Comment.find({ video: videoId })
      .populate('user', 'channelName avatar username createdAt') // only selected fields from user
      .sort({ createdAt: -1 }); // latest comments first

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====================================
// Update a comment
// ====================================
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    // Check if comment exists
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only the comment owner can update it
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this comment" });
    }

    // Update the comment message (if provided)
    comment.message = req.body.message || comment.message;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment" });
  }
};

// ====================================
// Delete a comment
// ====================================
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    // Comment not found
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only the comment creator can delete it
    if (!req.user || comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    // Delete the comment
    await comment.deleteOne();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment" });
  }
};
