import mongoose from "mongoose";

// ==========================================
// Video Schema Definition
// ==========================================
const VideoSchema = new mongoose.Schema({

  // 🎬 Title of the video
  title: {
    type: String,
    required: true,
    trim: true
  },

  // URL pointing to the uploaded video file (usually from server or cloud storage)
  videoUrl: {
    type: String,
    required: true
  },

  // URL to the video's thumbnail image
  thumbnailUrl: {
    type: String,
    required: true
  },

  // Description of the video content
  description: {
    type: String,
    default: '',
    trim: true
  },

  // Reference to the channel where this video is posted
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'channel',
    required: true
  },

  // Reference to the user who uploaded the video
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  // Array of user IDs who liked the video
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: []
  },

  // Array of user IDs who disliked the video
  dislikes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: []
  },

  // Array of comment IDs associated with this video
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment"
  }],

  // Category or type of video (e.g., "Music", "Education", etc.)
  videoType: {
    type: String,
    default: "All"
  }

}, {
  // Automatically adds createdAt and updatedAt fields
  timestamps: true
});

// Create and export the Video model
const video = mongoose.model('video', VideoSchema);

export default video;
