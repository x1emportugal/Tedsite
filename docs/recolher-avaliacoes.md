# Recolher avaliações reais

As avaliações são a maior alavanca de conversão deste negócio e a única coisa
que não se pode fabricar. Este documento existe para chegar a 20 ou 30
testemunhos reais em poucas semanas, a partir de clientes que o Ted já teve.

---

## Porque não se inventa

Avaliações inventadas publicadas com schema `Review` e `aggregateRating` são
motivo de **penalização manual do Google**, que remove o site dos resultados.
Em Portugal são também **ilegais** desde a transposição da Diretiva Omnibus
(DL 109-G/2021), com coimas aplicáveis ao negócio.

O site está construído para nunca deixar isso acontecer: o modo de
demonstração não emite dados estruturados e o build recusa-se a compilar com
ele ligado.

---

## O momento certo

Peça **no dia da festa ou no dia seguinte**, enquanto a memória e a gratidão
estão altas. Uma semana depois a taxa de resposta cai a pique.

Se tem clientes antigos, peça na mesma. Uma mensagem a lembrar a festa
específica funciona bem mesmo meses depois.

---

## Onde a avaliação deve cair

Duas, por esta ordem:

1. **Google**, que alimenta o perfil, o mapa e as respostas de IA
2. **Site**, em `src/content/reviews.json`, que alimenta as páginas e o schema

O ideal é pedir a do Google e, com autorização, reaproveitar o texto no site.

### Link direto para avaliar

Depois de o perfil estar verificado, o Google dá um link curto em
**Perfil de Empresa → Pedir avaliações**. Fica com esta forma:

```
https://g.page/r/XXXXXXXXXXXX/review
```

Cole-o nas mensagens abaixo, no lugar de `LINK_GOOGLE`. Abre diretamente a
caixa das estrelas, sem o cliente ter de procurar.

---

## Mensagens para enviar

### Logo a seguir à festa, em português

> Olá {nome}! Foi um gosto animar a festa do/a {nome da criança} ontem.
> Se tiver dois minutos, deixava-me uma avaliação no Google? Para quem
> trabalha por conta própria faz mesmo diferença, e ajuda outros pais a
> decidir.
>
> É aqui: LINK_GOOGLE
>
> Obrigado por me terem recebido tão bem!

### Logo a seguir à festa, em inglês

> Hi {name}! It was a pleasure running {child}'s party yesterday.
> If you have two minutes, would you leave me a review on Google? It genuinely
> makes a difference for someone working on their own, and it helps other
> parents decide.
>
> Here it is: LINK_GOOGLE
>
> Thank you for having me!

### Para clientes antigos, em português

> Olá {nome}! Espero que esteja tudo bem.
> Estou a organizar melhor o meu trabalho e as avaliações de quem já me
> contratou são a parte que mais ajuda quem está a decidir.
>
> Lembra-se da festa do/a {nome da criança}, em {mês}? Se puder deixar duas
> linhas sobre como correu, agradecia muito: LINK_GOOGLE

### Para hotéis e empresas

> Boa tarde {nome}. Depois da colaboração desta época, poderia deixar uma
> breve avaliação no perfil da Ted Animações? Para quem trabalha com hotéis,
> uma referência de outro profissional do setor tem muito peso.
>
> LINK_GOOGLE
>
> Fico disponível para a próxima época.

---

## O que faz uma avaliação converter

Não peça «uma avaliação» em abstrato. Sugira o que mencionar, e recebe
testemunhos muito mais úteis:

- **Quantas crianças eram e que idades.** Dá escala e credibilidade.
- **Um momento concreto.** «A caça ao tesouro prendeu-os quase uma hora» vale
  mais do que «foi muito bom».
- **A preocupação que tinham antes.** «Tinha medo que os mais velhos se
  aborrecessem» responde à objeção de outro pai.
- **Onde foi.** Alimenta as páginas por localidade.

Basta acrescentar à mensagem: *«se puder dizer quantas crianças eram e o que
mais gostaram, ajuda imenso»*.

---

## Passar para o site

Editar `src/content/reviews.json`. O formato está em `reviews.example.json`.

```json
{
  "id": "cavaco-2026-05",
  "author": "Nome como a pessoa o escreveu",
  "rating": 5,
  "body": "O texto tal e qual, sem reescrever.",
  "location": "Albufeira",
  "context": "Festa de 7 anos",
  "date": "2026-05-18",
  "lang": "pt",
  "featured": true
}
```

Notas importantes:

- **Copiar o texto tal como foi escrito.** Testemunhos polidos soam a falso e
  convertem pior. Erros de pontuação são credibilidade.
- **`location`** tem de coincidir com o nome da localidade para a avaliação
  aparecer também na página dessa zona.
- **`featured: true`** faz aparecer na home e na página de orçamentos. Três a
  seis chegam.
- **`lang`** separa as versões portuguesa e inglesa do site.
- **Pedir autorização** antes de publicar no site uma avaliação que a pessoa
  escreveu noutro sítio.

Assim que houver a primeira entrada, ligam-se sozinhos os cartões, as
estrelas, a média, o schema `Review` e o `aggregateRating`.

---

## Meta

| Prazo | Objetivo |
| --- | --- |
| Semana 1 | Perfil do Google verificado e link de avaliação em mãos |
| Semana 2 e 3 | Mensagem a todos os clientes do último ano |
| Semana 4 | 15 a 20 avaliações no Google, 6 a 8 publicadas no site |
| Contínuo | Pedir a **todas** as festas, sem exceção |

Uma avaliação por festa, a partir de agora, resolve isto para sempre.
