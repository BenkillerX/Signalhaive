import {Router} from 'express'
import { banUser, deleteUser, getAdminStats, getAllUsers, unbanUser } from './admin.controller.js';
import { authenticateToken, authorizeRoles } from '../../middleware/auth.middleware.js';
const adminRoutes = Router();
adminRoutes.get('/stats',authenticateToken , authorizeRoles('admin'),getAdminStats)
adminRoutes.get('/users',authenticateToken , authorizeRoles('admin'),getAllUsers)
adminRoutes.patch("/users/:userId/ban", authenticateToken, authorizeRoles("admin"), banUser);
adminRoutes.patch("/users/:userId/unban", authenticateToken, authorizeRoles("admin"), unbanUser);

adminRoutes.delete("/users/:userId", authenticateToken, authorizeRoles("admin"), deleteUser);
export default adminRoutes;