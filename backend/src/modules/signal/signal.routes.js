import {Router} from 'express'
import { createSignal, getSignals, deleteSignal } from './signal.controller.js';
import { authenticateToken, authorizeRoles } from '../../middleware/auth.middleware.js';

const signalRoutes = Router();
signalRoutes.post('/',authenticateToken,authorizeRoles('admin'),createSignal)
signalRoutes.get('/',authenticateToken,getSignals)
signalRoutes.delete("/:id",authenticateToken,authorizeRoles("admin"),deleteSignal);

export default signalRoutes;