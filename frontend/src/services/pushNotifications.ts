import api from "./api";

const PUBLIC_VAPID_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from(
    [...rawData].map((char) => char.charCodeAt(0))
  );
};

export const registerPushNotifications = async () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service workers are not supported.");
  }

  if (!("PushManager" in window)) {
    throw new Error("Push notifications are not supported.");
  }

  if (!PUBLIC_VAPID_KEY) {
    throw new Error("VAPID public key is missing.");
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission was not granted.");
  }

  const registration = await navigator.serviceWorker.register("/sw.js");

  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
    });
  }

  return subscription;
};
export const unregisterPushNotifications = async () => {
  const registration = await navigator.serviceWorker.getRegistration("/sw.js");

  if (!registration) {
    return;
  }

  const subscription =
    await registration.pushManager.getSubscription();

  if (!subscription) {
    return;
  }

  await api.delete("/api/notifications/subscribe", {
    data: {
      endpoint: subscription.endpoint,
    },
  });

  await subscription.unsubscribe();
};