// video model

import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  description: { type: String, default: '', trim: true },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'channel', required: true},
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  likes: {
  type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  default: [],
},
  dislikes: {
  type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  default: [],
},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  videoType: {type: String, default: "All"}
}, {
  timestamps: true
});

const video = mongoose.model('video', VideoSchema);

export default video;