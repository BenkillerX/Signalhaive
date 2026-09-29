import {
  LayoutDashboard,
  Signal,
  Users,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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

const AdminBottomNav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-zinc-800 bg-zinc-950 lg:hidden">
      <div className="flex h-16 items-center justify-around">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex h-full flex-1 flex-col items-center justify-center gap-1 text-xs font-medium transition ${
                  isActive
                    ? "text-emerald-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`
              }
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="flex h-full flex-1 flex-col items-center justify-center gap-1 text-xs font-medium text-zinc-500 transition hover:text-red-400"
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminBottomNav;