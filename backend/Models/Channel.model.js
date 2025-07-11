// channel model

import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  channelBanner: {
    type: String,
    default: ''
  },
  subscribers: {
    type: Number,
    default: 0
  },
  video: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video'
  }]
}, {
  timestamps: true
});

const channel = mongoose.model('channel', channelSchema);

export default channel;