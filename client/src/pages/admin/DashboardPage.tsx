import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="page-wrap">
      <header className="page-heading">
        <p className="eyebrow">ADMIN / OVERVIEW</p>
        <h1>Good to see you.</h1>
        <p className="page-lede">Signed in as {user?.email}. Manage the student records assigned to your role.</p>
      </header>
      <section className="workflow-row" aria-labelledby="workflow-title">
        <div>
          <p className="eyebrow">WORKSPACE</p>
          <h2 id="workflow-title">Student records</h2>
          <p>Open the roster to review and manage student records.</p>
        </div>
        <Link className="primary-button link-button" to="/admin/students">
          Open student roster <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
