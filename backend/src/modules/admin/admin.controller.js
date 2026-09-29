import Signal from "../../models/Signal.js";
import USER from "../../models/User.js";

export const getAdminStats = async (req, res) => {
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

export const getAllUsers = async (req, res) => {
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