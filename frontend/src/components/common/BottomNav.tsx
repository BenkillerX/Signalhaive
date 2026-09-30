import { useEffect, useState } from "react";
import {
  ChartCandlestick,
  Signal,
  Wallet,
  Bell,
  Settings,
  CircleHelp,
  LogOut,
  X,
  Menu,
  GraduationCap,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import signalHiveLogo from "/images/plainLogo2.jpeg";
import LogoutConfirmationModal from "../LogoutConfirmationModal";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "announcement" | "market" | "system";
  createdAt: string;
}

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const handleLogoutClick = () => {
  setIsLogoutModalOpen(true);
};

const confirmLogout = () => {
  logout();
  setIsLogoutModalOpen(false);
  setIsMenuOpen(false);
  navigate("/login");
};
  const mainNavigation = [
    {
      label: "Signals",
      icon: Signal,
      path: "/live-signals",
    },
    {
      label: "Markets",
      icon: ChartCandlestick,
      path: "/markets",
    },
    {
      label: "Wallet",
      icon: Wallet,
      path: "/wallet",
    },
    {
      label: "More",
      icon: Menu,
      path: null,
    },
  ];

  const moreNavigation = [
    {
      label: "Mentorship",
      icon: GraduationCap,
      path: "/mentorship",
    },
    {
      label: "Notifications",
      icon: Bell,
      path: "/notifications",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
    {
      label: "Help & Support",
      icon: CircleHelp,
      path: "/help-support",
    },
  ];

  // Fetch notification count
  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await api.get("/api/notifications");

        const notifications: Notification[] =
          response.data.notifications ?? [];

        setNotificationCount(notifications.length);
      } catch (error) {
        console.error(
          "Failed to fetch notification count:",
          error
        );
      }
    };

    fetchNotificationCount();
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };
  const getInitials = () => {
    if (!currentUser) return "U";

    return (
      `${currentUser.firstname?.[0] ?? ""}${
        currentUser.lastname?.[0] ?? ""
      }`
        .toUpperCase()
        .trim() || "U"
    );
  };

  const isMoreActive = moreNavigation.some(
    (item) => location.pathname === item.path
  );

  return (
    <>
     <LogoutConfirmationModal
      isOpen={isLogoutModalOpen}
      onCancel={() => setIsLogoutModalOpen(false)}
      onConfirm={confirmLogout}
    />
      {/* =========================
          MOBILE MORE MENU
      ========================== */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          {/* Backdrop */}
          <button
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          {/* Bottom Sheet */}
          <div className="absolute bottom-0 left-0 w-full rounded-t-3xl bg-white p-5 shadow-2xl">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={signalHiveLogo}
                  alt="SignalHive"
                  className="h-9 w-9 object-contain"
                />

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    SignalHive
                  </h2>

                  <p className="text-sm text-slate-500">
                    Account and additional options
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* =========================
                CURRENT USER
            ========================== */}
            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              {/* Avatar */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {getInitials()}
              </div>

              {/* User Information */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {currentUser
                    ? `${currentUser.firstname} ${currentUser.lastname}`
                    : "User"}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {currentUser?.email ?? "No email"}
                </p>
              </div>

              {/* Profile Button */}
              <button
                onClick={() => handleNavigation("/profile")}
                className="rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
              >
                View
              </button>
            </div>

            {/* =========================
                MORE NAVIGATION
            ========================== */}
            <div className="grid grid-cols-2 gap-2">
              {moreNavigation.map((item) => {
                const Icon = item.icon;

                const isActive =
                  location.pathname === item.path;

                const isNotifications =
                  item.path === "/notifications";

                return (
                  <button
                    key={item.label}
                    onClick={() =>
                      handleNavigation(item.path)
                    }
                    className={`flex items-center gap-3 rounded-xl p-3 text-left transition ${
                      isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {/* Icon + Notification Badge */}
                    <div className="relative">
                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.2 : 1.8}
                      />

                      {isNotifications &&
                        notificationCount > 0 && (
                          <span className="absolute -right-2.5 -top-2 flex min-w-4.25 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-4.25 text-white">
                            {notificationCount > 99
                              ? "99+"
                              : notificationCount}
                          </span>
                        )}
                    </div>

                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-slate-200" />

            {/* Logout */}
           <button
  onClick={handleLogoutClick}
  className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
>
  <LogOut size={19} strokeWidth={1.8} />
  <span>Logout</span>
</button>
          </div>
        </div>
      )}

      {/* =========================
          BOTTOM NAVIGATION
      ========================== */}
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="flex h-16 items-center justify-around px-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon;

            const isMenu = item.path === null;

            const isActive =
              item.path !== null &&
              location.pathname === item.path;

            const active = isActive || (isMenu && isMoreActive);

            return (
              <button
                key={item.label}
                onClick={() =>
                  isMenu
                    ? setIsMenuOpen((previous) => !previous)
                    : handleNavigation(item.path!)
                }
                className={`flex min-w-16 flex-col items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-medium transition ${
                  active
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <Icon
                  size={21}
                  strokeWidth={active ? 2.2 : 1.8}
                />

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNav;