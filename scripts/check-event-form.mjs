import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const eventForm = readFileSync("dist/formulario/index.html", "utf8");
const contact = readFileSync("dist/contactos/index.html", "utf8");
const sitemap = readFileSync("dist/sitemap-0.xml", "utf8");

// Quebra que apanha: a rota existe, mas o fluxo principal ou uma etapa desapareceu.
assert.match(eventForm, /id="event-brief-form"/, "A página deve conter o formulário do evento.");
assert.equal(
  (eventForm.match(/data-step-panel=/g) ?? []).length,
  5,
  "O briefing deve manter exatamente cinco etapas curtas.",
);
assert.match(eventForm, /id="event-progress"/, "O formulário deve comunicar o progresso.");

// Quebra que apanha: atividades voltam a aceitar apenas uma opção.
assert.match(
  eventForm,
  /type="checkbox"[^>]*name="atividades"|name="atividades"[^>]*type="checkbox"/,
  "As atividades devem permitir escolha múltipla.",
);

// Quebra que apanha: o cliente envia sem rever ou sem aceitar a privacidade.
assert.match(eventForm, /id="event-review"/, "A última etapa deve mostrar um resumo.");
assert.match(
  eventForm,
  /type="checkbox"[^>]*name="privacidade"[^>]*required|name="privacidade"[^>]*type="checkbox"[^>]*required/,
  "O envio deve exigir aceitação da política de privacidade.",
);

// Quebra que apanha: pedidos sem endpoint ficam sem destino.
assert.match(eventForm, /wa\.me\/351936331843/, "O fallback para WhatsApp deve estar presente.");

// Quebra que apanha: o site deixa de encaminhar clientes para o novo briefing.
assert.match(contact, /href="\/formulario\/"/, "Contactos deve apontar para o novo formulário.");
assert.doesNotMatch(contact, /id="quote-form"/, "O formulário curto não deve continuar embutido em Contactos.");

assert.match(
  sitemap,
  /https:\/\/tedinportugal\.pt\/formulario\//,
  "O sitemap deve anunciar a nova página.",
);

console.log("Event form contract check passed.");
