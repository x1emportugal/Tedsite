import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const home = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
const prices = await readFile(new URL("../dist/precos/index.html", import.meta.url), "utf8");
const contact = await readFile(new URL("../dist/contactos/index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");

assert.match(
  home,
  /hero-festa-aniversario[^\"]+\.webp 960w/,
  "A imagem LCP deve disponibilizar uma variante intermédia de 960px para ecrãs móveis de alta densidade.",
);
assert.match(
  home,
  /class="review-stars" role="img" aria-label="5 em 5"/,
  "As estrelas das avaliações devem ter uma função semântica que aceite aria-label.",
);
assert.doesNotMatch(home, /class="review-stars" aria-label=/, "Um div genérico não deve receber aria-label.");
assert.match(prices, /<ul class="package-facts" aria-label=/, "O resumo do pacote deve ser uma lista semântica que possa ser nomeada.");
const eventForm = await readFile(new URL("../dist/formulario/index.html", import.meta.url), "utf8");
assert.doesNotMatch(eventForm, /aria-hidden="true"><label for="event-website"/, "A armadilha anti-spam não pode esconder um campo focável da árvore de acessibilidade.");
assert.match(eventForm, /<input id="event-website"[^>]+ hidden/, "A armadilha anti-spam deve usar o atributo HTML hidden.");
assert.doesNotMatch(css, /box-shadow: 0 0 0 14px rgba\(37, 211, 102, 0\)/, "A pulsação do WhatsApp não deve animar box-shadow.");
assert.match(css, /\.whatsapp-float::after/, "A pulsação deve usar um pseudo-elemento composto.");
assert.match(css, /--ink-muted:\s+#42615B/, "O texto secundário deve cumprir contraste sobre os fundos creme.");
assert.doesNotMatch(css, /color:\s+#5A7A74/, "O rodapé não deve usar texto com contraste insuficiente.");

console.log("PageSpeed output and accessibility checks passed.");
