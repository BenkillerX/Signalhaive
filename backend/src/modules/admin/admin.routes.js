import {Router} from 'express'
import { getAdminStats, getAllUsers } from './admin.controller.js';
import { authenticateToken, authorizeRoles } from '../../middleware/auth.middleware.js';
const adminRoutes = Router();
adminRoutes.get('/stats',authenticateToken , authorizeRoles('admin'),getAdminStats)
adminRoutes.get('/users',authenticateToken , authorizeRoles('admin'),getAllUsers)
export default adminRoutes;