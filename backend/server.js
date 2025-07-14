import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';

// Import route modules
import authRoutes from './Routes/authRoutes.js';
import videoRoutes from "./Routes/videoRoutes.js";
import channelRoutes from "./Routes/channelRoutes.js";
import commentRoutes from "./Routes/commentRoutes.js";

dotenv.config(); // Load environment variables from .env file

const app = express();

// ============================
// Middleware Configuration
// ============================

// Enable CORS for all origins (you can restrict to specific domains)
app.use(cors({ credentials: true, origin: true }));

// Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

// ============================
// Health Check Route
// ============================
app.get("/", (req, res) => res.send("API running")); // Basic endpoint to check if server is live

// ============================
// API Route Mounting
// ============================

// Auth routes (Register, Login, Logout, Profile)
app.use('/api/auth', authRoutes);

// Video upload, fetch, update, delete, like/dislike
app.use('/api', videoRoutes);

// Comments on videos
app.use('/api/videocomment', commentRoutes);

// Channel creation, editing, deletion
app.use('/api/userchannel', channelRoutes);

// Global error handler middleware (used for catching thrown errors in async controllers)
app.use(errorHandler);

// ============================
// MongoDB Connection Setup
// ============================

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB connected");

    // Start the Express server once DB is connected
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));
