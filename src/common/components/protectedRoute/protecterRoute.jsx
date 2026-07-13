
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '/src/features/auth/store/use-Auth-Store.js';

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};