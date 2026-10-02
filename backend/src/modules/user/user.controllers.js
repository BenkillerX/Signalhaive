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
export const updateProfile = async (req, res) => {
  try {
    const { firstname, lastname } = req.body;

    const user = await USER.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (firstname !== undefined) {
      user.firstname = firstname.trim();
    }

    if (lastname !== undefined) {
      user.lastname = lastname.trim();
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};