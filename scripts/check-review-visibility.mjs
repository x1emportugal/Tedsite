import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(
  new URL("../src/lib/content.ts", import.meta.url),
  "utf8",
);

assert.doesNotMatch(
  source,
  /\.filter\(\(r\) => r\.lang === lang\)/,
  "As avaliações reais devem aparecer nos dois idiomas do site",
);

console.log("Review visibility check passed.");
