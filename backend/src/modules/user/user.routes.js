import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware.js";
import { deleteOwnAccount, updateProfile } from "./user.controllers.js";

const userRoutes = Router();

userRoutes.delete("/account",authenticateToken,deleteOwnAccount);
userRoutes.patch("/profile",authenticateToken,updateProfile);

export default userRoutes;