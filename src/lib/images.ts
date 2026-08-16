/**
 * Mapa de fotografias. As coleções de conteúdo guardam o nome do ficheiro
 * como texto; isto resolve-o para o recurso importado, para que o Astro
 * possa otimizar a imagem no build (WebP/AVIF, srcset, dimensões).
 */
import type { ImageMetadata } from "astro";

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/photos/*.{jpg,jpeg,png}",
  { eager: true },
);

/** Indexado por nome de ficheiro, ex.: "caca-ao-tesouro.jpg". */
export const PHOTOS: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [
    path.split("/").pop() as string,
    mod.default,
  ]),
);

export function photo(filename: string): ImageMetadata {
  const found = PHOTOS[filename];
  if (!found) {
    throw new Error(
      `Foto não encontrada: "${filename}". Disponíveis: ${Object.keys(PHOTOS).join(", ")}`,
    );
  }
  return found;
}

/** Galeria, por ordem de apresentação, com texto alternativo descritivo. */
export const GALLERY: { file: string; alt: string; altEn: string; portrait?: boolean }[] = [
  { file: "hero-festa-aniversario.jpg", alt: "Festa de aniversário com animação infantil no Algarve", altEn: "Birthday party with children's entertainment in the Algarve" },
  { file: "criancas-em-roda.jpg", alt: "Ted com crianças sentadas em roda numa animação interativa", altEn: "Ted with children sitting in a circle during an interactive session" },
  { file: "pintura-facial.jpg", alt: "Menina com pintura facial artística numa festa infantil", altEn: "Girl with artistic face painting at a children's party" },
  { file: "ted-com-criancas.jpg", alt: "Ted sentado a conversar com crianças durante a festa", altEn: "Ted sitting and talking with children during the party" },
  { file: "caca-ao-tesouro.jpg", alt: "Ted vestido de pirata com balão numa caça ao tesouro", altEn: "Ted dressed as a pirate with a balloon during a treasure hunt" },
  { file: "pulseiras-com-criancas.jpg", alt: "Ted a fazer pulseiras com crianças numa oficina criativa", altEn: "Ted making bracelets with children in a craft workshop" },
  { file: "pintura-facial-grupo.jpg", alt: "Grupo de crianças com pintura facial divertida", altEn: "Group of children with fun face painting" },
  { file: "ted-mesa-atividades.jpg", alt: "Ted sorridente na mesa de atividades criativas", altEn: "Ted smiling at the craft activities table" },
  { file: "contas-e-balao.jpg", alt: "Crianças a escolher contas coloridas junto a um balão cor-de-rosa", altEn: "Children choosing colourful beads next to a pink balloon" },
  { file: "familia-atividade.jpg", alt: "Ted e uma família numa atividade conjunta", altEn: "Ted and a family taking part in an activity together" },
  { file: "momento-carinho-ted.png", alt: "Momento de carinho com um urso de peluche do Ted", altEn: "A warm moment with a Ted teddy bear", portrait: true },
  { file: "jogos-e-desafios.jpg", alt: "Ted a contar uma história a um grupo de crianças", altEn: "Ted telling a story to a group of children" },
  { file: "maos-contas-coloridas.jpg", alt: "Mãos de criança a escolher contas coloridas para uma pulseira", altEn: "Child's hands choosing colourful beads for a bracelet" },
  { file: "oficina-preparacao.jpg", alt: "Ted a preparar uma atividade criativa antes da festa", altEn: "Ted preparing a craft activity before the party" },
  { file: "festa-exterior.jpg", alt: "Festa de aniversário ao ar livre no Algarve", altEn: "Outdoor birthday party in the Algarve" },
  { file: "animacao-grupo.jpg", alt: "Animação infantil com um grupo de crianças", altEn: "Children's entertainment with a group of children" },
  { file: "festa-jardim.jpg", alt: "Festa de aniversário num jardim com animação", altEn: "Birthday party in a garden with entertainment" },
];
