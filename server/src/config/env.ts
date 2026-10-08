import "dotenv/config";
import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  CLIENT_ORIGIN: z.string().url().default("http://localhost:5173"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN_SECONDS: z.coerce.number().int().positive().default(3600),
});

const result = environmentSchema.safeParse(process.env);

if (!result.success) {
  const details = result.error.issues
    .map((issue) => `${issue.path.join(".") || "environment"}: ${issue.message}`)
    .join("; ");
  throw new Error(`Invalid server configuration: ${details}`);
}

export const env = {
  nodeEnv: result.data.NODE_ENV,
  port: result.data.PORT,
  mongodbUri: result.data.MONGODB_URI,
  clientOrigin: result.data.CLIENT_ORIGIN,
  jwtSecret: result.data.JWT_SECRET,
  jwtExpiresInSeconds: result.data.JWT_EXPIRES_IN_SECONDS,
};
