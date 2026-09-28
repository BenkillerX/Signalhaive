import { Router } from "express";
import { emailValidation, forgotPassword, getCurrentUser, Login, register, resetPassword,} from "./auth.controller.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";

const authRoutes = Router();
authRoutes.post('/register', register)
authRoutes.post('/login', Login)
authRoutes.post('/forgot-password', forgotPassword)
authRoutes.post("/reset-password", resetPassword);
authRoutes.get('/me',authenticateToken ,getCurrentUser)
authRoutes.post("/verify-email", emailValidation);
export default authRoutes