import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDatabase, disconnectDatabase } from "../config/db.js";
import { env } from "../config/env.js";
import { User } from "../models/User.js";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

async function createInitialAdmin(): Promise<void> {
  if (!email || !password || password.length < 8) {
    throw new Error("Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 8 characters.");
  }

  await connectDatabase(env.mongodbUri);
  if (await User.exists({ role: "Admin" })) {
    throw new Error("An Admin account already exists; initial provisioning is disabled.");
  }

  const existingUser = await User.exists({ email });
  if (existingUser) {
    throw new Error("An account with ADMIN_EMAIL already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await User.create({ email, passwordHash, role: "Admin" });
  console.info(`Initial Admin account created for ${email}.`);
}

try {
  await createInitialAdmin();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Admin provisioning failed: ${message}`);
  process.exitCode = 1;
} finally {
  await disconnectDatabase();
}
