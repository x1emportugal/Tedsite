import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

/**
 * O conteúdo vive em ficheiros, não em código.
 * O Ted pode editar textos, preços, avaliações e perguntas frequentes
 * sem abrir um único componente.
 */

const langField = z.enum(["pt", "en"]);

/** Atividades: caça ao tesouro, pintura facial, pulseiras, jogos. */
const activities = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/activities" }),
  schema: z.object({
    lang: langField,
    slug: z.string(),
    title: z.string(),
    /** Título da aba do browser e do resultado no Google. */
    seoTitle: z.string(),
    description: z.string(),
    /** Frase curta usada nos cartões da grelha. */
    summary: z.string(),
    icon: z.string(),
    color: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    ages: z.string(),
    duration: z.string(),
    order: z.number().default(0),
    /** Perguntas específicas desta atividade, alimentam o FAQPage schema. */
    faqs: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
  }),
});

/** Páginas por concelho. Só criar quando houver conteúdo REAL da zona. */
const locations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/locations" }),
  schema: z.object({
    lang: langField,
    slug: z.string(),
    name: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    intro: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    order: z.number().default(0),
    /**
     * Provas concretas de presença na zona. Sem isto a página é uma
     * doorway page e o Google penaliza, melhor não publicar.
     */
    localProof: z.array(z.string()).default([]),
    faqs: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
  }),
});

/**
 * As avaliações vivem em src/content/reviews.json mas são lidas
 * diretamente em src/lib/content.ts, e não como coleção, assim um
 * ficheiro vazio não produz avisos a cada build. A validação de forma
 * acontece lá, com o mesmo esquema.
 *
 * NUNCA inventar avaliações: o schema Review e o aggregateRating do
 * JSON-LD dependem de estes dados serem reais.
 */

/** Pacotes e preços. */
const packages = defineCollection({
  loader: file("./src/content/packages.json"),
  schema: z.object({
    id: z.string(),
    lang: langField,
    name: z.string(),
    forWho: z.string(),
    /** null = "sob consulta" (usado no B2B). */
    price: z.number().nullable(),
    priceNote: z.string(),
    duration: z.string(),
    entertainers: z.number().int().positive(),
    workshops: z.number().int().nonnegative(),
    activities: z.number().int().nonnegative(),
    includes: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

/** Perguntas frequentes gerais. */
const faqs = defineCollection({
  loader: file("./src/content/faqs.json"),
  schema: z.object({
    id: z.string(),
    lang: langField,
    question: z.string(),
    answer: z.string(),
    /** Onde aparece: home, precos, hoteis, contactos. */
    topics: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

export const collections = { activities, locations, packages, faqs };
