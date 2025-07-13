// user model

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
  about: {
    type: String,
    trim: true,
    default: "Hey there! I'm using YouTube Clone."
  },  
  avatar: { type: String, default: "https://t4.ftcdn.net/jpg/02/79/66/93/360_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg" },
  channels: { type: mongoose.Schema.Types.ObjectId, ref: 'channel'}
}, { 
    timestamps: true
});

const user = mongoose.model('user', userSchema);

export default user;