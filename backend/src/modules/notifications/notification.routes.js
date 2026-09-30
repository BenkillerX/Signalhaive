import { Router } from "express";

import {
  createNotification,
  deleteNotification,
  getAllNotifications,
  markNotificationAsRead,
  subscribeToPush,
  unsubscribeFromPush,
} from "./notification.controller.js";

import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/auth.middleware.js";

const notificationsRouter = Router();

notificationsRouter.post(
  "/create",
  authenticateToken,
  authorizeRoles("admin"),
  createNotification
);

notificationsRouter.post(
  "/subscribe",
  authenticateToken,
  subscribeToPush
);

notificationsRouter.delete(
  "/subscribe",
  authenticateToken,
  unsubscribeFromPush
);

notificationsRouter.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteNotification
);

notificationsRouter.get(
  "/",
  authenticateToken,
  getAllNotifications
);

// Mark notification as read
notificationsRouter.patch(
  "/:id/read",
  authenticateToken,
  markNotificationAsRead
);

export default notificationsRouter;