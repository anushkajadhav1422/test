import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import type { UserRole } from "../types/auth.types.js";
import { HttpError } from "../utils/http-error.js";
import { signAccessToken } from "../utils/jwt.js";
import type { AuthCredentials } from "../schemas/auth.schema.js";

const PASSWORD_SALT_ROUNDS = 12;

export interface AuthResult {
  token: string;
  user: { id: string; email: string; role: UserRole };
}

function toAuthResult(user: { id: string; email: string; role: UserRole }): AuthResult {
  return { token: signAccessToken(user), user };
}

export async function register(credentials: AuthCredentials): Promise<AuthResult> {
  const existingUser = await User.exists({ email: credentials.email });
  if (existingUser) {
    throw new HttpError(409, "EMAIL_IN_USE", "An account with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(credentials.password, PASSWORD_SALT_ROUNDS);
  const user = await User.create({
    email: credentials.email,
    passwordHash,
    role: "Student",
  });

  return toAuthResult({ id: user.id, email: user.email, role: user.role });
}

export async function login(credentials: AuthCredentials): Promise<AuthResult> {
  const user = await User.findOne({ email: credentials.email }).select("+passwordHash");
  const passwordMatches = user
    ? await bcrypt.compare(credentials.password, user.passwordHash)
    : false;

  if (!user || !passwordMatches) {
    throw new HttpError(401, "INVALID_CREDENTIALS", "Email or password is incorrect.");
  }

  return toAuthResult({ id: user.id, email: user.email, role: user.role });
}
