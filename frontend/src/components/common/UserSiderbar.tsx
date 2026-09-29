import {
  ChartCandlestick,
  Signal,
  Wallet,
  Bell,
  Settings,
  CircleHelp,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import signalHiveLogo from "/images/plainLogo2.jpeg";
const UserSidebar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const navigation = [
  {
    label: "Trading Signals",
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


  const handleLogout = () => {
  logout();
  navigate("/login");
};

  const getInitials = () => {
    if (!currentUser) return "U";

    return `${currentUser.firstname?.[0] ?? ""}${currentUser.lastname?.[0] ?? ""}`
      .toUpperCase()
      .trim() || "U";
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
     {/* Logo */}
<div className="flex h-20 items-center border-b border-slate-200 px-6">
  <div className="flex items-center gap-3">
    <img
      src={signalHiveLogo}
      alt="SignalHive"
      className="h-9 w-9 object-contain"
    />

    <h1 className="text-xl font-bold text-slate-900">
      SignalHaive
    </h1>
  </div>
</div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Current User */}
      <div className="border-t border-slate-200 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg p-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            {getInitials()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {currentUser
                ? `${currentUser.firstname} ${currentUser.lastname}`
                : "User"}
            </p>

            <p className="truncate text-xs text-slate-500">
              {currentUser?.email ?? "No email"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <LogOut size={19} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;