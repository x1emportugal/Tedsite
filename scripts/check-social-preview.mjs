import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const base = await readFile(
  new URL("../src/layouts/Base.astro", import.meta.url),
  "utf8",
);

assert.match(base, /absoluteUrl\("\/ted-preview\.png"\)/, "O preview social deve usar a imagem reduzida");
assert.match(base, /og:image:width" content="600"/, "A largura declarada do preview deve ser 600");
assert.match(base, /og:image:height" content="600"/, "A altura declarada do preview deve ser 600");
assert.match(base, /rel="icon" href="\/ted-felt-logo\.png"/, "O favicon original não pode ser alterado");

const preview = await stat(new URL("../public/ted-preview.png", import.meta.url));
const original = await stat(new URL("../public/ted-felt-logo.png", import.meta.url));
assert.ok(preview.size < original.size, "O preview deve ser mais leve que o logótipo original");

console.log("Social preview check passed.");
