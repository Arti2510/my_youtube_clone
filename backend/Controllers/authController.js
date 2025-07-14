// Import necessary modules
import User from "../Models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ==========================
// Register Controller
// ==========================
export const register = async (req, res, next) => {
  const { username, email, password, avatar, about } = req.body;

  // Input validations
  if (!username || username.trim() === '') {
    return res.status(400).json({ error: 'Full name is required' });
  }
  if (!email || email.trim() === '') {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!password || password.trim() === '') {
    return res.status(400).json({ error: 'Password is required' });
  }

  // Check if password is strong
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character',
    });
  }

  try {
    // Check if the email is already registered
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar,
      about,
    });

    // Save user to DB
    await newUser.save();

    // Respond with created user (excluding password)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        channels: newUser.channels, // Will be empty initially
      }
    });
  } catch (err) {
    next(err); // Pass errors to error middleware
  }
};

// ==========================
// Login Controller
// ==========================
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email and populate their channels
    const user = await User.findOne({ email }).populate('channels');
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare hashed password with input
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // 🧾 Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Set cookie for token (httpOnly for security)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure in production
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Respond with user info and token
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        channels: user.channels || [],
      },
    });
  } catch (err) {
    next(err); // Forward error
  }
};

// ==========================
// Logout Controller
// ==========================
export async function logout(req, res) {
  try {
    // Clear the auth cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// ==========================
// Get Authenticated User Profile
// ==========================
export const getUserProfile = async (req, res) => {
  try {
    // Get user data by ID from token and exclude sensitive fields
    const user = await User.findById(req.user._id)
      .select("-password -__v")
      .populate("channels", "channelName description channelBanner subscribers video");

    if (!user) return res.status(404).json({ message: "User not found" });

    // Return user profile
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
