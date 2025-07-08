

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  password: { 
    type: String, 
    required: true, 
    trim: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    ]
  },
  avatar: { type: String, default: "https://t4.ftcdn.net/jpg/02/79/66/93/360_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg" },
  channelId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel', default: null }]
}, { 
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

export default userModel;