import USER from "../../models/User.js";

export const deleteOwnAccount = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await USER.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await USER.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete own account error:", error);

    return res.status(500).json({
      message: "Failed to delete account",
    });
  }
};