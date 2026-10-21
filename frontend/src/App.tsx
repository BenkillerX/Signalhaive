
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

// Components needed immediately
import ScrollToTop from "./ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeRedirect from "./components/HomeRedirect";

// Lazy-loaded layouts
const PublicLayout = lazy(() => import("./layouts/PublicLayout"));
const UsersLayout = lazy(() => import("./layouts/UsersLayout"));
const AdminLayouts = lazy(() => import("./layouts/AdminLayouts"));

// Lazy-loaded authentication pages
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

// Lazy-loaded user pages
const LiveSignals = lazy(() => import("./pages/user/LiveSignals"));
const Market = lazy(() => import("./pages/user/Market"));
const Mentorship = lazy(() => import("./pages/user/Mentorship"));
const Wallet = lazy(() => import("./pages/user/Wallet"));
const Notifications = lazy(() => import("./pages/user/Notifications"));
const Settings = lazy(() => import("./pages/user/Settings"));
const HelpAndSupport = lazy(() => import("./pages/user/HelpAndSupport"));
const GetStarted = lazy(() => import("./pages/user/GetStarted"));

// Lazy-loaded admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AddSignal = lazy(() => import("./pages/admin/AddSignal"));
const Users = lazy(() => import("./pages/admin/Users"));
const AdminNotifications = lazy(
  () => import("./pages/admin/AdminNotifications")
);

// Lazy-loaded placeholder components
const ComingSoon = lazy(() => import("./components/ComingSoon"));
const UserComingSoon = lazy(
  () => import("./components/UserComingSoon")
);

// Loading fallback
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-emerald-500" />
    </div>
  );
}

function App() {
  return (
    <>
      <Analytics />
      <Toaster position="top-right" />
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomeRedirect />} />
          </Route>

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<UsersLayout />}>
              <Route path="/markets" element={<Market />} />
              <Route path="/live-signals" element={<LiveSignals />} />
              <Route path="/portfolio" element={<UserComingSoon />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/trade-history" element={<UserComingSoon />} />
              <Route path="/mentorship" element={<Mentorship />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help-support" element={<HelpAndSupport />} />
              <Route path="/help/getting-started" element={<GetStarted />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminLayouts />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/add-signal" element={<AddSignal />} />
            <Route
              path="/add-notifications"
              element={<AdminNotifications />}
            />
            <Route path="/admin-users" element={<Users />} />
            <Route
              path="/admin-transactions"
              element={<UserComingSoon />}
            />
            <Route
              path="/admin-settings"
              element={<UserComingSoon />}
            />
          </Route>

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
