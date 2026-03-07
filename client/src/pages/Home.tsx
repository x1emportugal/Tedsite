/*
 * TED COMPANY — Home Page
 * Estilo: Organic Playful (inspirado em mega-kids.pt)
 * Fundo creme #FAF0DC | Teal #2D7A6E | Amarelo #F5C842
 * Fontes: Baloo 2 (títulos) + Nunito (corpo)
 * Formas orgânicas SVG decorativas em cada secção
 */

import { useEffect, useRef, useState } from "react";

const WHATSAPP_URL = "https://wa.me/351936331843?text=Olá%20Ted!%20Gostaria%20de%20pedir%20um%20orçamento%20para%20uma%20festa%20de%20aniversário.";

// ── Imagens geradas ──────────────────────────────────────────
const IMG_HERO      = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/ted-hero-bg-kiuqVHoWDhc8fQ4ap5wU4o.webp";
const IMG_SLIME     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/ted-activities-PhWAmoFGekchjkUqDSXTXP.webp";
const IMG_TREASURE  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/ted-treasure-hunt-cN4P4wSBVmgacmHMnLnio8.webp";
const IMG_PORTRAIT  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/ted-portrait-8BRTq5XorsEiWQLfD9bkVu.webp";
const IMG_GAMES     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/ted-games-9gXPX77hwcPSYYaxZYF62g.webp";

// ── Scroll-reveal hook ───────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Decorative organic shapes ────────────────────────────────
function WiggleLine({ color = "#2D7A6E", className = "", style }: { color?: string; className?: string; style?: React.CSSProperties }) {
  return (
      <svg viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <path d="M10 60 C60 10, 120 80, 180 40 S280 10, 310 50" stroke={color} strokeWidth="10" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
function Circle({ color = "#F5C842", size = 60, className = "", style }: { color?: string; size?: number; className?: string; style?: React.CSSProperties }) {
  return (
      <svg width={size} height={size} viewBox="0 0 60 60" className={className} style={style}>
      <circle cx="30" cy="30" r="30" fill={color}/>
    </svg>
  );
}
function Blob({ color = "#2D7A6E", className = "", style }: { color?: string; className?: string; style?: React.CSSProperties }) {
  return (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <path fill={color} d="M42.7,-62.9C54.9,-53.7,63.7,-40.2,68.4,-25.4C73.1,-10.6,73.7,5.5,68.2,19.1C62.7,32.7,51.1,43.8,38.1,52.2C25.1,60.6,10.7,66.3,-4.2,68.1C-19.1,69.9,-34.4,67.8,-45.8,59.5C-57.2,51.2,-64.7,36.7,-68.2,21.1C-71.7,5.5,-71.2,-11.2,-64.5,-24.7C-57.8,-38.2,-44.9,-48.5,-31.5,-57.2C-18.1,-65.9,-4.2,-73,9.8,-72.6C23.8,-72.2,30.5,-72.1,42.7,-62.9Z" transform="translate(100 100)"/>
    </svg>
  );
}
function StarShape({ color = "#F5C842", className = "", style }: { color?: string; className?: string; style?: React.CSSProperties }) {
  return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <path fill={color} d="M50 5 L61 35 L95 35 L68 57 L79 91 L50 70 L21 91 L32 57 L5 35 L39 35 Z"/>
    </svg>
  );
}
function DotsGrid({ color = "#2D7A6E", className = "", style }: { color?: string; className?: string; style?: React.CSSProperties }) {
  return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      {[0,1,2,3].map(row => [0,1,2,3].map(col => (
        <circle key={`${row}-${col}`} cx={10 + col * 20} cy={10 + row * 20} r="4" fill={color} opacity="0.3"/>
      )))}
    </svg>
  );
}

// ── Navbar ───────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Início", href: "#inicio" },
    { label: "Sobre o Ted", href: "#sobre" },
    { label: "Atividades", href: "#atividades" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Galeria", href: "#galeria" },
    { label: "Contactos", href: "#contactos" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "#FAF0DC" : "transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(45,122,110,0.12)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2 no-underline">
          <div
            className="flex items-center justify-center"
            style={{
              width: "3rem", height: "3rem", borderRadius: "1rem",
              background: "#2D7A6E", border: "2.5px dashed #F5C842",
            }}
          >
            <span style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.1rem", color: "#FAF0DC" }}>T</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.1rem", color: "#1a2e2a", lineHeight: 1 }}>Ted Company</div>
            <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.7rem", color: "#2D7A6E", fontWeight: 600 }}>animação infantil</div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link text-sm">{l.label}</a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-sm" style={{ padding: "0.6rem 1.4rem" }}>
            <WhatsAppIcon size={18}/> Pedir orçamento
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span style={{ display:"block", width:"24px", height:"2.5px", background:"#1a2e2a", borderRadius:"2px", transition:"all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }}/>
          <span style={{ display:"block", width:"24px", height:"2.5px", background:"#1a2e2a", borderRadius:"2px", opacity: menuOpen ? 0 : 1, transition:"all 0.3s" }}/>
          <span style={{ display:"block", width:"24px", height:"2.5px", background:"#1a2e2a", borderRadius:"2px", transition:"all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}/>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background:"#FAF0DC", borderTop:"2px solid #E0D4B0", padding:"1rem 1.5rem 1.5rem" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="block py-2 nav-link text-base" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-4 w-full justify-center" onClick={() => setMenuOpen(false)}>
            <WhatsAppIcon size={20}/> Pedir orçamento no WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}

// ── WhatsApp Icon ────────────────────────────────────────────
function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// ── HERO ─────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#FAF0DC", paddingTop: "6rem" }}>
      {/* Decorative shapes */}
      <WiggleLine color="#2D7A6E" className="organic-deco animate-float-slow" style={{ width: "380px", top: "8%", right: "-60px", opacity: 0.7 }}/>
      <Circle color="#F5C842" size={90} className="organic-deco animate-float-med" style={{ top: "15%", right: "12%", opacity: 0.9 }}/>
      <Circle color="#2D7A6E" size={28} className="organic-deco animate-float-slow" style={{ bottom: "28%", left: "8%", opacity: 0.6 }}/>
      <Circle color="#F5C842" size={50} className="organic-deco animate-float-med" style={{ bottom: "12%", right: "22%", opacity: 0.7 }}/>
      <DotsGrid color="#2D7A6E" className="organic-deco" style={{ width: "100px", top: "20%", left: "5%", opacity: 0.4 }}/>
      <StarShape color="#F5C842" className="organic-deco animate-spin-slow" style={{ width: "50px", bottom: "20%", right: "6%", opacity: 0.6 }}/>
      <WiggleLine color="#7BC67E" className="organic-deco animate-float-slow" style={{ width: "220px", bottom: "5%", left: "15%", opacity: 0.5, transform: "rotate(180deg)" }}/>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div style={{ animation: "fade-up 0.8s ease-out forwards" }}>
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{ background: "#F5C842", borderRadius: "9999px", padding: "0.4rem 1.2rem", fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem", color: "#1a2e2a" }}
            >
              🎉 Animação Infantil no Algarve
            </div>
            <h1
              style={{
                fontFamily: "'Baloo 2',cursive",
                fontWeight: 800,
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                lineHeight: 1.1,
                color: "#1a2e2a",
                marginBottom: "1.5rem",
              }}
            >
              Festas de Aniversário{" "}
              <span style={{ color: "#2D7A6E" }}>Inesquecíveis</span>{" "}
              para Crianças
            </h1>
            <p
              style={{
                fontFamily: "'Nunito',sans-serif",
                fontSize: "1.15rem",
                color: "#3a5a54",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                maxWidth: "520px",
              }}
            >
              Jogos, oficinas criativas e aventuras que fazem os miúdos esquecerem o telemóvel e viverem momentos reais.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <WhatsAppIcon size={22}/> Pedir orçamento no WhatsApp
              </a>
              <a href="#atividades" className="btn-outline-teal">
                Ver atividades
              </a>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { icon: "⭐", text: "Centenas de festas" },
                { icon: "🎈", text: "Algarve & Portugal" },
                { icon: "🛡️", text: "Materiais seguros" },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-2">
                  <span style={{ fontSize: "1.3rem" }}>{b.icon}</span>
                  <span style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#3a5a54" }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative" style={{ animation: "scale-in 0.9s ease-out forwards" }}>
            <div
              style={{
                borderRadius: "40% 60% 55% 45% / 45% 40% 60% 55%",
                overflow: "hidden",
                aspectRatio: "4/3",
                boxShadow: "0 20px 60px rgba(45,122,110,0.25)",
                border: "6px solid #F5C842",
              }}
            >
              <img src={IMG_HERO} alt="Festa de aniversário com animação infantil no Algarve" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
            {/* Floating badge */}
            <div
              style={{
                position: "absolute", bottom: "-1.5rem", left: "-1rem",
                background: "#2D7A6E", color: "#FAF0DC",
                borderRadius: "1.5rem", padding: "1rem 1.5rem",
                fontFamily: "'Baloo 2',cursive", fontWeight: 800,
                boxShadow: "0 8px 24px rgba(45,122,110,0.35)",
                animation: "float-med 4s ease-in-out infinite",
              }}
            >
              <div style={{ fontSize: "1.8rem", lineHeight: 1 }}>🎂</div>
              <div style={{ fontSize: "0.85rem", marginTop: "0.2rem" }}>Festa personalizada</div>
            </div>
            <div
              style={{
                position: "absolute", top: "-1rem", right: "-1rem",
                background: "#F5C842", color: "#1a2e2a",
                borderRadius: "1.5rem", padding: "0.8rem 1.2rem",
                fontFamily: "'Baloo 2',cursive", fontWeight: 800,
                boxShadow: "0 8px 24px rgba(245,200,66,0.4)",
                animation: "float-slow 5s ease-in-out infinite",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.5rem", lineHeight: 1 }}>🎉</div>
              <div style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>100% diversão</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "60px" }}>
          <path fill="#F0E4C4" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}

// ── SOBRE O TED ──────────────────────────────────────────────
function SobreSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="sobre" style={{ background: "#F0E4C4", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
      <Blob color="#2D7A6E" className="organic-deco" style={{ width: "300px", top: "-80px", right: "-80px", opacity: 0.08 }}/>
      <Circle color="#F5C842" size={70} className="organic-deco animate-float-slow" style={{ bottom: "10%", left: "3%", opacity: 0.6 }}/>
      <DotsGrid color="#2D7A6E" className="organic-deco" style={{ width: "80px", top: "20%", right: "5%", opacity: 0.3 }}/>

      <div className="container">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 items-center"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: "all 0.8s ease-out" }}
        >
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div
              style={{
                borderRadius: "50% 50% 40% 60% / 40% 50% 50% 60%",
                overflow: "hidden",
                aspectRatio: "3/4",
                maxWidth: "420px",
                margin: "0 auto",
                boxShadow: "0 20px 60px rgba(45,122,110,0.2)",
                border: "5px solid #2D7A6E",
              }}
            >
              <img src={IMG_PORTRAIT} alt="Ted — animador infantil no Algarve" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
            <div
              style={{
                position: "absolute", bottom: "2rem", right: "0",
                background: "#F5C842", borderRadius: "1.5rem",
                padding: "1rem 1.5rem",
                fontFamily: "'Baloo 2',cursive", fontWeight: 800,
                color: "#1a2e2a",
                boxShadow: "0 8px 24px rgba(245,200,66,0.4)",
              }}
            >
              <div style={{ fontSize: "2rem", lineHeight: 1 }}>🏨</div>
              <div style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>Hotéis & Eventos</div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div
              style={{
                display: "inline-block", background: "#2D7A6E", color: "#FAF0DC",
                borderRadius: "9999px", padding: "0.35rem 1.1rem",
                fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem",
                marginBottom: "1.2rem",
              }}
            >
              Quem está por trás da diversão?
            </div>
            <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#1a2e2a", lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Olá! Eu sou o <span style={{ color: "#2D7A6E" }}>Ted</span> 👋
            </h2>
            <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1.05rem", color: "#3a5a54", lineHeight: 1.8, marginBottom: "1.2rem" }}>
              Sou um animador infantil apaixonado por criar experiências inesquecíveis para crianças e tranquilidade para os pais.
            </p>
            <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1.05rem", color: "#3a5a54", lineHeight: 1.8, marginBottom: "1.2rem" }}>
              Com experiência em hotéis e festas privadas no Algarve, cada evento é preparado com energia, criatividade e organização.
            </p>
            <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1.05rem", color: "#3a5a54", lineHeight: 1.8, marginBottom: "2rem" }}>
              Enquanto as crianças vivem aventuras cheias de jogos e desafios, os pais podem <strong>relaxar e aproveitar a festa</strong>.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-teal">
              <WhatsAppIcon size={20}/> Falar com o Ted
            </a>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "60px" }}>
          <path fill="#FAF0DC" d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}

// ── ATIVIDADES ───────────────────────────────────────────────
const ACTIVITIES = [
  {
    emoji: "🗺️",
    title: "Caça ao Tesouro",
    desc: "Uma aventura cheia de pistas, desafios e mistérios escondidos pelo espaço da festa.",
    color: "#2D7A6E",
    img: IMG_TREASURE,
  },
  {
    emoji: "🧪",
    title: "Oficina de Slime",
    desc: "Uma atividade divertida e sensorial onde as crianças criam o seu próprio slime para levar para casa.",
    color: "#F5C842",
    img: IMG_SLIME,
  },
  {
    emoji: "📿",
    title: "Pulseiras Criativas",
    desc: "Oficina onde cada criança cria uma pulseira personalizada para recordar a festa.",
    color: "#7BC67E",
    img: null,
  },
  {
    emoji: "🏃",
    title: "Jogos e Desafios",
    desc: "Estafetas, jogos em equipa, desafios e muita energia para toda a turma.",
    color: "#E8845A",
    img: IMG_GAMES,
  },
];

const EXTRAS = [
  { emoji: "🎨", label: "Pintura Facial" },
  { emoji: "🎈", label: "Modelagem de Balões" },
  { emoji: "🫧", label: "Bolhas de Sabão" },
  { emoji: "💃", label: "Dança" },
  { emoji: "🎮", label: "Jogos de Grupo" },
];

function AtividadesSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="atividades" style={{ background: "#FAF0DC", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
      <WiggleLine color="#F5C842" className="organic-deco animate-float-slow" style={{ width: "280px", top: "5%", left: "-40px", opacity: 0.5 }}/>
      <Circle color="#2D7A6E" size={55} className="organic-deco animate-float-med" style={{ top: "10%", right: "4%", opacity: 0.5 }}/>
      <StarShape color="#F5C842" className="organic-deco animate-spin-slow" style={{ width: "45px", bottom: "15%", left: "5%", opacity: 0.5 }}/>

      <div className="container">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-14"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.7s ease-out" }}
        >
          <div
            style={{
              display: "inline-block", background: "#F5C842", color: "#1a2e2a",
              borderRadius: "9999px", padding: "0.35rem 1.1rem",
              fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem",
              marginBottom: "1rem",
            }}
          >
            O que fazemos nas festas
          </div>
          <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#1a2e2a", lineHeight: 1.15 }}>
            Atividades que as crianças <span style={{ color: "#2D7A6E" }}>adoram</span>
          </h2>
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1.05rem", color: "#3a5a54", marginTop: "1rem", maxWidth: "560px", margin: "1rem auto 0" }}>
            Cada atividade é pensada para a idade das crianças e o tipo de festa — sempre com energia, segurança e muita diversão.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ACTIVITIES.map((act, i) => (
            <div
              key={act.title}
              className="activity-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(32px)",
                transition: `all 0.7s ease-out ${i * 0.12}s`,
              }}
            >
              {act.img ? (
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <img src={act.img} alt={act.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
              ) : (
                <div style={{ height: "180px", background: act.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "5rem" }}>{act.emoji}</span>
                </div>
              )}
              <div style={{ padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: "1.4rem" }}>{act.emoji}</span>
                  <h3 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.1rem", color: "#1a2e2a" }}>{act.title}</h3>
                </div>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.9rem", color: "#3a5a54", lineHeight: 1.6 }}>{act.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Extras */}
        <div
          style={{
            background: "#2D7A6E", borderRadius: "2rem", padding: "2rem 2.5rem",
            opacity: visible ? 1 : 0, transition: "all 0.8s ease-out 0.5s",
          }}
        >
          <p style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "1rem", color: "#FAF0DC", marginBottom: "1rem", textAlign: "center" }}>
            ✨ Extras possíveis — personalize ainda mais a festa!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {EXTRAS.map(e => (
              <div
                key={e.label}
                style={{
                  background: "rgba(250,240,220,0.15)", borderRadius: "9999px",
                  padding: "0.5rem 1.2rem", display: "flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#FAF0DC",
                  border: "1.5px solid rgba(250,240,220,0.3)",
                }}
              >
                <span>{e.emoji}</span> {e.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "60px" }}>
          <path fill="#F0E4C4" d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}

// ── COMO FUNCIONA ────────────────────────────────────────────
const STEPS = [
  { num: "1", emoji: "💬", title: "Fale connosco no WhatsApp", desc: "Envie uma mensagem e diga-nos quando é a festa." },
  { num: "2", emoji: "🎂", title: "Explique como será a festa", desc: "Número de crianças, idades, local e tipo de evento." },
  { num: "3", emoji: "🎉", title: "Animação personalizada", desc: "Criamos um programa à medida para as crianças." },
];

function ComoFuncionaSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="como-funciona" style={{ background: "#F0E4C4", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
      <Blob color="#F5C842" className="organic-deco" style={{ width: "250px", bottom: "-60px", right: "-60px", opacity: 0.15 }}/>
      <Circle color="#2D7A6E" size={45} className="organic-deco animate-float-slow" style={{ top: "8%", right: "8%", opacity: 0.4 }}/>

      <div className="container">
        <div
          ref={ref}
          className="text-center mb-14"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.7s ease-out" }}
        >
          <div
            style={{
              display: "inline-block", background: "#2D7A6E", color: "#FAF0DC",
              borderRadius: "9999px", padding: "0.35rem 1.1rem",
              fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem",
              marginBottom: "1rem",
            }}
          >
            Festa de Aniversário com o Ted
          </div>
          <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#1a2e2a", lineHeight: 1.15 }}>
            Como <span style={{ color: "#2D7A6E" }}>funciona</span>?
          </h2>
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1.05rem", color: "#3a5a54", marginTop: "1rem" }}>
            Simples, rápido e totalmente personalizado para a sua família.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{
                background: "#fff", borderRadius: "2rem", padding: "2.5rem 2rem",
                textAlign: "center", boxShadow: "0 4px 24px rgba(45,122,110,0.10)",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(32px)",
                transition: `all 0.7s ease-out ${i * 0.15}s`,
                position: "relative",
              }}
            >
              <div className="step-circle mx-auto mb-4">{step.num}</div>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{step.emoji}</div>
              <h3 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.15rem", color: "#1a2e2a", marginBottom: "0.75rem" }}>{step.title}</h3>
              <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.95rem", color: "#3a5a54", lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1rem", color: "#3a5a54", marginBottom: "1.5rem", fontStyle: "italic" }}>
            Cada festa é adaptada ao número de crianças, idade e tipo de espaço.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <WhatsAppIcon size={22}/> Começar agora no WhatsApp
          </a>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "60px" }}>
          <path fill="#FAF0DC" d="M0,20 C480,60 960,0 1440,40 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}

// ── GALERIA ──────────────────────────────────────────────────
function GaleriaSection() {
  const { ref, visible } = useReveal();
  const photos = [
    { src: IMG_HERO,      alt: "Festa de aniversário com animação no Algarve" },
    { src: IMG_SLIME,     alt: "Oficina de slime — crianças a criar slime colorido" },
    { src: IMG_TREASURE,  alt: "Caça ao tesouro no jardim" },
    { src: IMG_PORTRAIT,  alt: "Ted com crianças na festa" },
    { src: IMG_GAMES,     alt: "Jogos em equipa no Algarve" },
  ];

  return (
    <section id="galeria" style={{ background: "#FAF0DC", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
      <WiggleLine color="#2D7A6E" className="organic-deco animate-float-slow" style={{ width: "220px", top: "5%", right: "2%", opacity: 0.4 }}/>
      <Circle color="#F5C842" size={65} className="organic-deco animate-float-med" style={{ bottom: "8%", left: "3%", opacity: 0.5 }}/>

      <div className="container">
        <div
          ref={ref}
          className="text-center mb-12"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.7s ease-out" }}
        >
          <div
            style={{
              display: "inline-block", background: "#F5C842", color: "#1a2e2a",
              borderRadius: "9999px", padding: "0.35rem 1.1rem",
              fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem",
              marginBottom: "1rem",
            }}
          >
            Momentos reais
          </div>
          <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#1a2e2a", lineHeight: 1.15 }}>
            Galeria de <span style={{ color: "#2D7A6E" }}>festas</span>
          </h2>
        </div>

        {/* Mosaic grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "auto",
            gap: "1rem",
            opacity: visible ? 1 : 0,
            transition: "all 0.8s ease-out 0.2s",
          }}
        >
          {/* Large left */}
          <div style={{ gridColumn: "1 / 8", gridRow: "1 / 3", borderRadius: "2rem", overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={photos[0].src} alt={photos[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
          {/* Top right */}
          <div style={{ gridColumn: "8 / 13", gridRow: "1 / 2", borderRadius: "2rem", overflow: "hidden", aspectRatio: "16/9" }}>
            <img src={photos[1].src} alt={photos[1].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
          {/* Bottom right */}
          <div style={{ gridColumn: "8 / 13", gridRow: "2 / 3", borderRadius: "2rem", overflow: "hidden", aspectRatio: "16/9" }}>
            <img src={photos[2].src} alt={photos[2].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
          {/* Bottom left */}
          <div style={{ gridColumn: "1 / 7", gridRow: "3 / 4", borderRadius: "2rem", overflow: "hidden", aspectRatio: "16/9" }}>
            <img src={photos[3].src} alt={photos[3].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
          {/* Bottom right 2 */}
          <div style={{ gridColumn: "7 / 13", gridRow: "3 / 4", borderRadius: "2rem", overflow: "hidden", aspectRatio: "16/9" }}>
            <img src={photos[4].src} alt={photos[4].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        </div>

        {/* Mobile grid fallback */}
        <div className="grid grid-cols-2 gap-4 mt-4 md:hidden">
          {photos.map((p, i) => (
            <div key={i} style={{ borderRadius: "1.5rem", overflow: "hidden", aspectRatio: "4/3", gridColumn: i === 0 ? "1 / 3" : "auto" }}>
              <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "60px" }}>
          <path fill="#2D7A6E" d="M0,30 C360,0 1080,60 1440,20 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}

// ── PORQUÊ ESCOLHER TED ──────────────────────────────────────
const WHY_ITEMS = [
  { emoji: "🏆", title: "Experiência comprovada", desc: "Centenas de festas realizadas com crianças de todas as idades." },
  { emoji: "🎨", title: "Atividades criativas", desc: "Jogos educativos e criativos que estimulam a imaginação." },
  { emoji: "🛡️", title: "Materiais seguros", desc: "Todos os materiais são seguros e não tóxicos para crianças." },
  { emoji: "⚡", title: "Energia e organização", desc: "Animação energética com total organização e profissionalismo." },
  { emoji: "😌", title: "Pais tranquilos", desc: "Os pais podem relaxar e aproveitar a festa sem preocupações." },
  { emoji: "🎯", title: "100% personalizado", desc: "Cada festa é adaptada à família, idades e tipo de evento." },
];

function PorqueEscolherSection() {
  const { ref, visible } = useReveal();
  return (
    <section style={{ background: "#2D7A6E", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
      <Blob color="#FAF0DC" className="organic-deco" style={{ width: "350px", top: "-100px", left: "-100px", opacity: 0.05 }}/>
      <Circle color="#F5C842" size={80} className="organic-deco animate-float-slow" style={{ top: "10%", right: "5%", opacity: 0.3 }}/>
      <WiggleLine color="#FAF0DC" className="organic-deco animate-float-med" style={{ width: "260px", bottom: "5%", right: "10%", opacity: 0.15 }}/>

      <div className="container">
        <div
          ref={ref}
          className="text-center mb-14"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.7s ease-out" }}
        >
          <div
            style={{
              display: "inline-block", background: "#F5C842", color: "#1a2e2a",
              borderRadius: "9999px", padding: "0.35rem 1.1rem",
              fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem",
              marginBottom: "1rem",
            }}
          >
            Porque escolher Ted
          </div>
          <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#FAF0DC", lineHeight: 1.15 }}>
            O que nos torna <span style={{ color: "#F5C842" }}>especiais</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="why-badge"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(32px)",
                transition: `all 0.7s ease-out ${i * 0.1}s`,
              }}
            >
              <div className="why-badge-icon">
                <span style={{ fontSize: "1.4rem" }}>{item.emoji}</span>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1rem", color: "#1a2e2a", marginBottom: "0.3rem" }}>{item.title}</h3>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.9rem", color: "#3a5a54", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "60px" }}>
          <path fill="#F0E4C4" d="M0,40 C480,0 960,60 1440,20 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────────
function CTASection() {
  const { ref, visible } = useReveal();
  return (
    <section style={{ background: "#F0E4C4", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
      <Circle color="#F5C842" size={100} className="organic-deco animate-float-slow" style={{ top: "-20px", left: "-20px", opacity: 0.4 }}/>
      <Circle color="#2D7A6E" size={60} className="organic-deco animate-float-med" style={{ bottom: "10%", right: "5%", opacity: 0.3 }}/>
      <StarShape color="#2D7A6E" className="organic-deco animate-spin-slow" style={{ width: "55px", top: "15%", right: "12%", opacity: 0.3 }}/>

      <div className="container">
        <div
          ref={ref}
          className="text-center"
          style={{
            maxWidth: "700px", margin: "0 auto",
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: "all 0.8s ease-out",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎂</div>
          <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#1a2e2a", lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Vamos criar a melhor festa para o seu filho?
          </h2>
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1.1rem", color: "#3a5a54", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Conte-nos um pouco sobre a festa e vamos preparar uma animação perfeita para as crianças.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
            <WhatsAppIcon size={24}/> Pedir orçamento no WhatsApp
          </a>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "60px" }}>
          <path fill="#1a2e2a" d="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}

// ── CONTACTOS / FOOTER ───────────────────────────────────────
function ContactosSection() {
  return (
    <section id="contactos" style={{ background: "#1a2e2a", paddingTop: "5rem", paddingBottom: "3rem", position: "relative", overflow: "hidden" }}>
      <Blob color="#2D7A6E" className="organic-deco" style={{ width: "300px", top: "-80px", right: "-60px", opacity: 0.1 }}/>
      <Circle color="#F5C842" size={50} className="organic-deco animate-float-slow" style={{ bottom: "20%", left: "5%", opacity: 0.2 }}/>

      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  width: "3.5rem", height: "3.5rem", borderRadius: "1.2rem",
                  background: "#2D7A6E", border: "2.5px dashed #F5C842",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <span style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.3rem", color: "#FAF0DC" }}>T</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.2rem", color: "#FAF0DC" }}>Ted Company</div>
                <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.75rem", color: "#7BC67E", fontWeight: 600 }}>animação infantil</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.95rem", color: "#a0b8b4", lineHeight: 1.7 }}>
              Animação infantil profissional no Algarve. Festas de aniversário inesquecíveis para crianças dos 4 aos 12 anos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "1rem", color: "#FAF0DC", marginBottom: "1.2rem" }}>Navegação</h3>
            {[
              { label: "Início", href: "#inicio" },
              { label: "Sobre o Ted", href: "#sobre" },
              { label: "Atividades", href: "#atividades" },
              { label: "Como funciona", href: "#como-funciona" },
              { label: "Galeria", href: "#galeria" },
            ].map(l => (
              <a key={l.href} href={l.href} style={{ display: "block", fontFamily: "'Nunito',sans-serif", fontSize: "0.95rem", color: "#a0b8b4", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F5C842")}
                onMouseLeave={e => (e.currentTarget.style.color = "#a0b8b4")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Contacts */}
          <div>
            <h3 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "1rem", color: "#FAF0DC", marginBottom: "1.2rem" }}>Contactos</h3>
            <div className="flex flex-col gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <WhatsAppIcon size={16}/>
                </div>
                <div>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.75rem", color: "#7BC67E", fontWeight: 600 }}>WhatsApp</div>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.95rem", color: "#FAF0DC", fontWeight: 700 }}>+351 936 331 843</div>
                </div>
              </a>
              <a href="mailto:tedinportugal@gmail.com" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "#2D7A6E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "1rem" }}>✉️</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.75rem", color: "#7BC67E", fontWeight: 600 }}>Email</div>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.95rem", color: "#FAF0DC", fontWeight: 700 }}>tedinportugal@gmail.com</div>
                </div>
              </a>
              <a href="https://instagram.com/tedinportugal" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "#E1306C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "1rem" }}>📸</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.75rem", color: "#7BC67E", fontWeight: 600 }}>Instagram</div>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.95rem", color: "#FAF0DC", fontWeight: 700 }}>@tedinportugal</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.85rem", color: "#5a7a74" }}>
            © 2025 Ted Company — Ted in Portugal. Todos os direitos reservados.
          </p>
          <div className="flex gap-3">
            {["animador infantil Algarve", "festa aniversário Faro", "animação infantil Portugal"].map(tag => (
              <span key={tag} style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.75rem", color: "#5a7a74", background: "rgba(255,255,255,0.05)", borderRadius: "9999px", padding: "0.25rem 0.75rem" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Floating WhatsApp button ─────────────────────────────────
function FloatingWhatsApp() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Contactar no WhatsApp">
      <WhatsAppIcon size={26}/>
    </a>
  );
}

// ── Main export ──────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: "#FAF0DC" }}>
      <Navbar/>
      <HeroSection/>
      <SobreSection/>
      <AtividadesSection/>
      <ComoFuncionaSection/>
      <GaleriaSection/>
      <PorqueEscolherSection/>
      <CTASection/>
      <ContactosSection/>
      <FloatingWhatsApp/>
    </div>
  );
}
