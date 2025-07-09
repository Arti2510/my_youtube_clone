
import User from "../Models/User.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("channelId");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
