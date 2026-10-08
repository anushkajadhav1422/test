import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().trim().email().transform((email) => email.toLowerCase()),
  password: z.string().min(8).max(128),
});

export const registerSchema = credentialsSchema;
export const loginSchema = credentialsSchema;

export type AuthCredentials = z.infer<typeof credentialsSchema>;
