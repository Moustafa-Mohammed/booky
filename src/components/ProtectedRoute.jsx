import { Navigate, Outlet } from "react-router-dom";
import { AUTH_LOGIN } from "../apis";
import userAuth from "../context/Authcontext";

function ProtectedRoute() {
  const { user } = userAuth();

  if (!user) {
    return <Navigate to={AUTH_LOGIN} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
