import mongoose from "mongoose";

// ============================
// Channel Schema Definition
// ============================
const channelSchema = new mongoose.Schema({

  // Channel name (must be unique and required)
  channelName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  // Reference to the user who owns this channel
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // references 'user' collection
    required: true
  },

  // Optional description for the channel
  description: {
    type: String,
    default: '',
    trim: true
  },

  // Optional URL to the channel banner image
  channelBanner: {
    type: String,
    default: ''
  },

  // Number of subscribers (defaults to 0)
  subscribers: {
    type: Number,
    default: 0
  },

  // Array of video ObjectIds associated with this channel
  video: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video' // references 'video' collection
  }]
}, {
  // Adds createdAt and updatedAt timestamps automatically
  timestamps: true
});

// ✅ Create and export the Channel model
const channel = mongoose.model('channel', channelSchema);

export default channel;
