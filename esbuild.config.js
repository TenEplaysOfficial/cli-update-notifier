import { build } from "esbuild";
import { copyFileSync } from "fs";
import { resolve } from "path";

const pkg = await import("./package.json", { assert: { type: "json" } }).then(
  (mod) => mod.default
);
const externalDeps = Object.keys(pkg.dependencies);

await build({
  entryPoints: ["index.js"],
  outfile: "dist/index.mjs",
  bundle: true,
  minify: true,
  platform: "node",
  format: "esm",
  external: externalDeps,
  logLevel: "info",
});

await build({
  entryPoints: ["index.js"],
  outfile: "dist/index.cjs",
  bundle: true,
  minify: true,
  platform: "node",
  format: "cjs",
  external: externalDeps,
  logLevel: "info",
});

copyFileSync(resolve("index.d.ts"), resolve("dist/index.d.ts"));
console.log("Copied index.d.ts to dist/");
