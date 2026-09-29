import { Route, Routes} from "react-router-dom"
import PublicLayout from "./layouts/PublicLayout"
import LandingPage from "./components/landing/LandingPage"
import ExplorePage from "./components/landing/ExplorePage"
import HowItWorks from "./components/landing/HowItWorks"
import FAQ from "./components/landing/FAQ"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import VerifyEmail from "./pages/auth/VerifyEmail"
import UsersLayout from "./layouts/UsersLayout"
import ComingSoon from "./components/ComingSoon"
import UserComingSoon from "./components/UserComingSoon"
import LiveSignals from "./pages/user/LiveSignals"
import AdminLayouts from "./layouts/AdminLayouts"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AddSignal from "./pages/admin/AddSignal"
import { Toaster } from "react-hot-toast";
import Market from "./pages/user/Market"
import Mentorship from "./pages/user/Mentorship"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import Wallet from "./pages/user/Wallet"
import Notifications from "./pages/user/Notifications"
import Settings from "./pages/user/Settings"
import HelpAndSupport from "./pages/user/HelpAndSupport"
import ScrollToTop from "./ScrollToTop"
import Users from "./pages/admin/Users"

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <ScrollToTop/>
      <Routes>
        {/* Public Pages Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/How-it-works" element={<HowItWorks />} />
          <Route path="/FAQ" element={<FAQ />} />
        </Route>

        {/* User Routes */}
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
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayouts />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/add-signal" element={<AddSignal />} />
          <Route path="/admin-users" element={<Users />} />
          <Route path="/admin-transactions" element={<UserComingSoon />} />
          <Route path="/admin-settings" element={<UserComingSoon />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
  path="/reset-password"
  element={<ResetPassword />}
/>
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Routes>
    </>
  );
}

export default App
