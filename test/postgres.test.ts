/**
 * Postgres conformance — runs the shared suite against a real server
 * (docker: `docker run -d --name qorm-pg -e POSTGRES_USER=qorm -e POSTGRES_PASSWORD=qorm \
 *   -e POSTGRES_DB=qorm -p 5433:5432 postgres`). Skips cleanly when unreachable.
 *
 * Override via QORM_PG_HOST / QORM_PG_PORT / QORM_PG_USER / QORM_PG_PASSWORD / QORM_PG_DB.
 */
import { test } from "node:test";
import { runConformanceSuite } from "./helpers/conformance.ts";
import { createBackend, type DatabaseConfig } from "../src/index.ts";

const config: DatabaseConfig = {
  engine: "postgres",
  name: process.env.QORM_PG_DB ?? "qorm",
  user: process.env.QORM_PG_USER ?? "qorm",
  password: process.env.QORM_PG_PASSWORD ?? "qorm",
  host: process.env.QORM_PG_HOST ?? "127.0.0.1",
  port: Number(process.env.QORM_PG_PORT ?? 5433),
};

async function available(): Promise<boolean> {
  for (let i = 0; i < 5; i++) {
    try {
      const probe = await createBackend(config);
      await probe.execute("SELECT 1");
      await probe.close();
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  return false;
}

if (await available()) {
  runConformanceSuite("postgres", config);
} else {
  test(
    "postgres conformance (server not reachable — start the docker container)",
    { skip: true },
    () => {},
  );
}
