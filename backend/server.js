
import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {authRoutes} from './Routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { videoRoutes } from "./Routes/videoRoutes.js";
import { channelRoutes } from "./Routes/channelRoutes.js";
import { commentRoutes } from "./Routes/commentRoutes.js";
import { userRoutes } from "./Routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());  // middleware for json data

videoRoutes(app);
authRoutes(app);
channelRoutes(app);
commentRoutes(app);
userRoutes(app);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));






