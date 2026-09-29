import { Router } from "express";
import { subscribeToPush, unsubscribeFromPush } from "./notification.controller.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";

const notificationsRouter = Router();

notificationsRouter.post("/subscribe", authenticateToken,subscribeToPush);
notificationsRouter.delete(
  "/subscribe",
  authenticateToken,
  unsubscribeFromPush
);
export default notificationsRouter;