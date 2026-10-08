export type UserRole = "Admin" | "Student";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export interface AuthCredentials {
  email: string;
  password: string;
}
