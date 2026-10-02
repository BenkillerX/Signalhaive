import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware.js";
import { deleteOwnAccount, updatePassword, updateProfile } from "./user.controllers.js";

const userRoutes = Router();

userRoutes.delete("/account",authenticateToken,deleteOwnAccount);
userRoutes.patch("/profile",authenticateToken,updateProfile);
userRoutes.patch("/change-password",authenticateToken,updatePassword);

export default userRoutes;