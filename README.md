# Ted Animações

Site de animação infantil no Algarve, reconstruído em **Astro** a partir da
auditoria de agosto de 2026.

O site antigo era uma aplicação React que renderizava tudo no browser: o HTML
entregue pelo servidor não tinha uma única palavra de conteúdo, e por isso era
invisível para os crawlers de IA e mal lido pelo Google. Esta versão gera HTML
estático real para cada página.

---

## Arrancar

```bash
npm install
npm run dev
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor local em http://localhost:4321 |
| `npm run build` | Verifica marcadores e gera o site em `dist/` |
| `npm run check` | Lista o que ainda falta preencher |
| `npm run preview` | Serve o `dist/` como ficará em produção |

> ⚠️ **Não guardar este projeto no Desktop nem em Documentos.**
> Essas pastas estão sincronizadas com o iCloud e, com o disco quase cheio, o
> macOS despeja ficheiros para a nuvem (`dataless`). O build fica pendurado
> indefinidamente à espera que o iCloud os devolva. Foi exatamente isso que
> aconteceu durante o desenvolvimento. Manter em `~/Projects/`.

---

## O que ainda falta preencher

Corra `npm run check` a qualquer momento para ver a lista atualizada.
Por ordem de impacto:

### 1. Preços
`src/content/packages.json`
Trocar `"price": null` pelo valor real de cada pacote. Enquanto for `null`, a
página mostra «Sob consulta». Funciona, mas perde as pesquisas de preço, que
são a segunda intenção mais comum neste setor.

### 2. Avaliações
`src/content/reviews.json`
Está vazio de propósito: **nunca inventar avaliações**. O formato está em
`reviews.example.json`. Assim que houver entradas, ligam-se sozinhos:

- a secção de avaliações na home e na página de preços
- as páginas `/avaliacoes` e `/en/reviews`
- o schema `Review` e o `aggregateRating` no JSON-LD
- as avaliações por localidade (basta o campo `location` coincidir)

Copiar o texto tal como o cliente escreveu. Testemunhos polidos soam a falso e
convertem pior.

### 3. Dados do negócio
`src/lib/site.ts`
NIF, morada, código postal, coordenadas, ano de início e o URL do Perfil de
Empresa do Google. Alimentam o JSON-LD. Campos que comecem por `TODO_` são
**automaticamente omitidos** do JSON-LD, portanto nada inválido chega ao HTML.

---

## Onde mexer em quê

```
src/
├─ lib/site.ts            ← dados do negócio, zonas, navegação, WhatsApp
├─ lib/schema.ts          ← construtores de JSON-LD
├─ lib/images.ts          ← mapa de fotografias e ordem da galeria
├─ content/
│  ├─ activities/pt|en/   ← uma atividade por ficheiro markdown
│  ├─ locations/pt/       ← uma localidade por ficheiro markdown
│  ├─ packages.json       ← pacotes e preços
│  ├─ faqs.json           ← perguntas frequentes
│  └─ reviews.json        ← avaliações reais
├─ components/            ← blocos reutilizáveis
├─ layouts/Base.astro     ← <head>, SEO, JSON-LD, nav, rodapé
└─ pages/                 ← uma pasta = uma rota
```

**Acrescentar uma atividade:** criar o markdown em `content/activities/pt/` e o
equivalente em `en/`. A página, o cartão na grelha e o sitemap aparecem
sozinhos. Acrescentar o par de rotas em `ROUTE_MAP` (`src/lib/site.ts`) para o
`hreflang` ficar correto.

**Acrescentar uma localidade:** criar o markdown em `content/locations/pt/`.
Enquanto `localProof` estiver vazio, a página é servida com `noindex` e fica
fora do sitemap. Uma página por cidade sem conteúdo próprio é uma
*doorway page*, que o Google penaliza. Assim que tiver uma entrada real
(festas feitas na zona, espaços, testemunhos locais), passa a ser indexada
automaticamente.

---

## O que foi resolvido

| Problema da auditoria | Estado |
| --- | --- |
| HTML sem conteúdo para crawlers e IA | ✅ 3 500 a 7 000 caracteres de texto real por página |
| Zero dados estruturados | ✅ 3 a 5 blocos JSON-LD por página |
| 1 única URL indexável | ✅ 32 páginas, 27 no sitemap |
| 11 MB de imagens na home | ✅ ~248 KB em telemóvel, ~420 KB em desktop |
| `robots.txt` e `sitemap.xml` partidos | ✅ ficheiros reais, com crawlers de IA permitidos |
| 404 devolvia 200 | ✅ página 404 real com `noindex` |
| Só português | ✅ espelho inglês completo com `hreflang` recíproco |
| Sem prova social | ✅ estrutura pronta, falta o conteúdo real |
| Sem preços | ✅ página e pacotes prontos, falta o valor |
| Sem captura de contactos | ✅ formulário de orçamento com fallback para WhatsApp |
| Conversões não medidas | ✅ eventos Umami em cada CTA (`data-cta`) |
| Fontes bloqueantes do Google | ✅ self-hosted, com preload |
| `maximum-scale=1` (acessibilidade) | ✅ removido |
| Rodapé com «© 2025» | ✅ ano dinâmico |
| Sem política de privacidade | ✅ criada (falta completar dados legais) |
| Dependência da CloudFront/Manus | ✅ imagens self-hosted no repositório |

---

## Publicar

O site é estático: `dist/` pode ir para qualquer alojamento. Gratuito e
adequado: **Cloudflare Pages** ou **Netlify**.

- Build command: `npm run build`
- Output directory: `dist`
- Node: 22 ou superior

### Formulário de orçamento
Sem configuração, o formulário compõe a mensagem e abre o WhatsApp. Funciona,
mas não constrói lista de contactos. Para receber por email, criar um endpoint
(Formspree, Web3Forms ou Netlify Forms) e definir a variável de ambiente:

```
PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

### Analytics
O layout já dispara eventos Umami (`whatsapp-click`, `form-enviado`,
`form-para-whatsapp`). Falta apenas acrescentar o script do Umami ao
`src/layouts/Base.astro` com o ID do site. No site antigo era
`029f71b8-a41a-4282-9708-2b9014148ac4`.

### Depois de publicar
1. Google Search Console → submeter `https://tedinportugal.pt/sitemap-index.xml`
2. Criar/verificar o **Perfil de Empresa no Google** e colar o URL em `site.ts`
3. Pedir 20 a 30 avaliações a clientes antigos
4. Confirmar que os eventos de conversão aparecem no Umami
