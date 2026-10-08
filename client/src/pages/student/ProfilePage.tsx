import { useAuth } from "../../hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="page-wrap">
      <header className="page-heading">
        <p className="eyebrow">STUDENT / ACCOUNT</p>
        <h1>My profile</h1>
        <p className="page-lede">Account details associated with your current session.</p>
      </header>
      <dl className="detail-list">
        <div><dt>Email address</dt><dd>{user?.email}</dd></div>
        <div><dt>Role</dt><dd>{user?.role}</dd></div>
      </dl>
    </div>
  );
}
