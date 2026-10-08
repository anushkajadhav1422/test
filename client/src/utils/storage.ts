import type { AuthSession, UserRole } from "../types/auth.types";

const SESSION_KEY = "rbac.session";

function isAuthSession(value: unknown): value is AuthSession {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<AuthSession>;
  return (
    typeof candidate.token === "string" &&
    typeof candidate.user?.id === "string" &&
    typeof candidate.user.email === "string" &&
    (candidate.user.role === "Admin" || candidate.user.role === "Student")
  );
}

export function getStoredSession(): AuthSession | null {
  try {
    const value: unknown = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "null");
    return isAuthSession(value) ? value : null;
  } catch {
    return null;
  }
}

export function storeSession(session: AuthSession): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearStoredSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function homeForRole(role: UserRole): string {
  return role === "Admin" ? "/admin" : "/student";
}
