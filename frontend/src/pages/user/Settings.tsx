import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  registerPushNotifications,
  unregisterPushNotifications,
} from "../../services/pushNotifications";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import UserProfile from "./UserProfile";
import UserPassword from "./UserPassword";
import UserSubcription from "./UserSubcription";

const Settings = () => {
  const { currentUser, refreshCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [notificationsEnabled, setNotificationsEnabled] =
    useState(false);

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
const handleSaveProfile = async () => {
  try {
    setProfileLoading(true);

    await api.patch("/api/user/profile", {
      firstname: profileData.firstname.trim(),
      lastname: profileData.lastname.trim(),
    });

    await refreshCurrentUser();

    setIsEditingProfile(false);

    toast.success("Profile updated successfully.");
  } catch (error) {
    console.error("Failed to update profile:", error);
    toast.error("Failed to update profile.");
  } finally {
    setProfileLoading(false);
  }
};
  const [profileData, setProfileData] = useState({
    firstname: currentUser?.firstname ?? "",
    lastname: currentUser?.lastname ?? "",
  });

  const [notificationLoading, setNotificationLoading] =
    useState(false);

  const getInitials = () => {
    if (!currentUser) return "U";

    return (
      `${currentUser.firstname?.[0] ?? ""}${currentUser.lastname?.[0] ?? ""}`
        .toUpperCase()
        .trim() || "U"
    );
  };

  useEffect(() => {
    const checkNotificationStatus = async () => {
      if (!("Notification" in window)) {
        return;
      }

      if (Notification.permission !== "granted") {
        setNotificationsEnabled(false);
        return;
      }

      const registration =
        await navigator.serviceWorker.getRegistration("/sw.js");

      if (!registration) {
        setNotificationsEnabled(false);
        return;
      }

      const subscription =
        await registration.pushManager.getSubscription();

      setNotificationsEnabled(!!subscription);
    };

    checkNotificationStatus();
  }, []);

  const handleNotificationToggle = async () => {
    try {
      setNotificationLoading(true);

      if (notificationsEnabled) {
        await unregisterPushNotifications();

        setNotificationsEnabled(false);

        return;
      }

      const subscription = await registerPushNotifications();

      await api.post("/api/notifications/subscribe", {
        subscription,
      });

      setNotificationsEnabled(true);
    } catch (error) {
      console.error("Notification toggle failed:", error);
      toast.error("Failed to update notification settings.");
    } finally {
      setNotificationLoading(false);
    }
  };

  const handleEditProfile = () => {
    if (!currentUser) return;

    setProfileData({
      firstname: currentUser.firstname ?? "",
      lastname: currentUser.lastname ?? "",
    });

    setIsEditingProfile(true);
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);

    try {
      await api.delete("/api/user/account");

      localStorage.removeItem("token");

      setShowDeleteModal(false);

      toast.success("Your account has been deleted.");

      navigate("/login");
    } catch (error) {
      console.error("Failed to delete account:", error);

      toast.error("Failed to delete your account.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-white p-6 shadow-2xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2
                className="text-red-600"
                size={24}
              />
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              Delete your account?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This will permanently delete your SignalHaive
              account and associated data. This action cannot be
              undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleteLoading}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleteLoading
                  ? "Deleting..."
                  : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="min-h-screen w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Settings
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your profile, account preferences, and
              notifications.
            </p>
          </div>

          {/* Profile */}
       <UserProfile
  getInitials={getInitials}
  isEditingProfile={isEditingProfile}
  handleEditProfile={handleEditProfile}
  profileData={profileData}
  setProfileData={setProfileData}
  handleSaveProfile={handleSaveProfile}
  profileLoading={profileLoading}
/>

          {/* Account & Security */}
         <UserPassword/>

          {/* Notifications */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-semibold text-slate-900">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose how SignalHaive keeps you updated.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="flex items-center justify-between gap-6 px-6 py-5">
                <div>
                  <h3 className="text-sm font-medium text-slate-900">
                    Browser notifications
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Allow SignalHaive to send notifications to
                    your browser.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNotificationToggle}
                  disabled={notificationLoading}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                    notificationsEnabled
                      ? "bg-emerald-500"
                      : "bg-slate-300"
                  }`}
                  aria-label="Toggle browser notifications"
                >
                  <span
                    className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      notificationsEnabled
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Subscription */}
          <UserSubcription/>

          {/* Danger Zone */}
          <section className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm">
            <div className="border-b border-red-100 px-6 py-5">
              <h2 className="font-semibold text-red-700">
                Danger Zone
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Actions here can affect your SignalHaive account.
              </p>
            </div>

            <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-900">
                  Delete Account
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Permanently delete your account and associated
                  data.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="w-fit rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Settings;