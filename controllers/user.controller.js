const User = require("../models/user.model");

async function getMyProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateMyProfile(req, res) {
  try {
    const userId = req.user.id; // added by authMiddleware
    const { name } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (req.file) updateData.profilePic = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, // return updated user
      select: "-password", // exclude password
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getMyProfile, updateMyProfile };
