import jwt from "jsonwebtoken";
import User from "../Models/User.model.js";

// =======================================
// Middleware to protect private routes
// =======================================
export const protect = async (req, res, next) => {
  try {
    // Try to get token from either:
    // - Authorization header → Bearer <token>
    // - Cookie → token
    const token =
      req.headers.authorization?.split(" ")[1] || // Bearer token
      req.cookies?.token; // Cookie token

    // If token not found, block access
    if (!token)
      return res.status(401).json({ message: "No token provided" });

    // Decode & verify the JWT token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded token ID and exclude password
    const user = await User.findById(decoded.id).select("-password");

    // If user doesn't exist anymore
    if (!user)
      return res.status(401).json({ message: "User not found" });

    // Attach user info to the request object for future use
    req.user = user;

    // Move to next middleware or controller
    next();
  } catch (err) {
    // If token is invalid or expired
    res.status(401).json({ message: "Invalid token" });
  }
};
