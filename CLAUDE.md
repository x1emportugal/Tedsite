# Ted Animações, contexto do projeto

Site de animação infantil no Algarve. Astro estático, PT com espelho EN.
Substitui um site React que não servia conteúdo no HTML e por isso era
invisível para o Google e para os crawlers de IA.

## Onde está o quê

| Caminho | O quê |
| --- | --- |
| `src/lib/site.ts` | Dados do negócio, zonas, navegação, WhatsApp, mapa PT↔EN |
| `src/lib/schema.ts` | Construtores de JSON-LD |
| `src/lib/content.ts` | Leitura de conteúdo e modo de demonstração |
| `src/content/` | Atividades e localidades em markdown; pacotes, FAQ e avaliações em JSON |
| `src/layouts/Base.astro` | `<head>`, SEO, JSON-LD, nav, rodapé, scripts |
| `src/pages/` | Uma pasta por rota; `en/` é o espelho inglês |
| `docs/` | Guias de Google Business e recolha de avaliações |

## Fluxo de alteração

```bash
npm run dev          # 4321, ou 4322 se estiver ocupada
npm run check        # lista marcadores por preencher
npm run build        # verifica e compila para dist/
git push origin main:astro
```

O ramo remoto é **`astro`**. O `main` remoto tem o site React antigo e serve
de rede de segurança: **não lhe tocar**.

Quando o Vercel estiver ligado ao ramo `astro`, **cada push publica**.
Confirmar com o Ted antes de empurrar mudanças de conteúdo visível.

## Regras que não se quebram

1. **Sem travessões.** Em nada: copy, documentação, comentários. Usar vírgula,
   dois pontos ou ponto final. Se o travessão introduzia uma enumeração, a
   vírgula cria ambiguidade e é preciso reescrever.

2. **Nunca inventar avaliações.** `src/content/reviews.json` só leva
   testemunhos reais. Há um modo de demonstração (`npm run dev:demo`) que
   mostra exemplos com selo visível, não emite schema `Review` nem
   `aggregateRating`, e faz o build falhar se ficar ligado. Avaliações falsas
   dão penalização manual do Google e são ilegais em Portugal (DL 109-G/2021).

3. **Sem tabela de preços.** Decisão do Ted: cada festa é diferente. A página
   `/precos` existe e responde à pergunta "quanto custa" sem dar valores.

4. **Sem NIF publicado.** O Ted trabalha a recibos verdes. `vatID` fica vazio
   de propósito. Nas páginas B2B pode mencionar-se que passa recibo com NIF,
   porque aí é argumento para o hotel lançar na contabilidade.

5. **Conteúdo visível por omissão.** A classe `.reveal` nunca pode esconder
   conteúdo sem JavaScript garantido. Ver `js-reveal` em `Base.astro`.

6. **Páginas de localidade sem `localProof`** ficam `noindex` e fora do
   sitemap, para não serem doorway pages. É automático.

7. **`hreflang` vem do `ROUTE_MAP`** em `site.ts`. Ao criar uma página nova
   com equivalente no outro idioma, acrescentar lá o par.

## Ambiente

- **Nunca guardar este projeto no Desktop nem em Documentos.** Estão
  sincronizados com o iCloud e, com o disco cheio, o macOS marca ficheiros
  como `dataless`. O Node bloqueia num `read()` e o build fica pendurado sem
  output nem CPU. Diagnóstico: `ls -lO` mostra a flag `dataless`.
- Astro 7 só permite um servidor de desenvolvimento por projeto. Parar com
  `npx astro dev stop`.

## Por preencher

Corre `npm run check`. Faltam dados que só o Ted tem: seguro de
responsabilidade civil, registo criminal e o percurso profissional.
Falta também o Perfil de Empresa no Google (`googleBusinessUrl` em
`site.ts`), avaliações reais e o endpoint do formulário
(`PUBLIC_FORM_ENDPOINT`).
