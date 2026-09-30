import Notification from "../../models/Notification.js";
import PushSubscription from "../../models/PushSubcribtions.js";
import { sendPushNotification } from "../../services/pushNotificationService.js";

export const createNotification = async (req, res) => {
  try {
    const { title, message, type, url } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        message: "Title and message are required",
      });
    }

    const notification = await Notification.create({
      title,
      message,
      type: type || "announcement",
      createdBy: req.user.id,
    });

    const pushResult = await sendPushNotification({
      title,
      body: message,
      url: url || "/notifications",
    });

    return res.status(201).json({
      message: "Notification created successfully",
      notification,
      pushNotifications: pushResult,
    });
  } catch (error) {
    console.error("Error creating notification:", error);

    return res.status(500).json({
      message: "Failed to create notification",
    });
  }
};
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting notification:", error);

    return res.status(500).json({
      message: "Failed to delete notification",
    });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.find()
      .sort({ createdAt: -1 });

    const notificationsWithReadStatus =
      notifications.map((notification) => {
        const readBy = notification.readBy ?? [];

        const isRead = readBy.some(
          (id) => id.toString() === userId.toString()
        );

        return {
          _id: notification._id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          createdAt: notification.createdAt,
          updatedAt: notification.updatedAt,
          isRead,
        };
      });

    return res.status(200).json({
      success: true,
      notifications: notificationsWithReadStatus,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications.",
    });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found.",
      });
    }

    await Notification.findByIdAndUpdate(id, {
      $addToSet: {
        readBy: userId,
      },
    });

    return res.status(200).json({
      message: "Notification marked as read.",
    });
  } catch (error) {
    console.error("Mark notification as read error:", error);

    return res.status(500).json({
      message: "Failed to mark notification as read.",
    });
  }
};

export const subscribeToPush = async (req, res) => {
  try {
    const { subscription } = req.body;

    if (!subscription) {
      return res.status(400).json({
        message: "Push subscription is required",
      });
    }

    const { endpoint, keys } = subscription;

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return res.status(400).json({
        message: "Invalid push subscription",
      });
    }

    const userId = req.user.id;

    const existingSubscription = await PushSubscription.findOne({
      endpoint,
    });

    if (existingSubscription) {
      existingSubscription.user = userId;
      existingSubscription.keys = keys;

      await existingSubscription.save();

      return res.status(200).json({
        message: "Push subscription updated successfully",
      });
    }

    await PushSubscription.create({
      user: userId,
      endpoint,
      keys,
    });

    return res.status(201).json({
      message: "Push subscription saved successfully",
    });
  } catch (error) {
    console.error("Error saving push subscription:", error);

    return res.status(500).json({
      message: "Failed to save push subscription",
    });
  }
};
export const unsubscribeFromPush = async (req, res) => {
  try {
    const { endpoint } = req.body;

    if (!endpoint) {
      return res.status(400).json({
        message: "Push subscription endpoint is required",
      });
    }

    await PushSubscription.deleteOne({
      endpoint,
      user: req.user.id,
    });

    return res.status(200).json({
      message: "Push subscription removed successfully",
    });
  } catch (error) {
    console.error("Error removing push subscription:", error);

    return res.status(500).json({
      message: "Failed to remove push subscription",
    });
  }
};