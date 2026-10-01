import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  registerPushNotifications,
  unregisterPushNotifications,
} from "../../services/pushNotifications";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const Settings = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [notificationsEnabled, setNotificationsEnabled] =
    useState(false);

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-semibold text-slate-900">
                Profile
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your personal information and account identity.
              </p>
            </div>

            <div className="p-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                {/* Avatar */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-2xl font-semibold text-emerald-700">
                  {getInitials()}
                </div>

                {/* User info */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {currentUser?.firstname}{" "}
                    {currentUser?.lastname}
                  </h3>

                  <p className="mt-1 truncate text-sm text-slate-500">
                    {currentUser?.email}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      Active
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
                      {currentUser?.role ?? "Member"}
                    </span>
                  </div>
                </div>

                {/* Edit / Cancel */}
                <button
                  type="button"
                  onClick={handleEditProfile}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {isEditingProfile
                    ? "Cancel"
                    : "Edit Profile"}
                </button>
              </div>

              {/* Profile fields */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">

                {/* First Name */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    First Name
                  </label>

                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.firstname}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          firstname: e.target.value,
                        }))
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  ) : (
                    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {currentUser?.firstname || "—"}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Last Name
                  </label>

                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.lastname}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          lastname: e.target.value,
                        }))
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  ) : (
                    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {currentUser?.lastname || "—"}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email Address
                  </label>

                  <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {currentUser?.email || "—"}
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Account Role
                  </label>

                  <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm capitalize text-slate-700">
                    {currentUser?.role || "Member"}
                  </div>
                </div>
              </div>

              {/* Save button */}
              {isEditingProfile && (
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-600"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Account & Security */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-semibold text-slate-900">
                Account & Security
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your login and account security.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-medium text-slate-900">
                    Password
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Change your account password.
                  </p>
                </div>

                <button
                  type="button"
                  className="w-fit rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Change Password
                </button>
              </div>

              <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-medium text-slate-900">
                    Email Verification
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Your email address is verified.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Verified
                </span>
              </div>
            </div>
          </section>

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
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-semibold text-slate-900">
                Subscription
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your SignalHaive subscription.
              </p>
            </div>

            <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Premium Plan
                  </h3>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Active
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Your premium subscription gives you access to
                  SignalHaive features.
                </p>
              </div>

              <Link
                to="/wallet"
                className="w-fit rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Manage Subscription
              </Link>
            </div>
          </section>

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