# Formulário de evento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar um formulário de evento por etapas em `/formulario/`, substituir o formulário curto de Contactos por um CTA e manter envio seguro por endpoint ou WhatsApp.

**Architecture:** Uma página Astro estática renderiza um componente isolado `EventBriefForm.astro`. O componente mantém a progressão e validação no navegador com JavaScript sem dependências; o envio reutiliza `PUBLIC_FORM_ENDPOINT` e a estratégia de fallback já existente no projeto.

**Tech Stack:** Astro 7, HTML semântico, CSS isolado no componente, TypeScript no script do cliente e testes de contrato em Node.js.

**Spec:** `docs/superpowers/specs/2026-09-01-formulario-evento-design.md`

## Global Constraints

- Não usar Google Forms, Google Sheets, base de dados, PDF, CSV ou CRM nesta fase.
- Manter o design visual e as rotas existentes.
- A página pública deve usar exatamente `/formulario/`.
- O formulário precisa funcionar sem endpoint através do fallback WhatsApp.
- Não adicionar dependências de produção.

---

### Task 1: Teste de contrato do novo formulário

**Files:**
- Create: `scripts/check-event-form.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: saída estática em `dist/formulario/index.html` e `dist/contactos/index.html`.
- Produces: comando integrado em `npm run check` que rejeita regressões estruturais.

- [ ] **Step 1: Escrever o teste que exige rota, cinco etapas, escolhas múltiplas, resumo, privacidade e CTA de Contactos**

```js
const form = readFileSync("dist/formulario/index.html", "utf8");
assert.match(form, /id="event-brief-form"/);
assert.equal((form.match(/data-step-panel=/g) ?? []).length, 5);
assert.match(form, /name="atividades"[^>]+type="checkbox"/);
assert.match(form, /id="event-review"/);
assert.match(form, /name="privacidade"[^>]+required/);
assert.match(contact, /href="\/formulario\/"/);
```

- [ ] **Step 2: Executar o teste antes da implementação**

Run: `npm run build`

Expected: FAIL porque `dist/formulario/index.html` ainda não existe.

- [ ] **Step 3: Integrar o teste no build após `astro build`**

```json
"build": "node scripts/guard-demo.mjs && npm run check && astro build && node scripts/check-event-form.mjs && node scripts/check-pagespeed-output.mjs"
```

- [ ] **Step 4: Commit do teste**

```bash
git add package.json scripts/check-event-form.mjs
git commit -m "test: validar formulário de evento"
```

### Task 2: Componente do briefing por etapas

**Files:**
- Create: `src/components/EventBriefForm.astro`

**Interfaces:**
- Consumes: `PUBLIC_FORM_ENDPOINT`, `SITE.whatsapp`, `SERVICE_AREAS` e `Icon.astro`.
- Produces: componente `<EventBriefForm />` com formulário `#event-brief-form`, cinco painéis `data-step-panel`, resumo `#event-review` e envio por POST/fallback.

- [ ] **Step 1: Criar a estrutura HTML semântica das cinco etapas**

Use `fieldset` e `legend` para grupos de opções, `required` nos campos essenciais e checkboxes com `name="atividades"` para múltiplas escolhas.

- [ ] **Step 2: Implementar navegação e validação por etapa**

```ts
function goToStep(next: number) {
  currentStep = Math.max(0, Math.min(next, panels.length - 1));
  panels.forEach((panel, index) => panel.hidden = index !== currentStep);
  progress.value = currentStep + 1;
}
```

Antes de avançar, usar `checkValidity()` e `reportValidity()` na primeira entrada visível inválida.

- [ ] **Step 3: Implementar campos condicionais das crianças**

Atualizar `hidden` e `required` quando `tem_criancas` mudar. “Sim” exige quantidade e idades; “não” oculta e limpa os campos específicos.

- [ ] **Step 4: Implementar o resumo seguro**

Construir o resumo com `document.createElement`, `textContent` e listas; não inserir valores do cliente com `innerHTML`.

- [ ] **Step 5: Implementar envio**

Com endpoint, enviar `FormData` por `fetch` e limpar após HTTP 2xx. Sem endpoint, compor linhas legíveis e abrir `https://wa.me/351936331843?text=...`. Em ambos os casos atualizar `aria-live` e evento Umami.

- [ ] **Step 6: Estilizar o componente**

Aplicar tokens já existentes (`--teal`, `--yellow`, `--cream`, `--ink`) e opções em cartões. Adicionar media query móvel e `prefers-reduced-motion` sem alterar CSS global.

- [ ] **Step 7: Executar verificação Astro**

Run: `npx astro check`

Expected: PASS sem erros.

- [ ] **Step 8: Commit do componente**

```bash
git add src/components/EventBriefForm.astro
git commit -m "feat: criar briefing de evento por etapas"
```

### Task 3: Página `/formulario/` e entrada no site

**Files:**
- Create: `src/pages/formulario.astro`
- Modify: `src/pages/contactos.astro`

**Interfaces:**
- Consumes: `EventBriefForm`, `Base`, `Breadcrumbs`, `SectionHead`, `Deco` e `Wave`.
- Produces: rota canónica `/formulario/` e CTA “Preencher formulário do evento” em Contactos.

- [ ] **Step 1: Criar a página com metadados, um H1 e o componente**

```astro
<Base title="Formulário do Evento | Ted Animações" path="/formulario" ...>
  <SectionHead as="h1" eyebrow="Conte-me a sua ideia" title="Vamos preparar o seu evento" ... />
  <EventBriefForm />
</Base>
```

- [ ] **Step 2: Substituir `QuoteForm` em Contactos por CTA**

Remover o import e a instância do formulário curto. Manter cartões de WhatsApp, email e Instagram; adicionar cartão explicativo e link `/formulario/`.

- [ ] **Step 3: Executar build e confirmar que o teste passa**

Run: `npm run build`

Expected: PASS, 35 páginas geradas e `Event form contract check passed.`

- [ ] **Step 4: Inspecionar HTML e sitemap local**

Run: `rg -n "formulario|event-brief-form" dist/formulario/index.html dist/contactos/index.html dist/sitemap-0.xml`

Expected: rota, formulário, CTA e sitemap presentes.

- [ ] **Step 5: Commit da integração**

```bash
git add src/pages/formulario.astro src/pages/contactos.astro
git commit -m "feat: publicar formulário próprio do evento"
```

### Task 4: Verificação e publicação

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: build final e configuração do Vercel.
- Produces: documentação do endpoint e rota publicada.

- [ ] **Step 1: Atualizar README**

Documentar `/formulario/`, o fallback e que `PUBLIC_FORM_ENDPOINT` ativa o envio por email.

- [ ] **Step 2: Executar verificações finais**

Run: `npm run build && git diff --check`

Expected: ambos terminam com código 0.

- [ ] **Step 3: Publicar no Git e no Vercel**

```bash
git push origin HEAD:astro
npx vercel --prod --yes --scope migcpm-7242s-projects --project tedinportugal-jogoia
```

- [ ] **Step 4: Verificar produção**

Testar HTTP 200 em `/formulario/`, `/contactos/`, `/robots.txt` e `/sitemap-0.xml`; confirmar cinco etapas, CTA, canonical e Googlebot HTTP 200.

- [ ] **Step 5: Commit de documentação se necessário**

```bash
git add README.md docs/superpowers/specs/2026-09-01-formulario-evento-design.md docs/superpowers/plans/2026-09-01-formulario-evento.md
git commit -m "docs: descrever formulário de evento"
```
