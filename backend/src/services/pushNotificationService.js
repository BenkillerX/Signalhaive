import webpush from "web-push";
import PushSubscription from "../models/PushSubcribtions.js";
webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export const sendPushNotification = async ({
  title,
  body,
  url = "/",
}) => {
  try {
    const subscriptions = await PushSubscription.find();

    const payload = JSON.stringify({
      title,
      body,
      url,
    });

    for (const subscription of subscriptions) {
      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: subscription.keys,
          },
          payload
        );
      } catch (error) {
        console.error(
          "Failed to send notification:",
          error.message
        );

        // Subscription is no longer valid
        if (error.statusCode === 404 || error.statusCode === 410) {
          await PushSubscription.deleteOne({
            _id: subscription._id,
          });
        }
      }
    }
  } catch (error) {
    console.error("Push notification service error:", error);
  }
};