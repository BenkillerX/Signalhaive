import { Outlet } from "react-router-dom";
import UserSidebar from "../components/common/UserSiderbar";
import BottomNav from "../components/common/BottomNav";
import UserHeader from "../components/common/UserHeader";

const UsersLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <UserSidebar />

      {/* Header */}
      <UserHeader />

      {/* Main Content */}
      <main className="min-w-0 pb-24 lg:ml-64 lg:pb-0">
        <Outlet />
      </main>

      {/* Mobile + Tablet Bottom Navigation */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default UsersLayout;