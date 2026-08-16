import { getCollection, z } from "astro:content";
import type { Lang } from "./site";
import reviewsData from "../content/reviews.json";

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
 * Respostas ainda por preencher (PREENCHER/TO FILL IN) são omitidas — não
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
 * vazio seja um estado silencioso e legítimo — melhor nenhuma avaliação do
 * que avaliações inventadas. A validação de forma mantém-se.
 */
export function getReviews(lang: Lang, onlyFeatured = false) {
  const parsed = z.array(reviewSchema).safeParse(reviewsData);
  if (!parsed.success) {
    throw new Error(
      `reviews.json tem entradas inválidas: ${parsed.error.issues
        .map((i) => `${i.path.join(".")} — ${i.message}`)
        .join("; ")}`,
    );
  }
  return parsed.data
    .filter((r) => r.lang === lang)
    .filter((r) => !onlyFeatured || r.featured);
}

/** Média e contagem — só para o aggregateRating quando existirem dados. */
export function ratingFrom(reviews: { rating: number }[]) {
  if (!reviews.length) return undefined;
  const value = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return { value, count: reviews.length };
}
