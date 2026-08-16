# Perfil de Empresa no Google

É a ação mais rentável de toda a auditoria, e é gratuita. Para pesquisas
locais («animador infantil perto de mim», «festa aniversário Albufeira») o
perfil aparece acima dos resultados normais, e é também uma das fontes que o
ChatGPT e o Perplexity consultam para negócios locais.

Criar em <https://business.google.com>.

---

## Regra que não se quebra

Nome, telefone e área de atuação têm de ficar **exatamente iguais** aos do
site. Qualquer divergência faz os motores tratarem o Ted como várias
entidades pouco fiáveis em vez de uma sólida. É por isso que estes dados
saem todos de `src/lib/site.ts`.

---

## 1. Dados de identificação

| Campo | Valor a introduzir |
| --- | --- |
| Nome da empresa | `Ted Animações` |
| Telefone | `+351 936 331 843` |
| Website | `https://tedinportugal.pt` |
| Link de marcação | o link de WhatsApp (ver secção 6) |

**Não** acrescentar palavras-chave ao nome. «Ted Animações Algarve Festas
Infantis» é motivo de suspensão do perfil.

---

## 2. Tipo de negócio: prestador com área de serviço

Este é o passo que mais gente erra.

Quando o Google perguntar se os clientes se deslocam ao seu endereço,
responda **não**. O Ted vai ter com os clientes, logo é um *service-area
business*. A morada é usada só para verificação e fica **oculta** no perfil.

Se marcar como estabelecimento físico, o perfil passa a mostrar a morada de
casa e a concorrer em pesquisas erradas.

**Áreas a adicionar** (as mesmas do site):

```
Faro · Albufeira · Loulé · Lagos · Portimão
Vilamoura · Quarteira · Olhão · Tavira · Silves
```

---

## 3. Categorias

| | Categoria |
| --- | --- |
| Principal | **Serviço de festas para crianças** (*Children's party service*) |
| Secundária | Animador (*Entertainer*) |
| Secundária | Organizador de eventos (*Event planner*) |

A principal é a que mais pesa. Não a troque depois de o perfil ganhar
avaliações.

---

## 4. Descrição

Máximo 750 caracteres. Esta versão está dentro do limite e usa a mesma
linguagem do site, o que reforça a consistência de entidade.

```
Animação infantil e festas de aniversário em todo o Algarve, em português
e inglês.

Levo jogos de grupo, caça ao tesouro, pintura facial e oficinas criativas,
com o programa preparado à medida das idades do grupo e do espaço da festa.
Todo o material vai incluído e trato da montagem e da arrumação.

Trabalho em casas, jardins, villas de aluguer, salões e espaços de eventos,
e também com hotéis, resorts e organizadores de eventos, em regime pontual
ou de época.

Enquanto as crianças estão entretidas, os pais podem finalmente aproveitar
a festa.

Peça orçamento por WhatsApp e respondo no próprio dia.
```

---

## 5. Serviços

Adicionar um a um, com os mesmos nomes das páginas do site:

- Festas de aniversário infantis
- Caça ao tesouro
- Pintura facial
- Oficina de pulseiras
- Jogos e desafios de grupo
- Animação infantil para hotéis
- Animação para eventos e casamentos

---

## 6. Link de marcação

Colar no campo de agendamento:

```
https://wa.me/351936331843?text=Ol%C3%A1%20Ted!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento%20para%20uma%20festa%20de%20anivers%C3%A1rio.
```

Abre o WhatsApp com a mensagem já escrita, tal como no site.

---

## 7. Horário

Como não é um estabelecimento, o horário serve para indicar quando responde,
não quando «abre». Sugestão realista:

```
Segunda a sexta   09:00 às 20:00
Sábado            09:00 às 20:00
Domingo           encerrado (ou o horário real)
```

Se costuma trabalhar ao domingo, indique. Um horário falso gera reclamações.

---

## 8. Fotografias

O perfil com fotografias recebe várias vezes mais pedidos de contacto.
Use as mesmas do site, que estão em `src/assets/photos/`:

| Tipo | Ficheiro sugerido |
| --- | --- |
| Logótipo | `src/assets/ted-logo.png` |
| Capa | `hero-festa-aniversario.jpg` |
| Equipa | `ted-retrato.jpg`, `ted-com-criancas.jpg` |
| Trabalho | `criancas-em-roda.jpg`, `pintura-facial.jpg`, `pulseiras-com-criancas.jpg`, `caca-ao-tesouro.jpg`, `ted-mesa-atividades.jpg` |

Carregue pelo menos 10 e acrescente novas depois de cada festa. Perfis com
fotografias recentes têm melhor desempenho.

---

## 9. Perguntas e respostas

Pouca gente sabe que o próprio dono pode publicar perguntas e respondê-las.
Faça-o: é conteúdo indexado e responde a objeções antes do contacto.

Publicar estas quatro, e responder a cada uma:

1. **Quanto custa uma festa com animação?**
   Não há tabela fixa. O valor depende da duração, do número de crianças, das
   atividades e da distância. Envie a data e a zona por WhatsApp e recebe um
   orçamento fechado no próprio dia.

2. **A animação pode ser em inglês?**
   Sim. Faço festas em português, em inglês ou nas duas línguas ao mesmo
   tempo, que é o mais comum no Algarve.

3. **E se chover?**
   Todas as atividades têm versão de interior preparada. A festa acontece na
   mesma.

4. **Vai a villas de aluguer e hotéis?**
   Vou, e é uma parte grande do trabalho de verão. Se o espaço tiver regras
   para prestadores externos, trato disso diretamente com eles.

---

## 10. Depois de verificado

- [ ] Copiar o URL do perfil para `googleBusinessUrl` em `src/lib/site.ts`
- [ ] Recompilar e publicar, o `sameAs` do JSON-LD passa a apontar para lá
- [ ] Publicar uma novidade por mês (fotografia de uma festa recente chega)
- [ ] Responder a **todas** as avaliações, incluindo as boas
- [ ] Criar também o **Bing Places**, que alimenta o Copilot
