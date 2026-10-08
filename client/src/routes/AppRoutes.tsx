import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";
import AdminDashboardPage from "../pages/admin/DashboardPage";
import CreateStudentPage from "../pages/admin/CreateStudentPage";
import EditStudentPage from "../pages/admin/EditStudentPage";
import StudentDetailsPage from "../pages/admin/StudentDetailsPage";
import StudentsPage from "../pages/admin/StudentsPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import StudentDashboardPage from "../pages/student/DashboardPage";
import ProfilePage from "../pages/student/ProfilePage";
import { useAuth } from "../hooks/useAuth";
import { homeForRole } from "../utils/storage";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

function HomeRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? homeForRole(user.role) : "/login"} replace />;
}

function GuestOnly() {
  const { user } = useAuth();
  return user ? <HomeRedirect /> : <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<GuestOnly />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute role="Admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="students">
              <Route index element={<StudentsPage />} />
              <Route path="new" element={<CreateStudentPage />} />
              <Route path=":id" element={<StudentDetailsPage />} />
              <Route path=":id/edit" element={<EditStudentPage />} />
            </Route>
          </Route>
        </Route>
        <Route element={<RoleRoute role="Student" />}>
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}
