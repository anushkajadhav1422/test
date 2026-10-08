import { apiRequest } from "./api";
import type { AuthCredentials, AuthSession } from "../types/auth.types";

export function register(credentials: AuthCredentials): Promise<AuthSession> {
  return apiRequest<AuthSession>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function login(credentials: AuthCredentials): Promise<AuthSession> {
  return apiRequest<AuthSession>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
