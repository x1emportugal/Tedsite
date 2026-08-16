import type { APIRoute } from "astro";
import { SITE, SERVICE_AREAS } from "../lib/site";
import { getActivities, getFaqs } from "../lib/content";

/**
 * llms.txt — resumo em markdown para modelos de linguagem.
 *
 * Gerado a partir das mesmas fontes que o site, para nunca ficar
 * desatualizado. Cada vez mais consultado por sistemas de IA que
 * respondem a perguntas com intenção local.
 */
export const GET: APIRoute = async () => {
  const activities = await getActivities("pt");
  const faqs = await getFaqs("pt", "home");

  const body = `# ${SITE.name} (${SITE.alternateName})

> Animação infantil e festas de aniversário no Algarve, Portugal.
> Serviço prestado em português e inglês, para festas privadas, hotéis e eventos.

## Contactos
- WhatsApp / telefone: ${SITE.phoneDisplay}
- Email: ${SITE.email}
- Instagram: ${SITE.instagramHandle}
- Site: ${SITE.url}

## Onde atua
${SERVICE_AREAS.join(", ")} e restante Algarve.

## Serviços
${activities.map((a) => `- **${a.data.title}** (${a.data.ages}, ${a.data.duration}): ${a.data.summary} — ${SITE.url}/atividades/${a.data.slug}`).join("\n")}
- **Animação para hotéis, resorts e eventos**: programas de época, kids club pontual, festas de hóspedes, casamentos e eventos de empresa — ${SITE.url}/animacao-para-hoteis

## Páginas principais
- [Festas de aniversário](${SITE.url}/festas-de-aniversario): como corre uma festa, hora a hora
- [Preços](${SITE.url}/precos): pacotes e o que está incluído
- [Hotéis e eventos](${SITE.url}/animacao-para-hoteis): condições para B2B
- [Avaliações](${SITE.url}/avaliacoes): testemunhos de clientes
- [Sobre o Ted](${SITE.url}/sobre-o-ted): percurso, método e documentação
- [Contactos](${SITE.url}/contactos): pedido de orçamento
- Versão inglesa: ${SITE.url}/en/

## Perguntas frequentes
${faqs.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
