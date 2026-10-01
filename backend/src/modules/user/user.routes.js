import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware.js";
import { deleteOwnAccount } from "./user.controllers.js";

const userRoutes = Router();

userRoutes.delete("/account",authenticateToken,deleteOwnAccount);

export default userRoutes;