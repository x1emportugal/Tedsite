/**
 * Construtores de JSON-LD (dados estruturados).
 *
 * É isto que transforma o site de "uma página" numa ENTIDADE que o Google
 * e os modelos de linguagem conseguem citar. Auditoria: antes disto o site
 * tinha zero blocos de dados estruturados.
 */

import { SITE, SERVICE_AREAS, absoluteUrl } from "./site";

const BUSINESS_ID = `${SITE.url}/#business`;
const WEBSITE_ID = `${SITE.url}/#website`;

/** Só emite campos preenchidos, nada de TODO_ a chegar ao HTML. */
function clean<T extends Record<string, unknown>>(obj: T): T {
  const out = {} as T;
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    if (typeof v === "string" && v.startsWith("TODO_")) continue;
    out[k as keyof T] = v as T[keyof T];
  }
  return out;
}

/**
 * O negócio em si. Vai em todas as páginas.
 * As avaliações continuam visíveis nas páginas próprias, mas não entram no
 * schema da entidade: o Google não apresenta avaliações autocontroladas de
 * LocalBusiness/Organization como rich result.
 */
export function businessSchema() {
  return clean({
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    "@id": BUSINESS_ID,
    name: SITE.name,
    alternateName: SITE.alternateName,
    description:
      "Animação infantil e festas de aniversário no Algarve. Jogos, oficinas criativas, caça ao tesouro e pintura facial para festas privadas, hotéis e eventos.",
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: absoluteUrl("/ted-felt-logo.png"),
    logo: absoluteUrl("/ted-logo.png"),
    vatID: SITE.vatID,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    address: clean({
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    }),
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: SERVICE_AREAS.map((name) => ({ "@type": "City", name })),
    knowsLanguage: ["pt-PT", "en-GB"],
    sameAs: [SITE.instagram, SITE.googleBusinessUrl].filter(Boolean),
  });
}

/** O site oficial, separado da entidade do negócio. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.alternateName,
    alternateName: SITE.name,
    url: SITE.url,
  };
}

/** Um serviço concreto (atividade, pacote, animação para hotéis). */
export function serviceSchema(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  price?: number;
}) {
  return clean({
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.url),
    image: input.image,
    serviceType: "Animação infantil",
    provider: { "@id": BUSINESS_ID },
    areaServed: SERVICE_AREAS.map((name) => ({ "@type": "City", name })),
    ...(input.price
      ? {
          offers: {
            "@type": "Offer",
            price: input.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: absoluteUrl(input.url),
          },
        }
      : {}),
  });
}

/**
 * Perguntas frequentes.
 * Duplo efeito: elegível para resultado enriquecido no Google, e é o
 * formato que os modelos de linguagem citam com mais frequência.
 */
export function faqSchema(items: { question: string; answer: string }[]) {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Migalhas de navegação, ajuda o Google a perceber a hierarquia. */
export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  if (trail.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.href),
    })),
  };
}

/** A página em si, ligada ao negócio. */
export function webPageSchema(input: {
  title: string;
  description: string;
  url: string;
  lang: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.url),
    inLanguage: input.lang === "en" ? "en-GB" : "pt-PT",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
  };
}
