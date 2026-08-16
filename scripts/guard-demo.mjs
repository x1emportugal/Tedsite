#!/usr/bin/env node
/**
 * Impede que o modo de demonstração das avaliações chegue a produção.
 *
 * Corre antes de `astro build`. Se PUBLIC_DEMO_REVIEWS estiver ligado, o
 * build falha, com código de saída diferente de zero, e nada é gerado.
 *
 * Publicar avaliações inventadas dá penalização manual do Google e é
 * ilegal em Portugal desde o DL 109-G/2021. Este guarda existe para que
 * isso não possa acontecer por distração.
 */
if (process.env.PUBLIC_DEMO_REVIEWS === "1") {
  console.error(
    "\n\x1b[41m\x1b[97m  BUILD BLOQUEADO  \x1b[0m\n\n" +
      "  PUBLIC_DEMO_REVIEWS=1 está ativo: as avaliações em uso são inventadas.\n" +
      "  Este conteúdo serve só para pré-visualizar o desenho e nunca pode ser\n" +
      "  publicado.\n\n" +
      "  Para compilar a sério, corra sem a variável:\n" +
      "    \x1b[36mnpm run build\x1b[0m\n\n" +
      "  Para continuar a ver a demonstração localmente:\n" +
      "    \x1b[36mnpm run dev:demo\x1b[0m\n",
  );
  process.exit(1);
}
