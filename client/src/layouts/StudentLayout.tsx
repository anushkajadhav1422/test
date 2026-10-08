import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function StudentLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <NavLink className="brand-lockup" to="/student">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>STUDENT SYSTEMS</span>
        </NavLink>
        <p className="eyebrow nav-caption">STUDENT AREA</p>
        <nav className="side-nav" aria-label="Student navigation">
          <NavLink end to="/student">Overview</NavLink>
          <NavLink to="/student/profile">My profile</NavLink>
        </nav>
        <div className="sidebar-user">
          <span className="user-role">STUDENT</span>
          <span className="user-email">{user?.email}</span>
          <button className="text-button" onClick={handleSignOut}>Sign out</button>
        </div>
      </aside>
      <main className="app-content"><Outlet /></main>
    </div>
  );
}
