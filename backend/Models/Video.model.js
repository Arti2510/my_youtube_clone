// video model

import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  description: { type: String, default: '', trim: true },
  channelId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'channel' }],
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  videoType: {type: String, default: "All"}
}, {
  timestamps: true
});

const video = mongoose.model('video', VideoSchema);

export default video;