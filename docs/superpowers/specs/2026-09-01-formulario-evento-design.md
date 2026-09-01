# Formulário de evento — design

## Objetivo

Substituir o Google Forms por uma experiência própria em `https://tedinportugal.pt/formulario/`, coerente com o visual do Ted Animações e confortável no telemóvel. O formulário recolhe um briefing de evento sem apresentar mais de vinte perguntas ao mesmo tempo.

## Escopo desta fase

- Criar a página pública `/formulario/` em português.
- Organizar o briefing em cinco etapas curtas.
- Validar os campos essenciais antes de avançar e antes de enviar.
- Mostrar um resumo editável antes do envio.
- Enviar os dados para `PUBLIC_FORM_ENDPOINT` quando o endpoint de email estiver configurado.
- Manter o fallback atual para WhatsApp quando não existir endpoint, para nunca perder um pedido.
- Substituir o formulário curto da página Contactos por um botão para `/formulario/`.
- Preservar WhatsApp e email como opções rápidas na página Contactos.

Não fazem parte desta fase: Google Forms, Google Sheets, área administrativa, autenticação, base de dados, PDF, DOCX, CSV ou integração com CRM. A estrutura dos nomes dos campos será estável para permitir essas integrações posteriormente.

## Fluxo

### Etapa 1 — O seu contacto

- Nome, obrigatório.
- WhatsApp, obrigatório.
- Email, obrigatório e validado pelo navegador.

### Etapa 2 — O evento

- Tipo de evento, obrigatório: aniversário, batizado, casamento, comunhão, festa familiar, empresa, escola, hotel ou outro.
- Data, obrigatória.
- Horário aproximado, obrigatório.
- Zona/localidade, obrigatória.
- Número aproximado de convidados, opcional.
- Breve descrição, opcional.

### Etapa 3 — As crianças

- Existência de crianças: sim, não ou ainda não sabe, obrigatório.
- Se a resposta for “sim” ou “ainda não sei”, mostrar quantidade, idades e nome/aniversário da criança.
- Quantidade e idades são obrigatórias apenas quando a resposta for “sim”.
- Informações importantes sobre necessidades, sensibilidades ou dinâmica do grupo são opcionais.

### Etapa 4 — A experiência

- Atividades em escolha múltipla: jogos, balões, pintura facial, bolhas, slime, pulseiras, caça ao tesouro, atividades tranquilas e “quero sugestões”.
- Experiência pretendida em escolha única.
- Tema/personagem, atividade indispensável, atividade a evitar, tipo de espaço e detalhes do espaço são opcionais.
- Origem do contacto é opcional e aceita várias escolhas.

### Etapa 5 — Rever e enviar

- Mostrar os dados agrupados por contacto, evento, crianças e experiência.
- Disponibilizar botões para regressar e editar.
- Exigir aceitação da política de privacidade antes do envio.
- Após sucesso, substituir o formulário por uma confirmação simples e indicar que a equipa responderá no próprio dia.

## Interface visual

- Usar as cores, tipografia, cartões, botões e raios já existentes no site.
- Barra de progresso com cinco passos e rótulo textual “Passo N de 5”.
- Um cartão central, com largura confortável e sem aparência de formulário corporativo genérico.
- Opções apresentadas como cartões clicáveis, com área de toque grande.
- Sem fotografias pesadas nesta página; pequenas decorações SVG existentes são suficientes.
- Em telemóvel, todos os campos e botões ocupam a largura disponível.
- Respeitar `prefers-reduced-motion` e não depender de animação para compreensão.

## Dados e envio

O componente usa nomes de campo em português sem espaços (`nome`, `whatsapp`, `email`, `tipo_evento`, `data_evento`, etc.). Atividades e origem são listas. O resumo para WhatsApp e o `FormData` enviado ao endpoint usam a mesma nomenclatura visível.

O projeto atualmente não possui `PUBLIC_FORM_ENDPOINT` configurado no Vercel. Portanto, a publicação inicial usa o fallback para WhatsApp. Assim que um endpoint de email for fornecido, basta configurar a variável; nenhuma alteração visual ou estrutural será necessária.

## Validação e segurança

- Validação por etapa usa os atributos nativos `required`, `type`, `min` e `max`.
- A primeira entrada inválida recebe foco e a etapa não avança.
- Um campo honeypot oculto descarta submissões automatizadas simples.
- O botão de envio fica desativado durante o pedido para impedir duplicações.
- Mensagens de erro e sucesso usam uma região `aria-live`.
- Nenhum dado pessoal é guardado no navegador após envio.

## SEO e navegação

- Página canónica: `https://tedinportugal.pt/formulario/`.
- Título curto e descrição orientada ao pedido de evento.
- Um único H1.
- A página entra automaticamente no sitemap do Astro.
- A página Contactos aponta para o formulário com um botão claro; nenhuma URL existente é removida.

## Critérios de aceitação

- `/formulario/` gera HTML estático e responde HTTP 200.
- É possível percorrer as cinco etapas apenas com teclado.
- Campos condicionais aparecem e desaparecem corretamente.
- Atividades permitem múltiplas escolhas.
- O resumo reflete os dados preenchidos.
- Com endpoint, o formulário envia `POST`; sem endpoint, abre WhatsApp com o briefing preenchido.
- Contactos contém o novo botão e não contém o formulário curto embutido.
- Build, verificações existentes, sitemap e rotas atuais continuam funcionais.
