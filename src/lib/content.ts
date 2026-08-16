import { getCollection, z } from "astro:content";
import type { Lang } from "./site";
import reviewsData from "../content/reviews.json";
import demoReviewsData from "../content/reviews.demo.json";

/**
 * Modo de demonstração das avaliações.
 *
 * Serve só para ver o desenho da secção enquanto não há testemunhos reais.
 * Ativa-se com PUBLIC_DEMO_REVIEWS=1 em `npm run dev` ou `npm run preview:demo`.
 *
 * Nesse modo, e de propósito:
 *   - cada cartão leva um selo bem visível a dizer que é exemplo;
 *   - NÃO é emitido schema Review nem aggregateRating, para que nada falso
 *     seja legível por máquinas como se fosse uma avaliação genuína;
 *   - `npm run build` recusa-se a compilar, para nunca ir parar à web.
 *
 * Avaliações inventadas publicadas a sério dão penalização manual do Google
 * e são ilegais em Portugal desde o DL 109-G/2021.
 */
export const DEMO_REVIEWS = import.meta.env.PUBLIC_DEMO_REVIEWS === "1";

/** Atividades de um idioma, já ordenadas. */
export async function getActivities(lang: Lang) {
  const all = await getCollection("activities", (e) => e.data.lang === lang);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Localidades de um idioma, já ordenadas. */
export async function getLocations(lang: Lang) {
  const all = await getCollection("locations", (e) => e.data.lang === lang);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Pacotes de um idioma, já ordenados. */
export async function getPackages(lang: Lang) {
  const all = await getCollection("packages", (e) => e.data.lang === lang);
  return all.sort((a, b) => a.data.order - b.data.order).map((e) => e.data);
}

/**
 * Perguntas frequentes de um idioma, opcionalmente filtradas por tópico.
 * Respostas ainda por preencher (PREENCHER/TO FILL IN) são omitidas, não
 * vale a pena publicar uma pergunta sem resposta.
 */
export async function getFaqs(lang: Lang, topic?: string) {
  const all = await getCollection("faqs", (e) => e.data.lang === lang);
  return all
    .filter((e) => !topic || e.data.topics.includes(topic))
    .filter((e) => !/^(PREENCHER|TO FILL IN)/.test(e.data.answer))
    .sort((a, b) => a.data.order - b.data.order)
    .map((e) => ({ question: e.data.question, answer: e.data.answer }));
}

const reviewSchema = z.object({
  id: z.string(),
  author: z.string(),
  rating: z.number().min(1).max(5),
  body: z.string(),
  location: z.string().optional(),
  context: z.string().optional(),
  date: z.string().optional(),
  lang: z.enum(["pt", "en"]).default("pt"),
  featured: z.boolean().default(false),
});

/**
 * Avaliações reais.
 *
 * Lidas diretamente do JSON (e não via getCollection) para que um ficheiro
 * vazio seja um estado silencioso e legítimo, melhor nenhuma avaliação do
 * que avaliações inventadas. A validação de forma mantém-se.
 */
export function getReviews(lang: Lang, onlyFeatured = false) {
  const source = DEMO_REVIEWS ? demoReviewsData : reviewsData;
  const file = DEMO_REVIEWS ? "reviews.demo.json" : "reviews.json";

  const parsed = z.array(reviewSchema).safeParse(source);
  if (!parsed.success) {
    throw new Error(
      `${file} tem entradas inválidas: ${parsed.error.issues
        .map((i) => `${i.path.join(".")}, ${i.message}`)
        .join("; ")}`,
    );
  }
  return parsed.data
    .filter((r) => r.lang === lang)
    .filter((r) => !onlyFeatured || r.featured);
}

/**
 * Classificação agregada para o JSON-LD.
 *
 * Em modo de demonstração devolve `undefined`: um aggregateRating com
 * dados inventados é exatamente o que o Google penaliza.
 */
export function ratingForSchema(reviews: { rating: number }[]) {
  if (DEMO_REVIEWS) return undefined;
  return ratingFrom(reviews);
}

/** Média e contagem, só para o aggregateRating quando existirem dados. */
export function ratingFrom(reviews: { rating: number }[]) {
  if (!reviews.length) return undefined;
  const value = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return { value, count: reviews.length };
}
