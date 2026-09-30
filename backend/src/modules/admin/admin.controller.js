import Signal from "../../models/Signal.js";
import USER from "../../models/User.js";

export const getAdminStats = async (_, res) => {
  try {
    const users = await USER.countDocuments();

    const activeSignals = await Signal.countDocuments({
      status: "ACTIVE",
    });

    res.status(200).json({
      users,
      activeSignals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch admin statistics",
    });
  }
};

export const getAllUsers = async (_, res) => {
  try {
    const users = await USER.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

export const banUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await USER.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admin users cannot be banned",
      });
    }

    if (user.isBanned) {
      return res.status(400).json({
        message: "User is already banned",
      });
    }

    user.isBanned = true;
    user.bannedAt = new Date();
    user.banReason = reason?.trim() || "No reason provided";

    await user.save();

    return res.status(200).json({
      message: "User banned successfully",
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        isBanned: user.isBanned,
        bannedAt: user.bannedAt,
        banReason: user.banReason,
      },
    });
  } catch (error) {
    console.error("Ban user error:", error);

    return res.status(500).json({
      message: "Failed to ban user",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await USER.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admin users cannot be deleted",
      });
    }

    await USER.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return res.status(500).json({
      message: "Failed to delete user",
    });
  }
};