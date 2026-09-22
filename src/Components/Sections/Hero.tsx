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

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
        },
      );
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
        bg-claro
        px-4
        pt-20
        pb-12
        sm:px-6
        lg:px-12
        lg:py-24
      "
    >
      {/* FUNDOS LUMINOSOS (GLOW) */}
      <div
        className="
          pointer-events-none
          absolute
          -right-[5%]
          top-[15%]
          h-[400px]
          w-[400px]
          sm:h-[650px]
          sm:w-[650px]
          rounded-full
          bg-gradient-to-br
          from-verde-principal/15
          to-emerald-400/5
          blur-[100px]
          sm:blur-[140px]
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
                    mb-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-verde-principal/20
                    bg-verde-principal/10
                    px-3.5
                    py-1.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-verde-escuro
                    backdrop-blur-md
                    sm:text-xs
                  "
                >
                  <Sparkles size={13} className="text-verde-principal animate-pulse shrink-0" />
                  <span className="truncate">Janela de atendimento de 24 horas</span>
                </div>

                <h1
                  className="
                    text-3xl
                    font-black
                    leading-[0.95]
                    tracking-[-0.05em]
                    text-escuro-principal
                    sm:text-5xl
                    lg:text-[72px]
                  "
                >
                  Toda conversa tem <span className="text-verde-escuro underline decoration-verde-fundo decoration-4">24 horas</span>. Depois disso, você paga para falar.
                </h1>

                <p
                  className="
                    mt-5
                    max-w-[520px]
                    text-sm
                    leading-relaxed
                    text-escuro-principal/60
                    sm:text-lg
                  "
                >
                  É regra da Meta, e quase ninguém na sua equipe sabe. O LeadIn mostra quais conversas estão prestes a fechar e quanto custa deixar fechar.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-6">
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
                      bg-escuro-principal
                      px-7
                      py-3.5
                      font-bold
                      text-white
                      shadow-[0_10px_30px_rgba(2,6,24,0.15)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-verde-principal
                      hover:text-escuro-principal
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

                  <div className="flex items-center gap-3 text-xs font-semibold text-escuro-principal/50">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-verde-principal/10 text-verde-principal">
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
                    mb-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-red-500/20
                    bg-red-500/10
                    px-3.5
                    py-1.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-red-600
                    backdrop-blur-md
                    sm:text-xs
                  "
                >
                  <ShieldAlert size={13} className="text-red-500 animate-bounce shrink-0" />
                  Sem visibilidade da operação
                </div>

                <h1
                  className="
                    text-3xl
                    font-black
                    leading-[0.95]
                    tracking-[-0.05em]
                    text-escuro-principal
                    sm:text-5xl
                    lg:text-[76px]
                  "
                >
                  Os leads que você não vê são os que{" "}
                  <span className="text-red-500 underline decoration-red-500/30 decoration-wavy decoration-2">
                    você perde.
                  </span>
                </h1>

                <p
                  className="
                    mt-5
                    max-w-[520px]
                    text-sm
                    leading-relaxed
                    text-escuro-principal/60
                    sm:text-lg
                  "
                >
                  Enquanto sua equipe navega às cegas, o relógio corre. Descubra como centralizar e priorizar as conversas do seu negócio.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-6">
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
                      bg-escuro-principal
                      px-7
                      py-3.5
                      font-bold
                      text-white
                      shadow-[0_10px_30px_rgba(2,6,24,0.15)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-verde-principal
                      hover:text-escuro-principal
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

                  <div className="flex items-center gap-3 text-xs font-semibold text-escuro-principal/50">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-verde-principal/10 text-verde-principal">
                      <Zap size={15} />
                    </div>
                    <span>API oficial da Meta. <br />Sem risco de banimento.</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* COLUNA DIREITA: O RADAR DE JANELA AUTÔNOMO E DINÂMICO */}
          <div className="relative mx-auto w-full max-w-[480px] lg:max-w-none">
            <div
              className="
                relative
                overflow-hidden
                rounded-[24px]
                sm:rounded-[32px]
                border
                border-escuro-principal/10
                bg-white/90
                shadow-[0_20px_60px_-15px_rgba(11,27,23,0.12)]
                backdrop-blur-2xl
              "
            >
              {/* CABEÇALHO DO RADAR */}
              <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 border-b border-escuro-principal/[0.06] bg-white/60">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-red-500"></span>
                  </span>
                  <strong className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-escuro-principal">
                    Radar de Janela
                  </strong>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-verde-principal/20 bg-verde-principal/10 px-2.5 py-0.5 sm:px-3 sm:py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-verde-principal animate-pulse" />
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-verde-escuro">
                    Ao vivo
                  </span>
                </div>
              </div>

              {/* LISTA DE CONVERSAS */}
              <div className="max-h-[320px] sm:max-h-[360px] overflow-y-auto divide-y divide-escuro-principal/[0.04] p-2 space-y-1">
                {convs.map((c) => {
                  const fechada = c.seg <= 0;
                  const urgente = c.seg > 0 && c.seg < 300;

                  return (
                    <div
                      key={c.id}
                      className={`flex items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                        fechada 
                          ? "opacity-40 bg-black/[0.02]" 
                          : urgente 
                          ? "bg-red-500/[0.03] border border-red-500/10" 
                          : "hover:bg-black/[0.01]"
                      }`}
                    >
                      <div className="min-w-0 flex items-start gap-2.5 sm:gap-3">
                        <div className={`mt-0.5 flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg sm:rounded-xl text-[10px] font-bold ${
                          fechada 
                            ? "bg-gray-200 text-gray-500" 
                            : urgente 
                            ? "bg-red-100 text-red-600" 
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {fechada ? <CheckCircle2 size={12} /> : urgente ? <AlertTriangle size={12} /> : <Clock size={12} />}
                        </div>
                        <div className="min-w-0">
                          <strong className="block text-[11px] sm:text-xs font-bold text-escuro-principal truncate">
                            {c.nome}
                          </strong>
                          <small className="block text-[10px] sm:text-[11px] text-escuro-principal/50 truncate max-w-[22ch] sm:max-w-[26ch]">
                            {c.msg}
                          </small>
                        </div>
                      </div>

                      <span
                        className={`font-mono text-[11px] sm:text-xs font-bold px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl shrink-0 ${
                          fechada
                            ? "bg-gray-100 text-gray-400"
                            : urgente
                            ? "bg-red-500/10 text-red-600 shadow-sm shadow-red-500/10"
                            : "bg-emerald-500/10 text-emerald-700"
                        }`}
                      >
                        {formataTempo(c.seg)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* RODAPÉ DO RADAR COM O CÁLCULO DE CUSTO */}
              <div className="flex items-baseline justify-between px-4 py-3 sm:px-6 sm:py-4 bg-escuro-principal/[0.02] border-t border-escuro-principal/[0.06]">
                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-escuro-principal/40">
                    Impacto Financeiro
                  </span>
                  <span className="text-[11px] sm:text-xs text-escuro-principal/70 font-semibold">
                    Custo se todas fecharem
                  </span>
                </div>
                <span className="font-mono font-black text-base sm:text-lg text-red-600 tracking-tight">
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