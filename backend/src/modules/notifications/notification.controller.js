import PushSubscription from "../../models/PushSubcribtions.js";

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