import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ApiError } from "../../services/api";
import { getStoredSession, homeForRole } from "../../utils/storage";

type AuthMode = "login" | "register";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (isRegister) await signUp({ email, password });
      else await signIn({ email, password });
      const role = getStoredSession()?.user.role ?? "Student";
      const destination = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(destination ?? homeForRole(role), { replace: true });
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Unable to complete the request. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-shell">
      <aside className="auth-aside">
        <Link className="brand-lockup" to="/" aria-label="Role-based student system home">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>STUDENT SYSTEMS</span>
        </Link>
        <p className="eyebrow">ROLE-BASED CRUD / ACCOUNT ACCESS</p>
        <h1>{isRegister ? <>Create your<br /><em>student account.</em></> : <>A clearer view<br /><em>of student records.</em></>}</h1>
        <p className="auth-aside-note">Secure access for administrators and students.</p>
        <span className="auth-aside-index">IDENTITY / 01</span>
      </aside>

      <section className="auth-main">
        <div className="auth-card">
          <p className="eyebrow">{isRegister ? "NEW ACCOUNT" : "WELCOME BACK"}</p>
          <h2>{isRegister ? "Register" : "Sign in"}</h2>
          <p className="auth-description">
            {isRegister ? "Public registration creates a Student account." : "Use your registered email and password."}
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={isRegister ? 8 : undefined}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {error && <p className="form-error" role="alert">{error}</p>}

            <button className="primary-button" type="submit" disabled={submitting}>
              {submitting ? "Working..." : isRegister ? "Create student account" : "Sign in"}
              <span aria-hidden="true">↗</span>
            </button>
          </form>

          <p className="auth-switch">
            {isRegister ? "Already registered?" : "New to the system?"}{" "}
            <Link to={isRegister ? "/login" : "/register"}>
              {isRegister ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </div>
        <footer className="auth-footer"><span>ADMIN + STUDENT</span><span>SECURE SESSION</span></footer>
      </section>
    </main>
  );
}
