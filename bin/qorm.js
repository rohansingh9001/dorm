#!/usr/bin/env node
// Launcher for the qorm CLI. Imports the compiled entry point produced by
// `npm run build` (tsc -> dist/). Run the build before invoking locally.
const { main } = await import(new URL("../dist/cli.js", import.meta.url));
await main();
