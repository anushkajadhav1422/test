import { createContext, useEffect, useState, type ReactNode } from "react";
import { login, register } from "../services/auth.service";
import type { AuthCredentials, AuthSession, AuthUser } from "../types/auth.types";
import { clearStoredSession, getStoredSession, storeSession } from "../utils/storage";

interface AuthContextValue {
  user: AuthUser | null;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signUp: (credentials: AuthCredentials) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => getStoredSession());

  useEffect(() => {
    const handleUnauthorized = () => setSession(null);
    window.addEventListener("rbac:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("rbac:unauthorized", handleUnauthorized);
  }, []);

  async function saveSession(authenticate: (credentials: AuthCredentials) => Promise<AuthSession>, credentials: AuthCredentials) {
    const nextSession = await authenticate(credentials);
    storeSession(nextSession);
    setSession(nextSession);
  }

  async function signIn(credentials: AuthCredentials): Promise<void> {
    await saveSession(login, credentials);
  }

  async function signUp(credentials: AuthCredentials): Promise<void> {
    await saveSession(register, credentials);
  }

  function signOut(): void {
    clearStoredSession();
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ user: session?.user ?? null, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
