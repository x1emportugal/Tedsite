/*
 * TED COMPANY — Home Page
 * Estilo: Organic Playful (inspirado em mega-kids.pt)
 * Fundo creme #FAF0DC | Teal #2D7A6E | Amarelo #F5C842
 * Fontes: Baloo 2 (títulos) + Nunito (corpo)
 * Sem emojis — ícones SVG inline
 */

import { useEffect, useRef, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/351936331843?text=Olá%20Ted!%20Gostaria%20de%20pedir%20um%20orçamento%20para%20uma%20festa%20de%20aniversário.";

// Fotos reais do Ted — carregadas pelo cliente
const IMG_HERO     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/cc0492e2-b3e8-4726-b1c4-f155cb09206e_60b5132a.JPG"; // animação exterior — crianças no sofá
const IMG_SLIME    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/1ab7aa02-d676-4c09-9d4f-3aed1c051b09_46966b5c.JPG"; // pintura facial — menina
const IMG_TREASURE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/fce2c001-9eda-4fca-ad6a-7e130124e161_6f93023a.JPG"; // Ted pirata com balão
const IMG_PORTRAIT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/IMG_7700_581ac365.JPG"; // Ted com criança — balão
const IMG_GAMES    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/IMG_7702_76980a0f.JPG"; // Ted a contar história às crianças
const IMG_FACEPAINT2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/2f32c304-accd-4a76-9a82-47a2a52d8400_10c766dd.JPG"; // grupo pintura facial
const IMG_PIRATE2    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/IMG_1467_49a8efcb.jpg"; // festa exterior
const IMG_EXTRA1     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/IMG_4726_2809ca19.jpg"; // atividade
const IMG_EXTRA2     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/IMG_5591_aac38b02.jpg"; // atividade
const IMG_EXTRA3     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/IMG_5639_b4ccc02a.jpg"; // atividade

// Novas fotos reais — sessão profissional
const IMG_DSC07078 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/DSC07078_3d9e520c.jpg"; // Ted a cortar
const IMG_DSC07148 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/DSC07148_b7487a59.jpg"; // Ted com crianças em roda
const IMG_DSC07095 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/DSC07095_e858ec2f.jpg"; // Ted sentado com crianças
const IMG_DSC07229 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/DSC07229_b33b644e.jpg"; // Ted e mãe com criança
const IMG_DSC07215 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/DSC07215_ff5ca155.jpg"; // Ted sorridente
const IMG_DSC07153 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/DSC07153_6c351d92.jpg"; // Ted com caixa de contas
const IMG_DSC07155 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/DSC07155_ff6be72e.jpg"; // mãos a escolher contas
const IMG_DSC07157 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/DSC07157_296eefae.jpg"; // Ted a fazer pulseiras
const IMG_DSC07164 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/DSC07164_03d4efb0.jpg"; // crianças a escolher contas

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

// ── SVG Icons ────────────────────────────────────────────────
function IconWhatsApp({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
function IconStar({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}
function IconMap({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/>
      <line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  );
}
function IconFlask({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6l1 9H8L9 3z"/>
      <path d="M6.5 12c-1.5 2-2.5 4-2.5 5a5 5 0 0010 0c0-1-1-3-2.5-5"/>
    </svg>
  );
}
function IconBracelet({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8"/>
      <circle cx="12" cy="12" r="3"/>
      <line x1="12" y1="4" x2="12" y2="9"/>
      <line x1="12" y1="15" x2="12" y2="20"/>
      <line x1="4" y1="12" x2="9" y2="12"/>
      <line x1="15" y1="12" x2="20" y2="12"/>
    </svg>
  );
}
function IconRun({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="2"/>
      <path d="M7 21l2-7 3 3 3-7"/>
      <path d="M16 21l-2-7"/>
      <path d="M5 12l2-3 4 1 3-4"/>
    </svg>
  );
}
function IconChat({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  );
}
function IconParty({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.8 11.3L2 22l10.7-3.79"/>
      <path d="M4 3h.01"/>
      <path d="M22 8h.01"/>
      <path d="M15 2h.01"/>
      <path d="M22 20h.01"/>
      <path d="M22 2L11 13"/>
      <path d="M11 13l2.5 2.5"/>
    </svg>
  );
}
function IconCake({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8"/>
      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1"/>
      <path d="M2 21h20"/>
      <path d="M7 8v3"/>
      <path d="M12 8v3"/>
      <path d="M17 8v3"/>
      <path d="M7 4l1 4"/>
      <path d="M12 4l1 4"/>
      <path d="M17 4l1 4"/>
    </svg>
  );
}
function IconShield({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
function IconLocation({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function IconTrophy({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 000-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0012 0V2z"/>
    </svg>
  );
}
function IconPalette({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill={color}/>
      <circle cx="17.5" cy="10.5" r=".5" fill={color}/>
      <circle cx="8.5" cy="7.5" r=".5" fill={color}/>
      <circle cx="6.5" cy="12.5" r=".5" fill={color}/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  );
}
function IconBalloon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <line x1="12" y1="22" x2="12" y2="18"/>
    </svg>
  );
}
function IconHeart({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  );
}
function IconSmile({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 13s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  );
}
function IconTarget({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
function IconZap({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}
function IconUsers({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  );
}
function IconMail({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}
function IconInstagram({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function IconPhone({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
    </svg>
  );
}
function IconHotel({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V8l9-6 9 6v14"/>
      <path d="M9 22V12h6v10"/>
    </svg>
  );
}
function IconCheck({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function IconArrowRight({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
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
      }}
    >
      <div className="container flex items-center justify-between py-4">
        <a href="#inicio" className="flex items-center gap-3 no-underline">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/ted-logo_d9f03a52.png" alt="Ted Animações" style={{ width: "3.2rem", height: "3.2rem", objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.12))" }} />
          <div>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.1rem", color: "#1a2e2a", lineHeight: 1 }}>Ted Animações</div>
            <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.7rem", color: "#2D7A6E", fontWeight: 600 }}>animação infantil</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link text-sm">{l.label}</a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-sm" style={{ padding: "0.6rem 1.4rem" }}>
            <IconWhatsApp size={17}/> Pedir orçamento
          </a>
        </div>

        <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{ display: "block", width: "24px", height: "2.5px", background: "#1a2e2a", borderRadius: "2px", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }}/>
          <span style={{ display: "block", width: "24px", height: "2.5px", background: "#1a2e2a", borderRadius: "2px", opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }}/>
          <span style={{ display: "block", width: "24px", height: "2.5px", background: "#1a2e2a", borderRadius: "2px", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}/>
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: "#FAF0DC", borderTop: "2px solid #E0D4B0", padding: "1rem 1.5rem 1.5rem" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="block py-2 nav-link text-base" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-4 w-full justify-center" onClick={() => setMenuOpen(false)}>
            <IconWhatsApp size={20}/> Pedir orçamento no WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center" style={{ background: "#FAF0DC", paddingTop: "6rem", overflowX: "hidden", overflowY: "visible" }}>
      <WiggleLine color="#2D7A6E" className="organic-deco animate-float-slow" style={{ width: "380px", top: "8%", right: "-60px", opacity: 0.7 }}/>
      <Circle color="#F5C842" size={90} className="organic-deco animate-float-med" style={{ top: "15%", right: "12%", opacity: 0.9 }}/>
      <Circle color="#2D7A6E" size={28} className="organic-deco animate-float-slow" style={{ bottom: "28%", left: "8%", opacity: 0.6 }}/>
      <Circle color="#F5C842" size={50} className="organic-deco animate-float-med" style={{ bottom: "12%", right: "22%", opacity: 0.7 }}/>
      <DotsGrid color="#2D7A6E" className="organic-deco" style={{ width: "100px", top: "20%", left: "5%", opacity: 0.4 }}/>
      <StarShape color="#F5C842" className="organic-deco animate-spin-slow" style={{ width: "50px", bottom: "20%", right: "6%", opacity: 0.6 }}/>
      <WiggleLine color="#7BC67E" className="organic-deco animate-float-slow" style={{ width: "220px", bottom: "5%", left: "15%", opacity: 0.5, transform: "rotate(180deg)" }}/>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div style={{ animation: "fade-up 0.8s ease-out forwards" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#F5C842", borderRadius: "9999px", padding: "0.4rem 1.2rem", fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem", color: "#1a2e2a", marginBottom: "1.5rem" }}>
              <IconLocation size={14} color="#1a2e2a"/> Animação Infantil no Algarve
            </div>
            <h1 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.1, color: "#1a2e2a", marginBottom: "1.5rem" }}>
              Festas de Aniversário{" "}
              <span style={{ color: "#2D7A6E" }}>Inesquecíveis</span>
            </h1>
            <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1.15rem", color: "#3a5a54", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "520px" }}>
              Jogos, oficinas criativas e aventuras que fazem os miúdos esquecerem o telemóvel e viverem momentos reais.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <IconWhatsApp size={22}/> Pedir orçamento no WhatsApp
              </a>
              <a href="#atividades" className="btn-outline-teal">
                Ver atividades <IconArrowRight size={16} color="#2D7A6E"/>
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { icon: <IconTrophy size={18} color="#2D7A6E"/>, text: "Centenas de festas" },
                { icon: <IconLocation size={18} color="#2D7A6E"/>, text: "Algarve & Portugal" },
                { icon: <IconShield size={18} color="#2D7A6E"/>, text: "Materiais seguros" },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-2">
                  {b.icon}
                  <span style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#3a5a54" }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative px-6 lg:px-0" style={{ animation: "scale-in 0.9s ease-out forwards" }}>
            <div style={{ borderRadius: "40% 60% 55% 45% / 45% 40% 60% 55%", overflow: "hidden", aspectRatio: "4/3", boxShadow: "0 20px 60px rgba(45,122,110,0.25)", border: "6px solid #F5C842", maxWidth: "100%" }}>
              <img src={IMG_HERO} alt="Festa de aniversário com animação infantil no Algarve" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
            </div>
            <div style={{ position: "absolute", bottom: "-1rem", left: "1.5rem", background: "#2D7A6E", color: "#FAF0DC", borderRadius: "1.5rem", padding: "0.8rem 1.2rem", fontFamily: "'Baloo 2',cursive", fontWeight: 800, boxShadow: "0 8px 24px rgba(45,122,110,0.35)", animation: "float-med 4s ease-in-out infinite", zIndex: 10 }}>
              <IconCake size={24} color="#F5C842"/>
              <div style={{ fontSize: "0.8rem", marginTop: "0.3rem" }}>Festa personalizada</div>
            </div>
            <div style={{ position: "absolute", top: "-0.5rem", right: "1.5rem", background: "#F5C842", color: "#1a2e2a", borderRadius: "1.5rem", padding: "0.7rem 1rem", fontFamily: "'Baloo 2',cursive", fontWeight: 800, boxShadow: "0 8px 24px rgba(245,200,66,0.4)", animation: "float-slow 5s ease-in-out infinite", textAlign: "center", zIndex: 10 }}>
              <IconSmile size={22} color="#1a2e2a"/>
              <div style={{ fontSize: "0.75rem", marginTop: "0.3rem" }}>1 a 99 anos</div>
            </div>
          </div>
        </div>
      </div>

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
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: "all 0.8s ease-out" }}>
          <div className="relative order-2 lg:order-1">
            <div style={{ borderRadius: "50% 50% 40% 60% / 40% 50% 50% 60%", overflow: "hidden", aspectRatio: "3/4", maxWidth: "420px", margin: "0 auto", boxShadow: "0 20px 60px rgba(45,122,110,0.2)", border: "5px solid #2D7A6E" }}>
              <img src={IMG_PORTRAIT} alt="Ted — animador infantil no Algarve" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
            <div style={{ position: "absolute", bottom: "2rem", right: "0", background: "#F5C842", borderRadius: "1.5rem", padding: "1rem 1.5rem", fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: "#1a2e2a", boxShadow: "0 8px 24px rgba(245,200,66,0.4)" }}>
              <IconHotel size={26} color="#1a2e2a"/>
              <div style={{ fontSize: "0.8rem", marginTop: "0.3rem" }}>Hotéis e Eventos</div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div style={{ display: "inline-block", background: "#2D7A6E", color: "#FAF0DC", borderRadius: "9999px", padding: "0.35rem 1.1rem", fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1.2rem" }}>
              Quem está por trás da diversão?
            </div>
            <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#1a2e2a", lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Olá, eu sou o <span style={{ color: "#2D7A6E" }}>Ted</span>
            </h2>
            <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1.05rem", color: "#3a5a54", lineHeight: 1.8, marginBottom: "1.2rem" }}>
              Sou um animador infantil apaixonado por criar experiências inesquecíveis para toda a família.
            </p>
            <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1.05rem", color: "#3a5a54", lineHeight: 1.8, marginBottom: "1.2rem" }}>
              Com experiência em hotéis e festas privadas no Algarve, cada evento é preparado com energia, criatividade e organização — para todas as idades, dos mais pequenos aos graúdos.
            </p>
            <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1.05rem", color: "#3a5a54", lineHeight: 1.8, marginBottom: "2rem" }}>
              Enquanto as crianças vivem aventuras cheias de jogos e desafios, os pais podem <strong>relaxar e aproveitar a festa</strong>.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-teal">
              <IconWhatsApp size={20}/> Falar com o Ted
            </a>
          </div>
        </div>
      </div>

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
  { icon: <IconMap size={28} color="#FAF0DC"/>, title: "Caça ao Tesouro", desc: "Uma aventura cheia de pistas, desafios e mistérios escondidos pelo espaço da festa.", color: "#2D7A6E", img: IMG_TREASURE },
  { icon: <IconPalette size={28} color="#1a2e2a"/>, title: "Pintura Facial", desc: "Arte na cara com designs personalizados — de animais a super-heróis, cada criança escolhe o seu.", color: "#F5C842", img: IMG_SLIME },
  { icon: <IconBracelet size={28} color="#1a2e2a"/>, title: "Pulseiras Criativas", desc: "Oficina onde cada participante cria uma pulseira personalizada para recordar a festa.", color: "#7BC67E", img: IMG_DSC07153 },
  { icon: <IconRun size={28} color="#FAF0DC"/>, title: "Jogos e Desafios", desc: "Estafetas, jogos em equipa, desafios e muita energia para toda a turma.", color: "#E8845A", img: IMG_GAMES },
];

const EXTRAS = [
  { icon: <IconPalette size={16} color="#FAF0DC"/>, label: "Pintura Facial" },
  { icon: <IconBalloon size={16} color="#FAF0DC"/>, label: "Modelagem de Balões" },
  { icon: <IconParty size={16} color="#FAF0DC"/>, label: "Bolhas de Sabão" },
  { icon: <IconRun size={16} color="#FAF0DC"/>, label: "Dança" },
  { icon: <IconUsers size={16} color="#FAF0DC"/>, label: "Jogos de Grupo" },
];

function AtividadesSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="atividades" style={{ background: "#FAF0DC", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
      <WiggleLine color="#F5C842" className="organic-deco animate-float-slow" style={{ width: "280px", top: "5%", left: "-40px", opacity: 0.5 }}/>
      <Circle color="#2D7A6E" size={55} className="organic-deco animate-float-med" style={{ top: "10%", right: "4%", opacity: 0.5 }}/>
      <StarShape color="#F5C842" className="organic-deco animate-spin-slow" style={{ width: "45px", bottom: "15%", left: "5%", opacity: 0.5 }}/>

      <div className="container">
        <div ref={ref} className="text-center mb-14" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.7s ease-out" }}>
          <div style={{ display: "inline-block", background: "#F5C842", color: "#1a2e2a", borderRadius: "9999px", padding: "0.35rem 1.1rem", fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem" }}>
            O que fazemos nas festas
          </div>
          <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#1a2e2a", lineHeight: 1.15 }}>
            Atividades que toda a gente <span style={{ color: "#2D7A6E" }}>adora</span>
          </h2>
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1.05rem", color: "#3a5a54", marginTop: "1rem", maxWidth: "560px", margin: "1rem auto 0" }}>
            Cada atividade é pensada para o tipo de festa — sempre com energia, segurança e muita diversão para todas as idades.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ACTIVITIES.map((act, i) => (
            <div key={act.title} className="activity-card" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: `all 0.7s ease-out ${i * 0.12}s` }}>
              {act.img ? (
                <div style={{ height: "180px", overflow: "hidden", position: "relative" }}>
                  <img src={act.img} alt={act.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div style={{ position: "absolute", top: "1rem", left: "1rem", width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: act.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {act.icon}
                  </div>
                </div>
              ) : (
                <div style={{ height: "180px", background: act.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {act.icon}
                </div>
              )}
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.1rem", color: "#1a2e2a", marginBottom: "0.5rem" }}>{act.title}</h3>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.9rem", color: "#3a5a54", lineHeight: 1.6 }}>{act.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#2D7A6E", borderRadius: "2rem", padding: "2rem 2.5rem", opacity: visible ? 1 : 0, transition: "all 0.8s ease-out 0.5s" }}>
          <p style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "1rem", color: "#FAF0DC", marginBottom: "1rem", textAlign: "center" }}>
            Extras possíveis — personalize ainda mais a festa
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {EXTRAS.map(e => (
              <div key={e.label} style={{ background: "rgba(250,240,220,0.15)", borderRadius: "9999px", padding: "0.5rem 1.2rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#FAF0DC", border: "1.5px solid rgba(250,240,220,0.3)" }}>
                {e.icon} {e.label}
              </div>
            ))}
          </div>
        </div>
      </div>

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
  { num: "1", icon: <IconChat size={32} color="#2D7A6E"/>, title: "Fale connosco no WhatsApp", desc: "Envie uma mensagem e diga-nos quando é a festa." },
  { num: "2", icon: <IconCake size={32} color="#2D7A6E"/>, title: "Explique como será a festa", desc: "Número de participantes, idades, local e tipo de evento." },
  { num: "3", icon: <IconParty size={32} color="#2D7A6E"/>, title: "Animação personalizada", desc: "Criamos um programa à medida para a sua festa." },
];

function ComoFuncionaSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="como-funciona" style={{ background: "#F0E4C4", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
      <Blob color="#F5C842" className="organic-deco" style={{ width: "250px", bottom: "-60px", right: "-60px", opacity: 0.15 }}/>
      <Circle color="#2D7A6E" size={45} className="organic-deco animate-float-slow" style={{ top: "8%", right: "8%", opacity: 0.4 }}/>

      <div className="container">
        <div ref={ref} className="text-center mb-14" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.7s ease-out" }}>
          <div style={{ display: "inline-block", background: "#2D7A6E", color: "#FAF0DC", borderRadius: "9999px", padding: "0.35rem 1.1rem", fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem" }}>
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
            <div key={step.num} style={{ background: "#fff", borderRadius: "2rem", padding: "2.5rem 2rem", textAlign: "center", boxShadow: "0 4px 24px rgba(45,122,110,0.10)", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: `all 0.7s ease-out ${i * 0.15}s` }}>
              <div className="step-circle mx-auto mb-5">{step.num}</div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>{step.icon}</div>
              <h3 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.15rem", color: "#1a2e2a", marginBottom: "0.75rem" }}>{step.title}</h3>
              <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.95rem", color: "#3a5a54", lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1rem", color: "#3a5a54", marginBottom: "1.5rem", fontStyle: "italic" }}>
            Cada festa é adaptada ao número de participantes e tipo de espaço — para todas as idades.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <IconWhatsApp size={22}/> Começar agora no WhatsApp
          </a>
        </div>
      </div>

      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "60px" }}>
          <path fill="#FAF0DC" d="M0,20 C480,60 960,0 1440,40 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}

// ── CARROSSEL ROTATIVO ──────────────────────────────────────
function CarrosselSection() {
  const { ref, visible } = useReveal();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    { src: IMG_DSC07148, alt: "Ted com crianças sentadas em roda — animação interativa" },
    { src: IMG_DSC07095, alt: "Ted sentado com crianças — momento de proximidade" },
    { src: IMG_DSC07078, alt: "Ted a preparar atividade criativa" },
    { src: IMG_DSC07229, alt: "Ted e família — atividade conjunta" },
    { src: IMG_DSC07215, alt: "Ted sorridente à mesa de atividades" },
    { src: IMG_DSC07153, alt: "Ted com caixa de contas coloridas" },
    { src: IMG_DSC07155, alt: "Mãos a escolher contas coloridas para pulseiras" },
    { src: IMG_DSC07157, alt: "Ted a fazer pulseiras com crianças" },
    { src: IMG_DSC07164, alt: "Crianças a escolher contas com balão cor-de-rosa" },
  ];

  const goTo = (idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, 3500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section style={{ background: "#F0E4C4", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
      <WiggleLine color="#2D7A6E" className="organic-deco animate-float-slow" style={{ width: "200px", top: "5%", left: "2%", opacity: 0.35 }}/>
      <Circle color="#F5C842" size={70} className="organic-deco animate-float-med" style={{ bottom: "8%", right: "4%", opacity: 0.5 }}/>

      <div className="container">
        <div ref={ref} className="text-center mb-12" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.7s ease-out" }}>
          <div style={{ display: "inline-block", background: "#2D7A6E", color: "#FAF0DC", borderRadius: "9999px", padding: "0.35rem 1.1rem", fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem" }}>
            Momentos das festas
          </div>
          <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#1a2e2a", lineHeight: 1.15 }}>
            Cada festa, uma <span style={{ color: "#2D7A6E" }}>memória</span>
          </h2>
        </div>

        {/* Carrossel principal */}
        <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}>
          {/* Imagem principal */}
          <div style={{ borderRadius: "2.5rem", overflow: "hidden", aspectRatio: "16/9", boxShadow: "0 24px 64px rgba(45,122,110,0.22)", border: "5px solid #F5C842" }}>
            <img
              key={current}
              src={slides[current].src}
              alt={slides[current].alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", animation: "fade-up 0.5s ease-out forwards" }}
            />
          </div>

          {/* Setas */}
          <button
            onClick={prev}
            aria-label="Anterior"
            style={{ position: "absolute", left: "-1.5rem", top: "50%", transform: "translateY(-50%)", width: "3rem", height: "3rem", borderRadius: "50%", background: "#FAF0DC", border: "2.5px solid #2D7A6E", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(45,122,110,0.18)", zIndex: 10, transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#2D7A6E")}
            onMouseLeave={e => (e.currentTarget.style.background = "#FAF0DC")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D7A6E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            onClick={next}
            aria-label="Próximo"
            style={{ position: "absolute", right: "-1.5rem", top: "50%", transform: "translateY(-50%)", width: "3rem", height: "3rem", borderRadius: "50%", background: "#FAF0DC", border: "2.5px solid #2D7A6E", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(45,122,110,0.18)", zIndex: 10, transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#2D7A6E")}
            onMouseLeave={e => (e.currentTarget.style.background = "#FAF0DC")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D7A6E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Thumbnails — pop-it style */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ver foto ${i + 1}`}
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "1.2rem",
                overflow: "hidden",
                border: i === current ? "3.5px solid #2D7A6E" : "3px solid transparent",
                boxShadow: i === current ? "0 0 0 3px #F5C842" : "0 2px 8px rgba(0,0,0,0.12)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.25s ease",
                transform: i === current ? "scale(1.12)" : "scale(1)",
                flexShrink: 0,
              }}
            >
              <img src={slide.src} alt={slide.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
            </button>
          ))}
        </div>

        {/* Contador */}
        <div className="text-center mt-5" style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#3a5a54" }}>
          {current + 1} / {slides.length}
        </div>
      </div>

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
    { src: IMG_HERO,       alt: "Animação infantil no Algarve — crianças e animador" },
    { src: IMG_SLIME,      alt: "Pintura facial — menina com decoração artística" },
    { src: IMG_FACEPAINT2, alt: "Grupo com pintura facial divertida" },
    { src: IMG_TREASURE,   alt: "Ted animador pirata com balão" },
    { src: IMG_PORTRAIT,   alt: "Ted com criança pequena" },
    { src: IMG_GAMES,      alt: "Ted a contar história às crianças" },
    { src: IMG_PIRATE2,    alt: "Festa de aniversário no exterior" },
    { src: IMG_EXTRA1,     alt: "Atividade de animação infantil" },
    { src: IMG_EXTRA2,     alt: "Atividade criativa na festa" },
    { src: IMG_EXTRA3,     alt: "Animação infantil no Algarve" },
  ];

  return (
    <section id="galeria" style={{ background: "#FAF0DC", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
      <WiggleLine color="#2D7A6E" className="organic-deco animate-float-slow" style={{ width: "220px", top: "5%", right: "2%", opacity: 0.4 }}/>
      <Circle color="#F5C842" size={65} className="organic-deco animate-float-med" style={{ bottom: "8%", left: "3%", opacity: 0.5 }}/>

      <div className="container">
        <div ref={ref} className="text-center mb-12" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.7s ease-out" }}>
          <div style={{ display: "inline-block", background: "#F5C842", color: "#1a2e2a", borderRadius: "9999px", padding: "0.35rem 1.1rem", fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem" }}>
            Momentos reais
          </div>
          <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#1a2e2a", lineHeight: 1.15 }}>
            Galeria de <span style={{ color: "#2D7A6E" }}>festas</span>
          </h2>
        </div>

        {/* Desktop mosaic — 10 fotos reais */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: "repeat(12, 1fr)", gap: "1rem", opacity: visible ? 1 : 0, transition: "all 0.8s ease-out 0.2s" }}>
          {/* Row 1 */}
          <div style={{ gridColumn: "1 / 6", borderRadius: "2rem", overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={photos[0].src} alt={photos[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}/>
          </div>
          <div style={{ gridColumn: "6 / 10", borderRadius: "2rem", overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={photos[1].src} alt={photos[1].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}/>
          </div>
          <div style={{ gridColumn: "10 / 13", borderRadius: "2rem", overflow: "hidden", aspectRatio: "3/4" }}>
            <img src={photos[2].src} alt={photos[2].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}/>
          </div>
          {/* Row 2 */}
          <div style={{ gridColumn: "1 / 4", borderRadius: "2rem", overflow: "hidden", aspectRatio: "3/4" }}>
            <img src={photos[3].src} alt={photos[3].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}/>
          </div>
          <div style={{ gridColumn: "4 / 8", borderRadius: "2rem", overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={photos[4].src} alt={photos[4].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}/>
          </div>
          <div style={{ gridColumn: "8 / 13", borderRadius: "2rem", overflow: "hidden", aspectRatio: "16/9" }}>
            <img src={photos[5].src} alt={photos[5].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}/>
          </div>
          {/* Row 3 */}
          <div style={{ gridColumn: "1 / 5", borderRadius: "2rem", overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={photos[6].src} alt={photos[6].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}/>
          </div>
          <div style={{ gridColumn: "5 / 9", borderRadius: "2rem", overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={photos[7].src} alt={photos[7].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}/>
          </div>
          <div style={{ gridColumn: "9 / 13", borderRadius: "2rem", overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={photos[8].src} alt={photos[8].alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}/>
          </div>
        </div>

        {/* Mobile grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {photos.slice(0, 8).map((p, i) => (
            <div key={i} style={{ borderRadius: "1.2rem", overflow: "hidden", aspectRatio: i === 0 ? "16/9" : "4/3", gridColumn: i === 0 ? "1 / 3" : "auto" }}>
              <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
          ))}
        </div>
      </div>

      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "60px" }}>
          <path fill="#2D7A6E" d="M0,30 C360,0 1080,60 1440,20 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}

// ── PORQUÊ ESCOLHER ──────────────────────────────────────────
const WHY_ITEMS = [
  { icon: <IconTrophy size={22} color="#1a2e2a"/>, title: "Experiência comprovada", desc: "Centenas de festas realizadas com participantes de todas as idades." },
  { icon: <IconPalette size={22} color="#1a2e2a"/>, title: "Atividades criativas", desc: "Jogos educativos e criativos que estimulam a imaginação." },
  { icon: <IconShield size={22} color="#1a2e2a"/>, title: "Materiais seguros", desc: "Todos os materiais são seguros e não tóxicos." },
  { icon: <IconZap size={22} color="#1a2e2a"/>, title: "Energia e organização", desc: "Animação energética com total organização e profissionalismo." },
  { icon: <IconHeart size={22} color="#1a2e2a"/>, title: "Pais tranquilos", desc: "Os pais podem relaxar e aproveitar a festa sem preocupações." },
  { icon: <IconTarget size={22} color="#1a2e2a"/>, title: "100% personalizado", desc: "Cada festa é adaptada à família e ao tipo de evento." },
];

function PorqueEscolherSection() {
  const { ref, visible } = useReveal();
  return (
    <section style={{ background: "#2D7A6E", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
      <Blob color="#FAF0DC" className="organic-deco" style={{ width: "350px", top: "-100px", left: "-100px", opacity: 0.05 }}/>
      <Circle color="#F5C842" size={80} className="organic-deco animate-float-slow" style={{ top: "10%", right: "5%", opacity: 0.3 }}/>
      <WiggleLine color="#FAF0DC" className="organic-deco animate-float-med" style={{ width: "260px", bottom: "5%", right: "10%", opacity: 0.15 }}/>

      <div className="container">
        <div ref={ref} className="text-center mb-14" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.7s ease-out" }}>
          <div style={{ display: "inline-block", background: "#F5C842", color: "#1a2e2a", borderRadius: "9999px", padding: "0.35rem 1.1rem", fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem" }}>
            Porque escolher Ted
          </div>
          <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#FAF0DC", lineHeight: 1.15 }}>
            O que nos torna <span style={{ color: "#F5C842" }}>especiais</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_ITEMS.map((item, i) => (
            <div key={item.title} className="why-badge" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: `all 0.7s ease-out ${i * 0.1}s` }}>
              <div className="why-badge-icon">{item.icon}</div>
              <div>
                <h3 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1rem", color: "#1a2e2a", marginBottom: "0.3rem" }}>{item.title}</h3>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.9rem", color: "#3a5a54", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
        <div ref={ref} className="text-center" style={{ maxWidth: "700px", margin: "0 auto", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: "all 0.8s ease-out" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <div style={{ width: "5rem", height: "5rem", borderRadius: "1.5rem", background: "#2D7A6E", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconCake size={36} color="#F5C842"/>
            </div>
          </div>
          <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#1a2e2a", lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Vamos criar a melhor festa para a sua família?
          </h2>
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1.1rem", color: "#3a5a54", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Conte-nos um pouco sobre a festa e vamos preparar uma animação perfeita para toda a gente.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
            <IconWhatsApp size={24}/> Pedir orçamento no WhatsApp
          </a>
        </div>
      </div>

      <div className="wave-divider absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "60px" }}>
          <path fill="#1a2e2a" d="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────
function ContactosSection() {
  return (
    <section id="contactos" style={{ background: "#1a2e2a", paddingTop: "5rem", paddingBottom: "3rem", position: "relative", overflow: "hidden" }}>
      <Blob color="#2D7A6E" className="organic-deco" style={{ width: "300px", top: "-80px", right: "-60px", opacity: 0.1 }}/>
      <Circle color="#F5C842" size={50} className="organic-deco animate-float-slow" style={{ bottom: "20%", left: "5%", opacity: 0.2 }}/>

      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/ted-logo_d9f03a52.png" alt="Ted Animações" style={{ width: "3.5rem", height: "3.5rem", objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3)) brightness(1.05)" }} />
              <div>
                <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.2rem", color: "#FAF0DC" }}>Ted Animações</div>
                <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.75rem", color: "#7BC67E", fontWeight: 600 }}>animação infantil</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.95rem", color: "#a0b8b4", lineHeight: 1.7 }}>
              Animação infantil profissional no Algarve. Festas de aniversário inesquecíveis para todas as idades — dos 1 aos 99 anos.
            </p>
          </div>

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

          <div>
            <h3 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "1rem", color: "#FAF0DC", marginBottom: "1.2rem" }}>Contactos</h3>
            <div className="flex flex-col gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconWhatsApp size={16}/>
                </div>
                <div>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.75rem", color: "#7BC67E", fontWeight: 600 }}>WhatsApp</div>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.95rem", color: "#FAF0DC", fontWeight: 700 }}>+351 936 331 843</div>
                </div>
              </a>
              <a href="mailto:tedinportugal@gmail.com" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "#2D7A6E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconMail size={16} color="#FAF0DC"/>
                </div>
                <div>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.75rem", color: "#7BC67E", fontWeight: 600 }}>Email</div>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.95rem", color: "#FAF0DC", fontWeight: 700 }}>tedinportugal@gmail.com</div>
                </div>
              </a>
              <a href="https://instagram.com/tedinportugal" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "#E1306C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconInstagram size={16} color="#FAF0DC"/>
                </div>
                <div>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.75rem", color: "#7BC67E", fontWeight: 600 }}>Instagram</div>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.95rem", color: "#FAF0DC", fontWeight: 700 }}>@tedinportugal</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.85rem", color: "#5a7a74" }}>
              © 2025 Ted Animações — Ted in Portugal. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap gap-2">
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

// ── Floating WhatsApp ────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Contactar no WhatsApp">
      <IconWhatsApp size={26}/>
    </a>
  );
}

// ── Export ───────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: "#FAF0DC" }}>
      <Navbar/>
      <HeroSection/>
      <SobreSection/>
      <AtividadesSection/>
      <ComoFuncionaSection/>
      <CarrosselSection/>
      <GaleriaSection/>
      <PorqueEscolherSection/>
      <CTASection/>
      <ContactosSection/>
      <FloatingWhatsApp/>
    </div>
  );
}
