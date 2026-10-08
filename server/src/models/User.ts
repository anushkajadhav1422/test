import { Schema, model } from "mongoose";
import { USER_ROLES } from "../types/auth.types.js";
import type { UserRole } from "../types/auth.types.js";

export interface UserDocument {
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: USER_ROLES, default: "Student", required: true },
  },
  { timestamps: true },
);

userSchema.set("toJSON", {
  transform: (_document, result) => {
    const output = result as unknown as Record<string, unknown>;
    delete output.passwordHash;
    delete output.__v;
    return output;
  },
});

export const User = model<UserDocument>("User", userSchema);
