export const USER_ROLES = ["Admin", "Student"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
}
