import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/use-Auth-Store";
import { useEffect } from "react";

export const AuthGuard = ({ children }) => {
  const { isAuthenticated, loginAt, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && loginAt) {
      const EXPIRE_MS = 4 * 60 * 60 * 1000; // 4 horas
      if (Date.now() - loginAt > EXPIRE_MS) {
        logout();
        navigate("/login");
      }
    }
  }, [isAuthenticated, loginAt, logout, navigate]);

  return children;
};