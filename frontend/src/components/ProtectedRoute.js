import { Navigate, useLocation } from "react-router-dom";
import { getStoredAuth } from "../utils/auth";

function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const auth = getStoredAuth();

  if (!auth) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(auth.role)) {
    return <Navigate to={auth.role === "admin" ? "/admin" : "/recipes"} replace />;
  }

  return children;
}

export default ProtectedRoute;
