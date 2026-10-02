import { Navigate } from "react-router-dom";
import { isPWA } from "../utils/isPWA";
import LandingPage from "./landing/LandingPage";

const HomeRedirect = () => {
  const pwa = isPWA();

  if (!pwa) {
    return <LandingPage />;
  }

  return <Navigate to="/login" replace />;
};
export default HomeRedirect