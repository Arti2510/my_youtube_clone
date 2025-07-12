import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './Routes/authRoutes.js';
import videoRoutes from "./Routes/videoRoutes.js";
import channelRoutes from "./Routes/channelRoutes.js";
import commentRoutes from "./Routes/commentRoutes.js";
// import { userRoutes } from "./Routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());  // middleware for json data

app.use('/auth', authRoutes);
app.use('/api', videoRoutes);
app.use('/api/videocomment', commentRoutes);
app.use('/api/userchannel', channelRoutes);

app.use(errorHandler);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));