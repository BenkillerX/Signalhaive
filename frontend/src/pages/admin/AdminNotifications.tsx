import { useEffect, useState } from "react";
import {
  Bell,
  Send,
  Trash2,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../services/api";

type NotificationType = "announcement" | "market" | "system";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: NotificationType;
  url?: string;
  createdAt: string;
}

const AdminNotifications = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] =
    useState<NotificationType>("announcement");
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/api/notifications/");

        setNotifications(response.data.notifications);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load notifications.");
      } finally {
        setNotificationsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Create notification
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      toast.error("Title and message are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/notifications/create", {
        title: title.trim(),
        message: message.trim(),
        type,
        url: url.trim() || "/notifications",
      });

      toast.success("Notification sent successfully!");

      // Add newly created notification to the top of the list
      if (response.data.notification) {
        setNotifications((current) => [
          response.data.notification,
          ...current,
        ]);
      }

      setTitle("");
      setMessage("");
      setType("announcement");
      setUrl("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  // Delete notification
  const handleDeleteNotification = async (id: string) => {
    setDeletingId(id);

    try {
      await api.delete(`/api/notifications/${id}`);

      setNotifications((current) =>
        current.filter((notification) => notification._id !== id)
      );

      toast.success("Notification deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete notification.");
    } finally {
      setDeletingId(null);
    }
  };

  const getTypeStyles = (notificationType: NotificationType) => {
    switch (notificationType) {
      case "market":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

      case "system":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";

      case "announcement":
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <section className="min-h-screen bg-zinc-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-400">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Notification Management
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Notifications
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Send announcements and updates to SignalHaive users.
          </p>
        </div>

        {/* Create Notification */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/3"
        >
          {/* Form Header */}
          <div className="border-b border-white/10 px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                <Bell className="h-5 w-5 text-blue-400" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-white">
                  Create Notification
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Send a push notification to subscribed users.
                </p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="grid grid-cols-1 gap-5 p-5 sm:p-7 md:grid-cols-2">
            {/* Title */}
            <div className="md:col-span-2">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Notification Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. New Market Update"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Message
              </label>

              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your notification..."
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Notification Type
              </label>

              <select
                id="type"
                value={type}
                onChange={(e) =>
                  setType(e.target.value as NotificationType)
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              >
                <option value="announcement">Announcement</option>
                <option value="market">Market</option>
                <option value="system">System</option>
              </select>
            </div>

            {/* URL */}
            <div>
              <label
                htmlFor="url"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Notification URL
              </label>

              <input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="/notifications"
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-4 border-t border-white/10 bg-white/2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-xs text-slate-500">
              Publishing this notification will send it to subscribed users.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Notification
                </>
              )}
            </button>
          </div>
        </form>

        {/* Notification History */}
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Notification History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Previously sent notifications.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/3">
            {notificationsLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                  <Bell className="h-5 w-5 text-slate-500" />
                </div>

                <h3 className="mt-4 text-sm font-medium text-white">
                  No notifications yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Notifications you send will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className="p-5 transition hover:bg-white/2 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        {/* Top row */}
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-white">
                            {notification.title}
                          </h3>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${getTypeStyles(
                              notification.type
                            )}`}
                          >
                            {notification.type}
                          </span>
                        </div>

                        {/* Message */}
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {notification.message}
                        </p>

                        {/* Metadata */}
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
                          <span>
                            {formatDate(notification.createdAt)}
                          </span>

                          {notification.url && (
                            <span className="inline-flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" />
                              {notification.url}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteNotification(notification._id)
                        }
                        disabled={deletingId === notification._id}
                        className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-red-500/10 bg-red-500/5 px-3 py-2 text-xs font-medium text-red-400 transition hover:border-red-500/20 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === notification._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}

                        <span className="hidden sm:inline">
                          Delete
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminNotifications;