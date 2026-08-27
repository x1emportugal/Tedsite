import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const homepage = await readFile(
  new URL("../src/pages/index.astro", import.meta.url),
  "utf8",
);
const base = await readFile(
  new URL("../src/layouts/Base.astro", import.meta.url),
  "utf8",
);
const schema = await readFile(
  new URL("../src/lib/schema.ts", import.meta.url),
  "utf8",
);

assert.match(
  homepage,
  /title="Ted in Portugal \| Ted Animações \| Animação Infantil no Algarve"/,
  "A homepage deve ligar as duas identidades no title",
);
assert.match(
  homepage,
  /Sou o Ted, da Ted Animações\. Aqui no Ted in Portugal preparo jogos,\s+oficinas e aventuras para os miúdos viverem momentos reais, enquanto\s+os pais aproveitam também\./,
  "A relação entre Ted Animações e Ted in Portugal deve aparecer numa frase humana na homepage",
);

assert.match(base, /websiteSchema\(\)/, "Todas as páginas devem declarar o website oficial");
assert.match(schema, /export function websiteSchema\(\)/, "Falta o schema WebSite explícito");
assert.match(schema, /name: SITE\.alternateName/, "O WebSite deve chamar-se Ted in Portugal");
assert.match(schema, /alternateName: SITE\.name/, "O WebSite deve ligar Ted Animações como nome alternativo");
assert.match(schema, /name: SITE\.name/, "O negócio deve continuar a chamar-se Ted Animações");
assert.match(schema, /alternateName: SITE\.alternateName/, "O negócio deve manter Ted in Portugal como nome alternativo");
assert.doesNotMatch(schema, /aggregateRating/, "Não deve haver AggregateRating auto-publicado");
assert.doesNotMatch(schema, /export function reviewSchema/, "Avaliações próprias não devem gerar Review schema");
assert.match(
  schema,
  /sameAs: \[SITE\.instagram, SITE\.googleBusinessUrl\]\.filter\(Boolean\)/,
  "Instagram deve manter-se em sameAs e o Perfil de Empresa deve continuar opcional",
);

console.log("Brand identity and schema check passed.");
