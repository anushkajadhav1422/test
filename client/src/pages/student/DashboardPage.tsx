import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function StudentDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="page-wrap">
      <header className="page-heading">
        <p className="eyebrow">STUDENT / OVERVIEW</p>
        <h1>Your workspace.</h1>
        <p className="page-lede">You are signed in as {user?.email}.</p>
      </header>
      <section className="workflow-row" aria-labelledby="profile-title">
        <div>
          <p className="eyebrow">ACCOUNT</p>
          <h2 id="profile-title">Profile details</h2>
          <p>Review your account information.</p>
        </div>
        <Link className="primary-button link-button" to="/student/profile">
          View profile <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
