import { useRef } from "react";
import {
  ArrowUpRight,
  Check,
  CircleDollarSign,
  Sparkles,
} from "lucide-react";

import {
  gsap,
  useGSAP,
} from "../../lib/gsap";

const plans = [
  {
    name: "Básico",
    promise: "Para organizar o WhatsApp da operação.",
    price: "297",
    limit: "Até 5 atendentes · 1 número",
    features: [
      "Radar de janela de 24h",
      "Ranking ao vivo e painéis",
      "Kanban, funil e campanhas",
      "Controle de custo da Meta",
      "Alerta de lead abandonado",
    ],
    cta: "Começar no Básico",
    url: "https://wa.me/5521995261742?text=Quero%20o%20LeadIn%20B%C3%A1sico",
    featured: false,
  },
  {
    name: "Pro",
    promise: "Para transformar atendimento em operação de vendas.",
    price: "697",
    limit: "Até 10 atendentes · 3 números · IA e inteligência comercial.",
    features: [
      "Tudo do Básico",
      "Copiloto sugerindo resposta",
      "Fechamento do mês analisado",
      "Lead classificado por temperatura",
      "Resumo automático na transferência",
      "Reativação da base parada",
    ],
    cta: "Falar sobre o Pro",
    url: "https://wa.me/5521995261742?text=Quero%20o%20LeadIn%20Pro",
    featured: true,
  },
  {
    name: "Enterprise",
    promise: "Para operações que precisam integrar o LeadIn ao restante da empresa.",
    price: "1.497",
    limit: "Atendentes e canais conforme contrato",
    features: [
      "Tudo do Pro",
      "Limites conforme operação",
      "Integração com ERP",
      "API e webhooks liberados",
      "Automações sob medida",
      "Suporte prioritário",
    ],
    cta: "Conversar sobre Enterprise",
    url: "https://wa.me/5521995261742?text=Quero%20o%20LeadIn%20Enterprise",
    featured: false,
  },
];

export default function Plans() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* ==========================
       * LUZES DE FUNDO ORGÂNICAS
       * ========================== */
      gsap.to("[data-plans-glow-1]", {
        x: 40,
        y: 30,
        scale: 1.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("[data-plans-glow-2]", {
        x: -30,
        y: -40,
        scale: 1.15,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ==========================
       * INTRODUÇÃO DOS TEXTOS
       * ========================== */
      gsap.fromTo(
        "[data-plans-intro]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      /* ==========================
       * TIMELINE DE ENTRADA DOS CARDS
       * ========================== */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-plans-grid]",
          start: "top 75%",
        },
        onComplete: initFeaturedAnimation
      });

      tl.fromTo(
        "[data-plan-card]",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      )
      .fromTo(
        "[data-plan-price]",
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
        },
        "-=0.4"
      )
      .fromTo(
        "[data-feature-item]",
        { x: -15, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.3"
      );

      /* ==========================
       * NOTA FINAL E BOTÃO
       * ========================== */
      gsap.fromTo(
        "[data-plans-note]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-plans-note]",
            start: "top 90%",
          },
        }
      );

      gsap.fromTo(
        "[data-plans-footer]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-plans-footer]",
            start: "top 95%",
          },
        }
      );

      /* ==========================
       * LÓGICA DO CARD PRINCIPAL (LEVITATION & HOVER)
       * ========================== */
      function initFeaturedAnimation() {
        const featuredCard = document.querySelector('[data-featured-card]') as HTMLElement;
        if (!featuredCard) return;

        // Levitação Suave nativa
        const floatTween = gsap.to(featuredCard, {
          y: -8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        featuredCard.addEventListener("mouseenter", () => {
          floatTween.pause(); 
          
          const isDesktop = window.innerWidth >= 1024;
          
          // Hover MUITO mais suave e elegante
          gsap.to(featuredCard, {
            y: -10, 
            scale: isDesktop ? 1.06 : 1.01, 
            boxShadow: "0 25px 90px rgba(0, 244, 192, 0.20)", 
            duration: 0.6, 
            ease: "power2.out"
          });

          gsap.to("[data-featured-glow]", {
            opacity: 0.6,
            scale: 1.05,
            duration: 0.6,
            ease: "power2.out"
          });
        });

        featuredCard.addEventListener("mouseleave", () => {
          const isDesktop = window.innerWidth >= 1024;
          
          gsap.to(featuredCard, {
            y: floatTween.progress() * -8, 
            scale: isDesktop ? 1.05 : 1, 
            boxShadow: "0 20px 80px rgba(0, 168, 132, 0.15)",
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => floatTween.play() 
          });

          gsap.to("[data-featured-glow]", {
            opacity: 0.3,
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          });
        });
      }

    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="planos"
      className="
        relative
        overflow-hidden
        bg-[#020618]
        text-white
        px-5
        py-16
        sm:px-8
        sm:py-20
        lg:px-12
        lg:py-24
      "
    >
      {/* =========================
          FUNDOS LUMINOSOS
      ========================= */}
      <div
        data-plans-glow-1
        className="
          pointer-events-none
          absolute
          -right-[150px]
          top-[10%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-gradient-to-br
          from-verde-principal/20
          to-transparent
          blur-[120px]
        "
      />
      <div
        data-plans-glow-2
        className="
          pointer-events-none
          absolute
          -left-[250px]
          bottom-[5%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-gradient-to-tr
          from-ciano-claro/15
          to-transparent
          blur-[140px]
        "
      />

      <div className="relative mx-auto w-full max-w-[1240px]">
        {/* =========================
            INTRO
        ========================= */}
        <div data-plans-intro className="mx-auto mb-12 max-w-[850px] text-center lg:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-verde-principal/30 bg-verde-principal/15 px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-ciano-claro backdrop-blur-md">
            Planos de Assinatura
          </span>

          <h2 className="mt-5 text-3xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            Da visibilidade à automação.
            <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-verde-principal to-ciano-claro">
              Escolha até onde você quer ir.
            </span>
          </h2>
        </div>

        {/* =========================
            PLANOS (GRID)
        ========================= */}
        <div data-plans-grid className="grid gap-5 lg:grid-cols-3 lg:items-center lg:gap-6">
          {plans.map((plan) => {
            const isPro = plan.featured;

            return (
              <article
                key={plan.name}
                data-plan-card
                {...(isPro ? { "data-featured-card": "true" } : {})}
                className={`
                  group
                  relative
                  flex
                  w-full
                  flex-col
                  overflow-hidden
                  rounded-[28px]
                  transition-all
                  duration-500
                  ${
                    isPro
                      ? `
                        z-20
                        border
                        border-transparent
                        shadow-[0_20px_80px_rgba(0,168,132,0.15)]
                        lg:scale-[1.05]
                      `
                      : `
                        z-10
                        border
                        border-white/10
                        bg-white/[0.03]
                        p-5
                        sm:p-6
                        hover:-translate-y-1.5
                        hover:border-verde-principal/30
                        hover:bg-white/[0.05]
                        hover:shadow-[0_20px_60px_rgba(0,168,132,0.1)]
                      `
                  }
                `}
                style={isPro ? { padding: '1px' } : undefined}
              >
                
                {/* LUZES E BORDA ANIMADA DO PRO */}
                {isPro && (
                  <>
                    <div className="absolute left-1/2 top-1/2 z-0 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,rgba(0,168,132,0.4)_80%,rgba(0,244,192,0.8)_100%)] opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
                    <div data-featured-glow className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-verde-principal/15 to-ciano-claro/15 blur-[60px] opacity-30" />
                  </>
                )}

                {/* CONTEÚDO DO CARD */}
                <div 
                  className={`
                    relative z-10 flex h-full flex-col
                    ${isPro ? "rounded-[27px] bg-[#050B1A]/95 p-6 backdrop-blur-2xl sm:p-7" : ""}
                  `}
                >
                  
                  {/* HEADER DO CARD */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`text-[8px] font-bold uppercase tracking-[0.16em] ${isPro ? "text-ciano-claro" : "text-gray-400 group-hover:text-ciano-claro transition-colors"}`}>
                        LeadIn
                      </span>
                      <h3 className="mt-1.5 text-2xl font-black tracking-[-0.04em] text-white">
                        {plan.name}
                      </h3>
                    </div>

                    {isPro && (
                      <div className="flex items-center gap-1.5 rounded-full border border-ciano-claro/30 bg-ciano-claro/10 px-2.5 py-1 shadow-[0_0_15px_rgba(0,244,192,0.15)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-ciano-claro animate-pulse" />
                        <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-ciano-claro">
                          Mais escolhido
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <p className="mt-3 min-h-[40px] max-w-[280px] text-[13px] leading-5 text-gray-400">
                    {plan.promise}
                  </p>

                  {/* PREÇO */}
                  <div data-plan-price className="mt-6">
                    <div className="flex items-start gap-1">
                      <span className={`mt-1.5 text-xs font-bold ${isPro ? "text-ciano-claro" : "text-gray-500"}`}>
                        R$
                      </span>
                      <strong className="text-4xl font-black leading-none tracking-[-0.05em] text-white sm:text-5xl">
                        {plan.price}
                      </strong>
                      <span className="mt-auto pb-1 text-[9px] text-gray-500">
                        /mês
                      </span>
                    </div>
                  </div>

                  {/* LIMITE ESTRUTURAL */}
                  <div className={`mt-5 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${isPro ? "border-verde-principal/20 bg-verde-principal/5" : "border-white/5 bg-white/[0.02] group-hover:border-white/10 group-hover:bg-white/5"}`}>
                    <span className="text-[7px] font-bold uppercase tracking-[0.12em] text-gray-400">
                      Estrutura
                    </span>
                    <strong className="mt-0.5 block text-[11px] text-gray-200">
                      {plan.limit}
                    </strong>
                  </div>

                  {/* FEATURES */}
                  <div className="mt-5 flex-1">
                    <span className="text-[7px] font-bold uppercase tracking-[0.12em] text-gray-500">
                      O que está incluído
                    </span>
                    <div className="mt-3 space-y-2.5 overflow-hidden">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} data-feature-item className="flex items-start gap-2.5">
                          <div
                            className={`mt-[1px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                              isPro ? "bg-verde-principal/20 shadow-[0_0_10px_rgba(0,168,132,0.2)]" : "bg-white/5 group-hover:bg-verde-principal/15"
                            }`}
                          >
                            <Check size={8} strokeWidth={3} className={isPro ? "text-ciano-claro" : "text-gray-400 group-hover:text-verde-principal transition-colors"} />
                          </div>
                          <span className="text-[12px] leading-[1.3] text-gray-300 group-hover:text-gray-100 transition-colors">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA BUTTON */}
                  <a
                    href={plan.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      group/cta
                      relative
                      mt-6
                      flex
                      items-center
                      justify-between
                      gap-3
                      rounded-full
                      px-5
                      py-3.5
                      text-[11px]
                      font-bold
                      transition-all
                      duration-300
                      ${
                        isPro
                          ? `bg-ciano-claro text-[#020618] shadow-[0_10px_25px_rgba(0,244,192,0.3)] hover:bg-white hover:scale-[1.03]`
                          : `border border-white/10 bg-white/5 text-white hover:bg-ciano-claro hover:border-ciano-claro hover:text-[#020618]`
                      }
                    `}
                  >
                    <span>{plan.cta}</span>
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1" />
                  </a>

                </div>
              </article>
            );
          })}
        </div>

        {/* =========================
            NOTA FINAL
        ========================= */}
        <div data-plans-note className="mt-10 grid gap-4 rounded-[20px] border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md sm:grid-cols-[auto_1fr] sm:items-start lg:p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-verde-principal/20">
            <CircleDollarSign size={16} className="text-ciano-claro" />
          </div>
          <div>
            <strong className="text-[13px] text-white">Importante sobre os valores</strong>
            <p className="mt-1.5 max-w-[800px] text-[11px] leading-5 text-gray-400">
              Implantação e migração são cotadas à parte pela WR Digital. As conversas da Meta são cobradas diretamente pela Meta na conta do seu WhatsApp.
            </p>
          </div>
        </div>

        {/* =========================
            MINI FECHAMENTO COM BOTÃO
        ========================= */}
        <div data-plans-footer className="mt-10 flex flex-col items-center text-center pb-12">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Sparkles size={14} className="text-gray-400" />
          </div>
          <p className="mt-3 max-w-[520px] text-[13px] leading-5 text-gray-500">
            Ainda não sabe qual plano faz sentido para sua operação? A WR pode avaliar sua estrutura com você.
          </p>
          
          <a
            href="https://wa.me/5521995261742?text=Ol%C3%A1%21%20Gostaria%20de%20uma%20avalia%C3%A7%C3%A3o%20para%20escolher%20o%20melhor%20plano."
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              mt-6
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-verde-principal/30
              bg-verde-principal/10
              px-6
              py-3
              text-[11px]
              font-bold
              uppercase
              tracking-wider
              text-ciano-claro
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-verde-principal/20
              hover:shadow-[0_10px_25px_rgba(0,168,132,0.15)]
            "
          >
            Falar com a WR Digital
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}