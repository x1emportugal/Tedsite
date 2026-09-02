import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const baseLayout = await readFile(new URL("../src/layouts/Base.astro", import.meta.url), "utf8");

assert.match(
  baseLayout,
  /googletagmanager\.com\/gtag\/js\?id=G-RZCRSSVVK4/,
  "A tag global do Google Analytics deve estar presente em todas as páginas.",
);
assert.match(
  baseLayout,
  /gtag\('config', 'G-RZCRSSVVK4'/,
  "A propriedade Google Analytics deve ser configurada com o ID fornecido.",
);

console.log("Google Analytics tag check passed.");
