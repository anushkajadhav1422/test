import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { USER_ROLES } from "../types/auth.types.js";
import type { AuthenticatedUser } from "../types/auth.types.js";

export function signAccessToken(user: AuthenticatedUser): string {
  return jwt.sign({ email: user.email, role: user.role }, env.jwtSecret, {
    subject: user.id,
    expiresIn: env.jwtExpiresInSeconds,
  });
}

export function verifyAccessToken(token: string): AuthenticatedUser {
  const payload = jwt.verify(token, env.jwtSecret);
  if (
    typeof payload === "string" ||
    typeof payload.sub !== "string" ||
    typeof payload.email !== "string" ||
    !USER_ROLES.includes(payload.role as (typeof USER_ROLES)[number])
  ) {
    throw new Error("Invalid access token payload.");
  }

  return { id: payload.sub, email: payload.email, role: payload.role as AuthenticatedUser["role"] };
}
