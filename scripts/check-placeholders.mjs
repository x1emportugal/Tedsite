#!/usr/bin/env node
/**
 * Lista tudo o que ainda está por preencher e que ficaria VISÍVEL para
 * visitantes se o site fosse publicado agora.
 *
 * Corre automaticamente antes do build (ver package.json). Não falha o
 * build: avisa. Publicar com marcadores é uma decisão do Ted, não um erro
 * técnico, mas nunca deve acontecer por distração.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const MARKERS = /PREENCHER|TO FILL IN|PLEASE FILL IN|PLEASE CONFIRM|TODO_/g;
const ROOTS = ["src"];
const SKIP = new Set(["node_modules", "dist", ".astro", ".git"]);

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (/\.(astro|ts|md|json)$/.test(name)) acc.push(full);
  }
  return acc;
}

/**
 * Linhas que apenas MENCIONAM os marcadores (comentários que os explicam,
 * a regex que os filtra) não são marcadores por preencher.
 */
function isSelfReference(line) {
  const t = line.trim();
  if (/^(\*|\/\/|\/\*|#)/.test(t)) return true; // comentário
  if (/\.test\(|\.match\(|MARKERS|startsWith\(/.test(t)) return true; // código
  return false;
}

const hits = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      MARKERS.lastIndex = 0;
      if (!MARKERS.test(line)) return;
      if (isSelfReference(line)) return;
      hits.push({
        file: relative(process.cwd(), file),
        line: i + 1,
        text: line.trim().slice(0, 90),
      });
    });
  }
}

if (hits.length === 0) {
  console.log("\x1b[32m✓ Sem marcadores por preencher.\x1b[0m\n");
  process.exit(0);
}

console.log(
  `\n\x1b[33m⚠  ${hits.length} marcador(es) por preencher, visíveis no site publicado:\x1b[0m\n`,
);
for (const h of hits) {
  console.log(`   \x1b[36m${h.file}:${h.line}\x1b[0m`);
  console.log(`      ${h.text}`);
}
console.log(
  "\n   Preencha-os antes de apontar o domínio para este site.\n" +
    "   Prioridade: preços (packages.json), avaliações (reviews.json),\n" +
    "   seguro e NIF (src/lib/site.ts e TrustStrip).\n",
);
