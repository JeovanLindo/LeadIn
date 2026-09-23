import {
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { useRef, useState, useEffect } from "react";

import {
  gsap,
  useGSAP,
} from "../../lib/gsap";

import { useJourney } from "../../context/JourneyContext";

// ============================================================================
// COMPONENTE: Efeito de Máquina de Escrever (Typewriter)
// ============================================================================
function TypewriterTitle({ 
  text1, 
  highlight, 
  text2 = "", 
  highlightClass, 
  cursorColor 
}: { 
  text1: string; 
  highlight: string; 
  text2?: string; 
  highlightClass: string; 
  cursorColor: string;
}) {
  const [charIndex, setCharIndex] = useState(0);
  const totalChars = text1.length + highlight.length + text2.length;

  useEffect(() => {
    setCharIndex(0);
  }, [text1, highlight, text2]);

  useEffect(() => {
    if (charIndex < totalChars) {
      const speed = Math.random() * 25 + 15; 
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [charIndex, totalChars]);

  const t1 = text1.slice(0, charIndex);
  const h = charIndex > text1.length ? highlight.slice(0, charIndex - text1.length) : "";
  const t2 = charIndex > text1.length + highlight.length ? text2.slice(0, charIndex - text1.length - highlight.length) : "";

  return (
    <h1 className="hero-text-anim relative text-3xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-4xl lg:text-6xl">
      <span className="invisible pointer-events-none">
        {text1}
        <span className={highlightClass}>{highlight}</span>
        {text2}
      </span>
      
      <span className="absolute top-0 left-0 w-full h-full">
        {t1}
        {charIndex > text1.length && <span className={highlightClass}>{h}</span>}
        {t2}
        <span className={`ml-1 inline-block w-[4px] h-[0.7em] animate-pulse align-baseline ${cursorColor}`} />
      </span>
    </h1>
  );
}

// ============================================================================
// DADOS FAKE PARA O RADAR
// ============================================================================
const initialConversations = [
  { id: 1, nome: "Padaria Pão da Praia", msg: "Consigo 10 linhas nesse plano?", seg: 51 },
  { id: 2, nome: "Alcides Sales", msg: "Vim pelo Instagram, atendem MEI?", seg: 143 },
  { id: 3, nome: "Espaço das Pratas", msg: "Qual o valor do plano empresarial?", seg: 268 },
  { id: 4, nome: "Ignez Esteves", msg: "Bom dia! Ainda tem a promoção?", seg: 431 },
  { id: 5, nome: "Yássara Lohanya", msg: "Vou pegar com o financeiro e te falo", seg: 622 },
  { id: 6, nome: "Comércio Aldeia", msg: "Preciso de mais 2 chips de dados", seg: 845 },
  { id: 7, nome: "Marcos Pinheiro", msg: "Me manda a proposta por favor", seg: 1090 },
];

const TARIFA_META = 0.34;

function formataTempo(s: number) {
  if (s <= 0) return "Expirado";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return h > 0
    ? `${h}h ${String(m).padStart(2, "0")}m`
    : `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

// ============================================================================
// COMPONENTE PRINCIPAL (HERO)
// ============================================================================
export default function Hero() {
  const {
    hasReturnedToHero,
    goToSection,
  } = useJourney();

  const contentRef = useRef<HTMLDivElement>(null);
  const [convs, setConvs] = useState(initialConversations);

  useEffect(() => {
    const timer = setInterval(() => {
      setConvs((prevConvs) => {
        const atualizadas = prevConvs.map((c) => {
          if (c.seg > 0) {
            return { ...c, seg: c.seg - 1 };
          }
          return c;
        });

        if (atualizadas.every((c) => c.seg <= 0)) {
          return initialConversations.map((c, i) => ({ ...c, seg: 51 + i * 173 }));
        }
        return atualizadas;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fechadasCount = convs.filter((c) => c.seg <= 0).length;
  const pendentesCount = convs.filter((c) => c.seg > 0).length;
  const custoTotal = fechadasCount > 0 
    ? (fechadasCount * TARIFA_META).toFixed(2).replace(".", ",") 
    : (pendentesCount * TARIFA_META).toFixed(2).replace(".", ",");

  // ==========================================================================
  // ANIMAÇÕES GSAP
  // ==========================================================================
  useGSAP(
    () => {
      if (!contentRef.current) return;

      const tl = gsap.timeline();

      // 1. Entrada dos textos
      tl.fromTo(
        ".hero-text-anim",
        {
          opacity: 0,
          y: 40,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
        }
      ).fromTo(
        ".hero-radar-anim",
        {
          opacity: 0,
          x: 40,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.6" 
      );

      // 2. Animação de flutuação contínua para o card (Levitação)
      gsap.to(".floating-radar", {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    },
    {
      dependencies: [hasReturnedToHero],
      scope: contentRef,
    },
  );

  return (
    <section
      id="inicio"
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
        bg-[#020611]
        text-white
        px-4
        pt-20
        pb-12
        sm:px-6
        lg:px-12
        lg:py-24
      "
    >
      {/* GLOW DE FUNDO ALTAMENTE DIFUSO E IMERSIVO (BASEADO NA REFERÊNCIA) */}
      <div
        className="
          pointer-events-none
          absolute
          -right-[10%]
          -bottom-[15%]
          h-[700px]
          w-[700px]
          sm:h-[1100px]
          sm:w-[1100px]
          rounded-full
          bg-gradient-to-tl
          from-[#10b981]/50
          via-[#059669]/25
          to-transparent
          blur-[180px]
          sm:blur-[240px]
          opacity-95
        "
      />

      {/* SEGUNDO FOCO DE LUZ SUTIL NO CENTRO-DIREITA PARA ENVOLVER A TELA */}
      <div
        className="
          pointer-events-none
          absolute
          right-[10%]
          bottom-[20%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-emerald-400/20
          blur-[150px]
          opacity-70
        "
      />

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1240px]
          py-6
          sm:py-12
        "
      >
        <div
          ref={contentRef}
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-[1.1fr_0.9fr]
            lg:gap-16
          "
        >
          {/* COLUNA ESQUERDA: TEXTOS E AÇÃO */}
          <div>
            {!hasReturnedToHero ? (
              <>
                <div
                  className="
                    hero-text-anim
                    mb-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-verde-principal/30
                    bg-verde-principal/15
                    px-3.5
                    py-1.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-ciano-claro
                    backdrop-blur-md
                    sm:text-xs
                  "
                >
                  <Sparkles size={13} className="text-ciano-claro animate-pulse shrink-0" />
                  <span className="truncate">Janela de atendimento de 24 horas</span>
                </div>

                <TypewriterTitle 
                  text1=''
                  highlight="24 horas:"
                  text2=" a linha exata que separa um atendimento lucrativo de uma cobrança invisível na sua conta."
                  highlightClass="text-ciano-claro underline decoration-verde-principal decoration-4"
                  cursorColor="bg-ciano-claro"
                />

                <p
                  className="
                    hero-text-anim
                    mt-5
                    max-w-[520px]
                    text-sm
                    leading-relaxed
                    text-gray-300
                    sm:text-lg
                  "
                >
                  É regra da Meta, e quase ninguém na sua equipe sabe. O LeadIn mostra quais conversas estão prestes a fechar e quanto custa deixar fechar.
                </p>

                <div className="hero-text-anim mt-6 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-6">
                  <button
                    type="button"
                    onClick={() => goToSection(1)}
                    className="
                      group
                      inline-flex
                      w-full
                      sm:w-auto
                      justify-center
                      items-center
                      gap-3
                      rounded-full
                      bg-ciano-claro
                      px-7
                      py-3.5
                      font-bold
                      text-escuro-principal
                      shadow-[0_10px_30px_rgba(0,244,192,0.25)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-white
                    "
                  >
                    Ver como funciona
                    <ArrowRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:translate-x-1.5
                      "
                    />
                  </button>

                  <div className="flex items-center gap-3 text-xs font-semibold text-gray-400">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-verde-principal/20 text-ciano-claro">
                      <Zap size={15} />
                    </div>
                    <span>API oficial da Meta. <br />Sem risco de banimento.</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="
                    hero-text-anim
                    mb-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-red-500/30
                    bg-red-500/15
                    px-3.5
                    py-1.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-red-400
                    backdrop-blur-md
                    sm:text-xs
                  "
                >
                  <ShieldAlert size={13} className="text-red-400 animate-bounce shrink-0" />
                  Sem visibilidade da operação
                </div>

                <TypewriterTitle 
                  text1="Os leads que você não vê são os que "
                  highlight="você perde."
                  highlightClass="text-red-500 underline decoration-red-500/40 decoration-wavy decoration-2"
                  cursorColor="bg-red-500"
                />

                <p
                  className="
                    hero-text-anim
                    mt-5
                    max-w-[520px]
                    text-sm
                    leading-relaxed
                    text-gray-300
                    sm:text-lg
                  "
                >
                  Enquanto sua equipe navega às cegas, o relógio corre. Descubra como centralizar e priorizar as conversas do seu negócio.
                </p>

                <div className="hero-text-anim mt-6 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-6">
                  <button
                    type="button"
                    onClick={() => goToSection(1)}
                    className="
                      group
                      inline-flex
                      w-full
                      sm:w-auto
                      justify-center
                      items-center
                      gap-3
                      rounded-full
                      bg-ciano-claro
                      px-7
                      py-3.5
                      font-bold
                      text-escuro-principal
                      shadow-[0_10px_30px_rgba(0,244,192,0.25)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-white
                    "
                  >
                    Ver como funciona
                    <ArrowRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:translate-x-1.5
                      "
                    />
                  </button>

                  <div className="flex items-center gap-3 text-xs font-semibold text-gray-400">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-verde-principal/20 text-ciano-claro">
                      <Zap size={15} />
                    </div>
                    <span>API oficial da Meta. <br />Sem risco de banimento.</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* COLUNA DIREITA: O RADAR DE JANELA */}
          <div className="hero-radar-anim relative mx-auto w-full max-w-[480px] lg:max-w-none">
            
            <div
              className="
                floating-radar
                relative
                overflow-hidden
                rounded-[24px]
                sm:rounded-[32px]
                border
                border-white/10
                bg-slate-900/70
                shadow-[0_25px_60px_-15px_rgba(0,168,132,0.2)]
                backdrop-blur-2xl
              "
            >
              {/* CABEÇALHO DO RADAR */}
              <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-red-500"></span>
                  </span>
                  <strong className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white">
                    Radar de Janela
                  </strong>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-verde-principal/30 bg-verde-principal/15 px-2.5 py-0.5 sm:px-3 sm:py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-ciano-claro animate-pulse" />
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-ciano-claro">
                    Ao vivo
                  </span>
                </div>
              </div>

              {/* LISTA DE CONVERSAS */}
              <div className="max-h-[320px] sm:max-h-[360px] overflow-y-auto divide-y divide-white/[0.04] p-2 space-y-1">
                {convs.map((c) => {
                  const fechada = c.seg <= 0;
                  const urgente = c.seg > 0 && c.seg < 300;

                  return (
                    <div
                      key={c.id}
                      className={`flex items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                        fechada 
                          ? "opacity-30 bg-black/20" 
                          : urgente 
                          ? "bg-red-500/10 border border-red-500/20" 
                          : "hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="min-w-0 flex items-start gap-2.5 sm:gap-3">
                        <div className={`mt-0.5 flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg sm:rounded-xl text-[10px] font-bold ${
                          fechada 
                            ? "bg-gray-800 text-gray-400" 
                            : urgente 
                            ? "bg-red-500/20 text-red-400" 
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}>
                          {fechada ? <CheckCircle2 size={12} /> : urgente ? <AlertTriangle size={12} /> : <Clock size={12} />}
                        </div>
                        <div className="min-w-0">
                          <strong className="block text-[11px] sm:text-xs font-bold text-white truncate">
                            {c.nome}
                          </strong>
                          <small className="block text-[10px] sm:text-[11px] text-gray-400 truncate max-w-[22ch] sm:max-w-[26ch]">
                            {c.msg}
                          </small>
                        </div>
                      </div>

                      <span
                        className={`font-mono text-[11px] sm:text-xs font-bold px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl shrink-0 ${
                          fechada
                            ? "bg-gray-800 text-gray-500"
                            : urgente
                            ? "bg-red-500/20 text-red-400 shadow-sm shadow-red-500/20"
                            : "bg-emerald-500/20 text-emerald-300"
                        }`}
                      >
                        {formataTempo(c.seg)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* RODAPÉ DO RADAR */}
              <div className="flex items-baseline justify-between px-4 py-3 sm:px-6 sm:py-4 bg-white/[0.03] border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Impacto Financeiro
                  </span>
                  <span className="text-[11px] sm:text-xs text-gray-300 font-semibold">
                    Custo se todas fecharem
                  </span>
                </div>
                <span className="font-mono font-black text-base sm:text-lg text-red-400 tracking-tight">
                  R$ {custoTotal}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}