# Ideias de Design — Ted Company (Animação Infantil Algarve)

## Contexto
Website para animação infantil no Algarve. Público: pais 28–45 anos com filhos 4–12 anos.
Objetivo: gerar contactos via WhatsApp. Tom: divertido, confiante, energético, profissional.

---

<response>
<probability>0.07</probability>
<idea>

**Design Movement:** Neo-Playful Maximalism — inspirado em Nickelodeon e festas premium dos anos 2000, mas com acabamento moderno.

**Core Principles:**
- Cores saturadas e contrastantes que transmitem energia e alegria
- Tipografia expressiva com hierarquia clara e impacto visual
- Layout assimétrico com elementos sobrepostos e rotacionados levemente
- Personagens e ícones ilustrativos integrados no layout

**Color Philosophy:**
- Azul vibrante (#1A73E8) como cor primária — transmite confiança e energia
- Amarelo solar (#FFD600) como acento — alegria e atenção
- Rosa suave (#FF6B9D) como secundário — diversão e afeto
- Branco puro como base — limpeza e legibilidade
- Gradientes de azul para roxo em secções de destaque

**Layout Paradigm:**
- Hero com título em diagonal visual (texto inclinado levemente)
- Cards de atividades com rotação aleatória leve (-2deg a +2deg)
- Secções alternando fundo branco e fundo colorido
- Elementos decorativos (estrelas, confetti, bolhas) como SVG animados

**Signature Elements:**
- Confetti animado em SVG flutuando no hero
- Cards com sombra colorida (box-shadow colorida em vez de cinza)
- Botões com efeito "bounce" ao hover

**Interaction Philosophy:**
- Animações de entrada com slide-up ao fazer scroll
- Botão WhatsApp com pulsar contínuo
- Cards de atividades com flip 3D ao hover

**Animation:**
- Confetti em loop suave no hero
- Elementos entram com spring animation (framer-motion)
- Transições de secção com fade + translateY

**Typography System:**
- Display: Baloo 2 (bold, 700–800) — títulos grandes e expressivos
- Body: Nunito (400–600) — texto de leitura confortável e amigável
- Accent: Nunito (700) — subtítulos e labels

</idea>
</response>

<response>
<probability>0.06</probability>
<idea>

**Design Movement:** Warm Editorial Playfulness — estética de revista infantil premium com toque editorial.

**Core Principles:**
- Composições assimétricas com fotos em molduras irregulares
- Tipografia grande e expressiva como elemento visual principal
- Paleta quente e acolhedora que transmite segurança aos pais
- Espaço em branco generoso para respirar entre elementos

**Color Philosophy:**
- Coral quente (#FF6B4A) como primário — energia e entusiasmo
- Azul céu (#4ECDC4) como complementar — frescura e confiança
- Amarelo mel (#FFB347) como acento — calor e alegria
- Creme (#FFF8F0) como fundo — acolhimento e suavidade

**Layout Paradigm:**
- Bento grid na secção de atividades
- Hero com texto à esquerda e imagem em forma orgânica à direita
- Timeline visual para o processo "Como funciona"
- Galeria em mosaico irregular

**Signature Elements:**
- Formas orgânicas (blob shapes) como backgrounds de secção
- Molduras de fotos com bordas irregulares
- Numeração grande e decorativa nas etapas do processo

**Interaction Philosophy:**
- Parallax suave no hero
- Cards com elevação ao hover
- Scroll-triggered animations progressivas

**Animation:**
- Blobs com animação morph suave
- Números das etapas contam de 0 até ao valor ao entrar no viewport
- Imagens da galeria aparecem com stagger

**Typography System:**
- Display: Baloo 2 (800) — impacto máximo nos títulos
- Body: Poppins (400–500) — moderno e legível
- Labels: Poppins (600) — destaque sem agressividade

</idea>
</response>

<response>
<probability>0.05</probability>
<idea>

**Design Movement:** Vibrant Carnival Minimalism — minimalismo com explosões de cor estratégicas, como cartazes de festival.

**Core Principles:**
- Contraste extremo entre secções escuras e claras
- Tipografia ultra-bold como elemento visual dominante
- Cor usada cirurgicamente para máximo impacto
- Layouts limpos com um único elemento de destaque por secção

**Color Philosophy:**
- Azul profundo (#0A2463) como base escura — profissionalismo e confiança
- Amarelo néon (#FFE600) como acento explosivo — energia e atenção
- Branco puro (#FFFFFF) para contraste máximo
- Rosa vibrante (#FF3CAC) para momentos de celebração

**Layout Paradigm:**
- Hero de ecrã completo com tipografia gigante
- Secções alternando fundo escuro e claro em full-width
- Atividades em lista horizontal com scroll
- CTA em bloco de cor sólida e impactante

**Signature Elements:**
- Tipografia gigante como elemento decorativo de fundo
- Linhas diagonais como separadores de secção
- Ícones em estilo outline bold

**Interaction Philosophy:**
- Cursor personalizado com efeito trail
- Hover com inversão de cor (color invert)
- Transições de página com wipe effect

**Animation:**
- Títulos entram letra a letra
- Secções com clip-path reveal ao scroll
- Botão WhatsApp com efeito ripple

**Typography System:**
- Display: Baloo 2 (900) — máximo impacto
- Body: Nunito (400) — contraste com o display
- Accent: Poppins (700) — CTAs e labels

</idea>
</response>

---

## Decisão Final

**Escolhido: Resposta 1 — Neo-Playful Maximalism**

Justificação: O público-alvo (pais com filhos 4–12 anos, festas de aniversário) responde melhor a uma estética vibrante, colorida e energética que transmite diversão imediata. O layout assimétrico com elementos decorativos animados cria uma experiência emocional que diferencia o Ted da concorrência, enquanto a tipografia Baloo 2 + Nunito garante legibilidade e profissionalismo.
