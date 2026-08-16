/**
 * FONTE ÚNICA DE VERDADE do negócio.
 *
 * Nome, telefone, email e área de atuação são usados aqui, no JSON-LD,
 * no rodapé e nas páginas. Manter isto igual ao Perfil de Empresa do
 * Google e ao Instagram é o que faz os motores e os modelos de IA
 * tratarem o Ted como UMA entidade fiável em vez de várias dispersas.
 *
 * ⚠️  Campos marcado com TODO precisam de dados reais antes de publicar.
 */

export const SITE = {
  url: "https://tedinportugal.pt",
  name: "Ted Animações",
  alternateName: "Ted in Portugal",
  legalName: "TODO_NOME_LEGAL", // TODO: nome em nome individual / empresa
  vatID: "TODO_NIF", // TODO: NIF — alimenta o JSON-LD e a página /sobre-o-ted
  founded: "2022", // TODO: confirmar ano de início

  phone: "+351936331843",
  phoneDisplay: "+351 936 331 843",
  email: "tedinportugal@gmail.com",
  instagram: "https://www.instagram.com/tedinportugal",
  instagramHandle: "@tedinportugal",

  // TODO: colar aqui o URL do Perfil de Empresa do Google assim que existir.
  // É a maior alavanca local isolada e alimenta o campo sameAs do JSON-LD.
  googleBusinessUrl: "",

  // Base de operações. Necessária para o JSON-LD de negócio local.
  address: {
    locality: "Faro", // TODO: confirmar concelho da base
    region: "Algarve",
    postalCode: "TODO_CP", // TODO: código postal
    country: "PT",
  },
  geo: { lat: 37.0194, lng: -7.9304 }, // TODO: confirmar coordenadas da base

  // Métricas verificáveis. Substituir os superlativos vagos do site antigo
  // ("Centenas de festas") por números que se possam defender.
  stats: {
    parties: "TODO_N", // TODO: nº real de festas realizadas
    hotels: "TODO_N", // TODO: nº de hotéis/resorts com quem trabalhou
  },
} as const;

/** Concelhos servidos — usados no JSON-LD (areaServed) e nas páginas locais. */
export const SERVICE_AREAS = [
  "Faro",
  "Albufeira",
  "Loulé",
  "Lagos",
  "Portimão",
  "Vilamoura",
  "Quarteira",
  "Olhão",
  "Tavira",
  "Silves",
] as const;

export type Lang = "pt" | "en";

/**
 * Link de WhatsApp com mensagem pré-preenchida ao contexto da página.
 * Uma conversa que já começa a dizer o serviço e a localidade é uma
 * conversa qualificada — e poupa uma troca de mensagens ao Ted.
 */
export function whatsappUrl(context?: string, lang: Lang = "pt"): string {
  const base =
    lang === "en"
      ? "Hi Ted! I'd like a quote"
      : "Olá Ted! Gostaria de pedir um orçamento";
  const suffix = context
    ? lang === "en"
      ? ` for ${context}.`
      : ` para ${context}.`
    : ".";
  return `https://wa.me/${SITE.phone.replace(/\D/g, "")}?text=${encodeURIComponent(base + suffix)}`;
}

/**
 * Constrói uma URL absoluta e canónica a partir de um caminho.
 *
 * A barra final é preservada tal como vem, porque o Astro gera rotas em
 * pasta (/precos/index.html). Canónico e sitemap têm de coincidir ao
 * carácter — se divergirem, o Google trata-os como duas páginas.
 */
export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
  return new URL(withSlash, SITE.url).href;
}

/**
 * Mapa explícito PT → EN.
 *
 * Os slugs são diferentes em cada idioma (/precos vs /en/prices), por isso
 * não dá para derivar um do outro prefixando "/en". Sem este mapa, as tags
 * hreflang apontariam para páginas inexistentes e o Google descartaria o
 * par de idiomas por inteiro.
 *
 * Páginas sem equivalente ficam de fora — melhor não declarar alternativa
 * do que declarar uma que dá 404.
 */
export const ROUTE_MAP: Record<string, string> = {
  "/": "/en/",
  "/festas-de-aniversario": "/en/birthday-parties",
  "/atividades": "/en/activities",
  "/atividades/caca-ao-tesouro": "/en/activities/treasure-hunt",
  "/atividades/pintura-facial": "/en/activities/face-painting",
  "/atividades/pulseiras-criativas": "/en/activities/bracelet-workshop",
  "/atividades/jogos-e-desafios": "/en/activities/games-and-challenges",
  "/precos": "/en/prices",
  "/animacao-para-hoteis": "/en/hotel-entertainment",
  "/avaliacoes": "/en/reviews",
  "/galeria": "/en/gallery",
  "/sobre-o-ted": "/en/about",
  "/contactos": "/en/contact",
  // /onde-atuamos/* ainda não tem espelho inglês.
};

const REVERSE_ROUTE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(ROUTE_MAP).map(([pt, en]) => [en, pt]),
);

/**
 * Devolve o par PT/EN desta página para as tags hreflang.
 * Qualquer um dos lados pode ser `undefined` quando não existe equivalente.
 */
export function altLanguageUrls(pathname: string): {
  pt?: string;
  en?: string;
} {
  const isEn = /^\/en(\/|$)/.test(pathname);

  if (isEn) {
    const ptPath = REVERSE_ROUTE_MAP[pathname];
    return {
      pt: ptPath ? absoluteUrl(ptPath) : undefined,
      en: absoluteUrl(pathname),
    };
  }

  const enPath = ROUTE_MAP[pathname];
  return {
    pt: absoluteUrl(pathname),
    en: enPath ? absoluteUrl(enPath) : undefined,
  };
}

/** Navegação principal, por idioma. */
export const NAV: Record<Lang, { label: string; href: string }[]> = {
  pt: [
    { label: "Festas de aniversário", href: "/festas-de-aniversario" },
    { label: "Atividades", href: "/atividades" },
    { label: "Preços", href: "/precos" },
    { label: "Hotéis e eventos", href: "/animacao-para-hoteis" },
    { label: "Avaliações", href: "/avaliacoes" },
    { label: "Galeria", href: "/galeria" },
    { label: "Contactos", href: "/contactos" },
  ],
  en: [
    { label: "Birthday parties", href: "/en/birthday-parties" },
    { label: "Activities", href: "/en/activities" },
    { label: "Prices", href: "/en/prices" },
    { label: "Hotels & events", href: "/en/hotel-entertainment" },
    { label: "Reviews", href: "/en/reviews" },
    { label: "Gallery", href: "/en/gallery" },
    { label: "Contact", href: "/en/contact" },
  ],
};

/** Micro-cópia repetida, por idioma. */
export const T = {
  pt: {
    quote: "Pedir orçamento no WhatsApp",
    quoteShort: "Pedir orçamento",
    talk: "Falar com o Ted",
    seeActivities: "Ver atividades",
    seePrices: "Ver preços",
    tagline: "animação infantil",
    langSwitch: "EN",
    skip: "Saltar para o conteúdo",
    menu: "Menu",
    home: "Início",
  },
  en: {
    quote: "Get a quote on WhatsApp",
    quoteShort: "Get a quote",
    talk: "Talk to Ted",
    seeActivities: "See activities",
    seePrices: "See prices",
    tagline: "kids entertainment",
    langSwitch: "PT",
    skip: "Skip to content",
    menu: "Menu",
    home: "Home",
  },
} as const;
