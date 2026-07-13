import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/use-Auth-Store";


export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);


  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}