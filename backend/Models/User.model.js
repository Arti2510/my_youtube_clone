import mongoose from "mongoose";

// =========================================
// User Schema Definition
// =========================================
const userSchema = new mongoose.Schema({

  // 👤 Unique username for the user
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // Email address with validation and uniqueness
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,       // stored in lowercase
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },

  // Password with strong regex validation
  password: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    ]
  },

  // Optional short bio for user profile
  about: {
    type: String,
    trim: true,
    default: "Hey there! I'm using YouTube Clone."
  },

  // Avatar image URL (default image if not provided)
  avatar: {
    type: String,
    default: "https://t4.ftcdn.net/jpg/02/79/66/93/360_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg"
  },

  // Reference to the user's personal channel
  channels: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'channel'
  }

}, {
  // Automatically manage createdAt and updatedAt fields
  timestamps: true
});

// Create and export the User model
const user = mongoose.model('user', userSchema);

export default user;
