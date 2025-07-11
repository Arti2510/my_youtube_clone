// comment model

import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  video: {                         // Reference to the parent video
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video',
    required: true
  },
  user: {                         // The user who posted the comment
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  message: {                           // The comment text
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true  
});

const comment = mongoose.model('comment', commentSchema);

export default comment;