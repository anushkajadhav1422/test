import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <NavLink className="brand-lockup" to="/admin">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>STUDENT SYSTEMS</span>
        </NavLink>
        <p className="eyebrow nav-caption">ADMINISTRATION</p>
        <nav className="side-nav" aria-label="Admin navigation">
          <NavLink end to="/admin">Overview</NavLink>
          <NavLink to="/admin/students">Students</NavLink>
        </nav>
        <div className="sidebar-user">
          <span className="user-role">ADMINISTRATOR</span>
          <span className="user-email">{user?.email}</span>
          <button className="text-button" onClick={handleSignOut}>Sign out</button>
        </div>
      </aside>
      <main className="app-content"><Outlet /></main>
    </div>
  );
}
