// @ts-check
import { readdirSync, readFileSync } from "node:fs";
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

/**
 * Localidades ainda sem prova local concreta.
 *
 * Estas páginas são servidas com noindex (ver src/pages/onde-atuamos/[slug].astro)
 * porque, sem conteúdo próprio da zona, seriam doorway pages. Aqui são também
 * excluídas do sitemap — anunciar no sitemap uma página marcada noindex é um
 * sinal contraditório para o Google.
 *
 * Assim que `localProof` tiver pelo menos uma entrada, a página passa a ser
 * indexada E entra no sitemap automaticamente.
 */
function thinLocationPaths() {
  const out = [];
  for (const lang of ["pt", "en"]) {
    let files = [];
    try {
      files = readdirSync(`./src/content/locations/${lang}`);
    } catch {
      continue;
    }
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const raw = readFileSync(`./src/content/locations/${lang}/${file}`, "utf8");
      const slug = raw.match(/^slug:\s*(.+)$/m)?.[1]?.trim();
      const proof = raw.match(/^localProof:\s*(\[\s*\])?\s*$/m);
      // Casa quando localProof é uma lista vazia em linha (`[]`) ou está sem itens.
      const hasItems = /^localProof:\s*$\n(\s+-\s+.+)/m.test(raw);
      if (slug && !hasItems && proof !== null) {
        out.push(lang === "pt" ? `/onde-atuamos/${slug}/` : `/en/areas/${slug}/`);
      }
    }
  }
  return out;
}

const THIN = thinLocationPaths();

export default defineConfig({
  site: "https://tedinportugal.pt",

  // Saída estática: cada página vira um ficheiro HTML real.
  // É isto que resolve o problema nº1 da auditoria — o conteúdo passa a
  // existir no HTML entregue, sem depender de JavaScript.
  output: "static",

  // Português é a língua base (sem prefixo /pt/), inglês vive em /en/.
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "pt",
        locales: { pt: "pt-PT", en: "en-GB" },
      },
      filter: (page) => {
        if (page.includes("/politica-de-privacidade")) return false;
        const path = new URL(page).pathname;
        return !THIN.includes(path);
      },
    }),
  ],

  // Fontes descarregadas e servidas do próprio domínio, com preload e
  // métricas de fallback. Elimina o pedido bloqueante ao Google Fonts.
  fonts: [
    {
      name: "Baloo 2",
      cssVariable: "--font-display",
      provider: fontProviders.google(),
      // Só os pesos realmente usados: 800 nos títulos, 700 nos rótulos.
      weights: [700, 800],
      subsets: ["latin"],
      fallbacks: ["Trebuchet MS", "system-ui", "sans-serif"],
      optimizedFallbacks: true,
      display: "swap",
    },
    {
      name: "Nunito",
      cssVariable: "--font-body",
      provider: fontProviders.google(),
      // 400 para corpo de texto, 700 para negrito e destaques.
      weights: [400, 700],
      subsets: ["latin"],
      fallbacks: ["Avenir Next", "Segoe UI", "system-ui", "sans-serif"],
      optimizedFallbacks: true,
      display: "swap",
    },
  ],

  image: {
    responsiveStyles: true,
    layout: "constrained",
  },

  build: {
    inlineStylesheets: "auto",
  },
});
