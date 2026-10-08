import { createApp } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

async function startServer(): Promise<void> {
  await connectDatabase(env.mongodbUri);

  const server = createApp().listen(env.port, () => {
    console.info(`API listening on http://localhost:${env.port}`);
  });

  const shutdown = (signal: string) => {
    console.info(`${signal} received; closing API server.`);
    server.close(() => {
      void disconnectDatabase().finally(() => process.exit(0));
    });
  };

  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
}

void startServer().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`API startup failed: ${message}`);
  process.exitCode = 1;
});
