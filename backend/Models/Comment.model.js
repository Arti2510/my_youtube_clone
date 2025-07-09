// comment model

import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    videoId: {                         // Reference to the parent video
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video',
    required: true
  },
  userId: {                         // The user who posted the comment
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  text: {                           // The comment text
    type: String,
    required: true,
    trim: true
  },
  timestamp: {                      // When the comment was posted
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true  
});

const comment = mongoose.model('comment', commentSchema);

export default comment;