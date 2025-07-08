
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  description: { type: String, default: '', trim: true },
  // channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  // views: { type: Number, default: 0 },
  // likes: { type: Number, default: 0 },
  // dislikes: { type: Number, default: 0 },
  // uploadDate: { type: Date, default: Date.now },
  // comments: [commentSchema]
}, {
  timestamps: true
});

const Video = mongoose.model('video', VideoSchema);

export default Video;