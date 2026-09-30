import { useState } from "react";
import {
  LayoutDashboard,
  Signal,
  Users,
  Wallet,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LogoutConfirmationModal from "../LogoutConfirmationModal";
const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    label: "Signals",
    icon: Signal,
    path: "/add-signal",
  },
  {
    label: "Notifications",
    icon: Bell,
    path: "/add-notifications",
  },
  {
    label: "Users",
    icon: Users,
    path: "/admin-users",
  },
  {
    label: "Transactions",
    icon: Wallet,
    path: "/admin-transactions",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin-settings",
  },
];

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
      />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 border-r border-zinc-800 bg-zinc-950 text-white lg:flex lg:flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center justify-center border-b border-zinc-800">
          <h1 className="text-xl font-bold">SignalHive</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive && item.label === "Dashboard"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Admin info */}
        <div className="border-t border-zinc-800 p-4">
          <div className="rounded-lg bg-zinc-900 p-3">
            <p className="text-sm font-medium text-white">
              Administrator
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              SignalHive Admin
            </p>

            <button
              type="button"
              onClick={handleLogoutClick}
              className="mt-4 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;