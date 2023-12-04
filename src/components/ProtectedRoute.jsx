import { Navigate, Outlet } from "react-router-dom";
import { AUTH_LOGIN } from "../apis";
import userAuth from "../context/Authcontext";

function ProtectedRoute() {
  const { user, isLoading } = userAuth();

  if (isLoading) return <div>Loading</div>;

  if (!user) {
    return <Navigate to={AUTH_LOGIN} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
