import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AUTH_LOGIN } from "../apis";
import userAuth from "../context/Authcontext";

function ProtectedRoute() {
  const { user } = userAuth();
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={AUTH_LOGIN} state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
