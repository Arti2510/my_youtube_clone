import mongoose from "mongoose";

// ========================================
// Comment Schema Definition
// ========================================
export const commentSchema = new mongoose.Schema({

  // Reference to the video this comment belongs to
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video',              // Refers to the 'video' collection
    required: true
  },

  // Reference to the user who made the comment
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',               // Refers to the 'user' collection
    required: true
  },

  // The actual comment text
  message: {
    type: String,
    required: true,
    trim: true                // Removes whitespace from start and end
  }

}, {
  // Automatically manage createdAt and updatedAt timestamps
  timestamps: true
});

// Create and export the Comment model
const comment = mongoose.model('comment', commentSchema);

export default comment;
