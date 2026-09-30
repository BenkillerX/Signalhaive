import { Bell, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";

interface Notification {
  _id: string;
  isRead: boolean;
}

const UserHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [hasUnreadNotifications, setHasUnreadNotifications] =
    useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/live-signals":
        return "Trading Signals";
      case "/markets":
        return "Markets";
      case "/wallet":
        return "Wallet";
      case "/mentorship":
        return "Mentorship";
      case "/notifications":
        return "Notifications";
      case "/settings":
        return "Settings";
      case "/help-support":
        return "Help & Support";
      default:
        return "Dashboard";
    }
  };

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const response = await api.get("/api/notifications");

        const notifications: Notification[] =
          response.data.notifications ?? [];

        const hasUnread = notifications.some(
          (notification) => !notification.isRead
        );

        setHasUnreadNotifications(hasUnread);
      } catch (error) {
        console.error(
          "Failed to fetch notification status:",
          error
        );
      }
    };

    fetchUnreadNotifications();
  }, [location.pathname]);

  const initials =
    `${currentUser?.firstname?.[0] ?? ""}${currentUser?.lastname?.[0] ?? ""}`.toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl lg:ml-64">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile logo */}
          <div className="flex items-center lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
              S
            </div>
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-slate-900">
              {getPageTitle()}
            </p>

            <p className="hidden text-xs text-slate-400 sm:block">
              Welcome back,{" "}
              {currentUser?.firstname || "Trader"}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <button
            type="button"
            onClick={() => navigate("/notifications")}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Notifications"
          >
            <Bell size={19} />

            {/* Unread indicator */}
            {hasUnreadNotifications && (
              <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            )}
          </button>

          {/* Divider */}
          <div className="hidden h-7 w-px bg-slate-200 sm:block" />

          {/* User */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-semibold text-white">
              {initials || "U"}
            </div>

            <div className="hidden text-left sm:block">
              <p className="max-w-32 truncate text-sm font-medium text-slate-800">
                {currentUser?.firstname}{" "}
                {currentUser?.lastname}
              </p>

              <p className="text-[11px] text-slate-400">
                SignalHaive User
              </p>
            </div>

            <ChevronDown
              size={15}
              className="hidden text-slate-400 sm:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
