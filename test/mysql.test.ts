/**
 * MySQL conformance — runs the shared suite against a real server
 * (docker: `docker run -d --name qorm-mysql -e MYSQL_ROOT_PASSWORD=qorm -e MYSQL_DATABASE=qorm \
 *   -e MYSQL_USER=qorm -e MYSQL_PASSWORD=qorm -p 3307:3306 mysql:8`). Skips cleanly when unreachable.
 *
 * Override via QORM_MYSQL_HOST / QORM_MYSQL_PORT / QORM_MYSQL_USER / QORM_MYSQL_PASSWORD / QORM_MYSQL_DB.
 */
import { test } from "node:test";
import { runConformanceSuite } from "./helpers/conformance.ts";
import { createBackend, type DatabaseConfig } from "../src/index.ts";

const config: DatabaseConfig = {
  engine: "mysql",
  name: process.env.QORM_MYSQL_DB ?? "qorm",
  user: process.env.QORM_MYSQL_USER ?? "qorm",
  password: process.env.QORM_MYSQL_PASSWORD ?? "qorm",
  host: process.env.QORM_MYSQL_HOST ?? "127.0.0.1",
  port: Number(process.env.QORM_MYSQL_PORT ?? 3307),
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
  runConformanceSuite("mysql", config);
} else {
  test(
    "mysql conformance (server not reachable — start the docker container)",
    { skip: true },
    () => {},
  );
}
