import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/auth.types";
import { homeForRole } from "../utils/storage";

export default function RoleRoute({ role }: { role: UserRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return user.role === role ? <Outlet /> : <Navigate to={homeForRole(user.role)} replace />;
}
