import {
  Bell,
  CircleDollarSign,
  Info,
  TrendingUp,
  Loader2,
} from "lucide-react";
import {  useEffect, useState } from "react";
import api from "../../services/api";

type NotificationType = "announcement" | "market" | "system";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: NotificationType;
  url?: string;
  createdAt: string;
  isRead: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  let isMounted = true;

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/api/notifications");

      if (isMounted) {
        setNotifications(
          response.data.notifications ?? []
        );
      }
    } catch (error) {
      console.error(
        "Failed to fetch notifications:",
        error
      );
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  fetchNotifications();

  return () => {
    isMounted = false;
  };
}, []);
  const markAsRead = async (notificationId: string) => {
    try {
      await api.patch(
        `/api/notifications/${notificationId}/read`
      );

      setNotifications((previousNotifications) =>
        previousNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  const getNotificationIcon = (
    type: NotificationType
  ) => {
    switch (type) {
      case "market":
        return <TrendingUp size={19} />;

      case "system":
        return <CircleDollarSign size={19} />;

      case "announcement":
      default:
        return <Info size={19} />;
    }
  };

  const getNotificationStyles = (
    type: NotificationType
  ) => {
    switch (type) {
      case "market":
        return "bg-emerald-50 text-emerald-600";

      case "system":
        return "bg-purple-50 text-purple-600";

      case "announcement":
      default:
        return "bg-blue-50 text-blue-600";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const todayCount = notifications.filter(
    (notification) => {
      const today = new Date();
      const notificationDate = new Date(
        notification.createdAt
      );

      return (
        today.toDateString() ===
        notificationDate.toDateString()
      );
    }
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
              <Bell size={20} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Notifications
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Stay updated with your SignalHaive activity.
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {/* All */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              All notifications
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {notifications.length}
            </p>
          </div>

          {/* Unread */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Unread
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {unreadCount}
            </p>
          </div>

          {/* Today */}
          <div className="hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:block">
            <p className="text-xs font-medium text-slate-500">
              Today
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {todayCount}
            </p>
          </div>
        </div>

        {/* Notifications */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Loading */}
          {loading ? (
            <div className="flex min-h-62.5 items-center justify-center">
              <Loader2
                size={28}
                className="animate-spin text-blue-500"
              />
            </div>
          ) : notifications.length === 0 ? (
            /* Empty */
            <div className="flex min-h-62.5 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <Bell size={22} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                No notifications yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                You're all caught up.
              </p>
            </div>
          ) : (
            /* Notification List */
            <div>
              {notifications.map((notification, index) => (
                <button
                  type="button"
                  key={notification._id}
                  onClick={() => {
                    if (!notification.isRead) {
                      markAsRead(notification._id);
                    }
                  }}
                  className={`block w-full text-left transition ${
                    notification.isRead
                      ? "bg-white hover:bg-slate-50"
                      : "bg-blue-50/40 hover:bg-blue-50"
                  } ${
                    index !== notifications.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <div className="p-4 md:p-5">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getNotificationStyles(
                          notification.type
                        )}`}
                      >
                        {getNotificationIcon(
                          notification.type
                        )}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h3
                                className={`text-sm ${
                                  notification.isRead
                                    ? "font-semibold text-slate-900"
                                    : "font-bold text-slate-900"
                                }`}
                              >
                                {notification.title}
                              </h3>

                              {!notification.isRead && (
                                <span className="shrink-0 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                                  Unread
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-sm leading-5 text-slate-500">
                              {notification.message}
                            </p>
                          </div>

                          {/* Unread dot */}
                          {!notification.isRead && (
                            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                          )}
                        </div>

                        <p className="mt-2 text-xs text-slate-400">
                          {formatDate(
                            notification.createdAt
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;