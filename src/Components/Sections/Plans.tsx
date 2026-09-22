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
    promise:
      "O sistema avisa quando algo precisa da sua atenção.",

    price: "297",

    limit:
      "Até 5 atendentes · 1 número",

    features: [
      "Radar de janela de 24h",
      "Ranking ao vivo e painéis",
      "Kanban, funil e campanhas",
      "Controle de custo da Meta",
      "Alerta de lead abandonado",
    ],

    cta:
      "Começar no Básico",

    url:
      "https://wa.me/552231991580?text=Quero%20o%20LeadIn%20B%C3%A1sico",

    featured: false,
  },

  {
    name: "Pro",
    promise:
      "O sistema explica o porquê e sugere o próximo passo.",

    price: "697",

    limit:
      "Até 10 atendentes · 3 números",

    features: [
      "Tudo do Básico",
      "Copiloto sugerindo resposta",
      "Fechamento do mês analisado",
      "Lead classificado por temperatura",
      "Resumo automático na transferência",
      "Reativação da base parada",
    ],

    cta:
      "Falar sobre o Pro",

    url:
      "https://wa.me/552231991580?text=Quero%20o%20LeadIn%20Pro",

    featured: true,
  },

  {
    name: "Enterprise",
    promise:
      "O sistema conversa com o resto da sua empresa.",

    price: "1.497",

    limit:
      "Atendentes e canais conforme contrato",

    features: [
      "Tudo do Pro",
      "Integração com ERP",
      "API e webhooks liberados",
      "Automações sob medida",
      "Suporte prioritário",
    ],

    cta:
      "Conversar sobre Enterprise",

    url:
      "https://wa.me/552231991580?text=Quero%20o%20LeadIn%20Enterprise",

    featured: false,
  },
];


export default function Plans() {
  const sectionRef =
    useRef<HTMLElement>(null);


  useGSAP(
    () => {

      /*
       * ==========================
       * INTRO
       * ==========================
       */

      gsap.from(
        "[data-plans-intro]",
        {
          opacity: 0,

          y: 50,

          duration: 0.9,

          ease:
            "power3.out",

          scrollTrigger: {
            trigger:
              sectionRef.current,

            start:
              "top 78%",

            toggleActions:
              "play none none reverse",
          },
        },
      );


      /*
       * ==========================
       * CARDS
       * ==========================
       *
       * Sem stagger.
       * Os três entram juntos.
       */

      gsap.from(
        "[data-plan-card]",
        {
          opacity: 0,

          y: 55,

          scale: 0.97,

          duration: 0.95,

          ease:
            "power3.out",

          scrollTrigger: {
            trigger:
              "[data-plans-grid]",

            start:
              "top 82%",

            toggleActions:
              "play none none reverse",
          },
        },
      );


      /*
       * ==========================
       * LINHAS SUPERIORES
       * ==========================
       */

      gsap.from(
        "[data-plan-line]",
        {
          scaleX: 0,

          transformOrigin:
            "left center",

          duration: 1.2,

          ease:
            "power4.out",

          scrollTrigger: {
            trigger:
              "[data-plans-grid]",

            start:
              "top 76%",
          },
        },
      );


      /*
       * ==========================
       * PREÇOS
       * ==========================
       */

      gsap.from(
        "[data-plan-price]",
        {
          opacity: 0,

          y: 20,

          scale: 0.9,

          duration: 0.8,

          ease:
            "back.out(1.4)",

          scrollTrigger: {
            trigger:
              "[data-plans-grid]",

            start:
              "top 74%",
          },
        },
      );


      /*
       * ==========================
       * FEATURES
       * ==========================
       *
       * Todas aparecem juntas.
       */

      gsap.from(
        "[data-plan-feature]",
        {
          opacity: 0,

          x: 18,

          duration: 0.7,

          ease:
            "power3.out",

          scrollTrigger: {
            trigger:
              "[data-plans-grid]",

            start:
              "top 70%",
          },
        },
      );


      /*
       * ==========================
       * CHECKS
       * ==========================
       */

      gsap.from(
        "[data-plan-check]",
        {
          scale: 0,

          opacity: 0,

          duration: 0.55,

          ease:
            "back.out(2)",

          scrollTrigger: {
            trigger:
              "[data-plans-grid]",

            start:
              "top 68%",
          },
        },
      );


      /*
       * ==========================
       * BADGE DO PRO
       * ==========================
       */

      gsap.to(
        "[data-pro-badge-dot]",
        {
          scale: 1.8,

          opacity: 0.25,

          duration: 1,

          repeat: -1,

          yoyo: true,

          ease:
            "sine.inOut",
        },
      );


      /*
       * ==========================
       * BRILHO DO PRO
       * ==========================
       */

      gsap.to(
        "[data-pro-shine]",
        {
          xPercent: 450,

          duration: 4,

          repeat: -1,

          repeatDelay: 1.5,

          ease:
            "power1.inOut",
        },
      );


      /*
       * ==========================
       * NOTA FINAL
       * ==========================
       */

      gsap.from(
        "[data-plans-note]",
        {
          opacity: 0,

          y: 25,

          duration: 0.75,

          ease:
            "power3.out",

          scrollTrigger: {
            trigger:
              "[data-plans-note]",

            start:
              "top 92%",
          },
        },
      );

    },

    {
      scope: sectionRef,
    },
  );


  return (
    <section
      ref={sectionRef}
      id="planos"
      className="
        relative
        overflow-hidden
        bg-claro
        px-5
        py-24

        sm:px-8
        sm:py-28

        lg:px-12
        lg:py-32
      "
    >

      {/* =========================
          FUNDO
      ========================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[220px]
          top-[5%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-verde-principal/[0.07]
          blur-[150px]
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          -left-[250px]
          bottom-[-100px]
          h-[600px]
          w-[600px]
          rounded-full
          bg-ciano-claro/[0.05]
          blur-[160px]
        "
      />


      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1240px]
        "
      >

        {/* =========================
            INTRO
        ========================= */}

        <div
          data-plans-intro
          className="
            mx-auto
            mb-16
            max-w-[850px]
            text-center

            lg:mb-20
          "
        >

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-verde-escuro
            "
          >
            Planos
          </span>


          <h2
            className="
              mt-5
              text-4xl
              font-black
              leading-[0.94]
              tracking-[-0.055em]
              text-escuro-principal

              sm:text-5xl

              lg:text-[72px]
            "
          >
            Da visibilidade
            à automação.

            <span
              className="
                mt-2
                block
                text-verde-principal
              "
            >
              Escolha até onde
              você quer ir.
            </span>
          </h2>


          <p
            className="
              mx-auto
              mt-7
              max-w-[620px]
              text-base
              leading-7
              text-escuro-principal/50

              sm:text-lg
              sm:leading-8
            "
          >
            Comece organizando as
            conversas ou leve o
            LeadIn para dentro de
            toda a operação da
            empresa.
          </p>

        </div>


        {/* =========================
            PLANOS
        ========================= */}

        <div
          data-plans-grid
          className="
            grid
            gap-5

            lg:grid-cols-3
            lg:items-stretch
          "
        >

          {plans.map(
            (
              plan,
            ) => (

              <article
                key={
                  plan.name
                }
                data-plan-card
                className={`
                  group
                  relative
                  flex
                  min-w-0
                  flex-col
                  overflow-hidden
                  rounded-[30px]
                  border
                  p-6
                  transition-all
                  duration-500

                  sm:p-7

                  lg:p-8

                  ${
                    plan.featured
                      ? `
                        border-verde-principal/35
                        bg-escuro-principal
                        text-white
                        shadow-[0_30px_90px_rgba(2,6,24,0.14)]

                        lg:-translate-y-4
                      `
                      : `
                        border-escuro-principal/[0.07]
                        bg-white
                        text-escuro-principal
                        shadow-sm

                        hover:-translate-y-1
                        hover:border-verde-principal/25
                        hover:shadow-[0_25px_70px_rgba(2,6,24,0.08)]
                      `
                  }
                `}
              >

                {/* LINHA SUPERIOR */}

                <div
                  data-plan-line
                  className={`
                    absolute
                    left-0
                    right-0
                    top-0
                    h-[3px]

                    ${
                      plan.featured
                        ? `
                          bg-gradient-to-r
                          from-verde-principal
                          via-ciano-claro
                          to-verde-principal
                        `
                        : `
                          bg-verde-principal/30
                        `
                    }
                  `}
                />


                {/* BRILHO PRO */}

                {plan.featured && (
                  <div
                    data-pro-shine
                    className="
                      pointer-events-none
                      absolute
                      -left-[40%]
                      top-0
                      h-full
                      w-[20%]
                      rotate-[18deg]
                      bg-gradient-to-r
                      from-transparent
                      via-white/[0.04]
                      to-transparent
                      blur-xl
                    "
                  />
                )}


                {/* =================
                    HEADER
                ================= */}

                <div
                  className="
                    relative
                  "
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >

                    <div>

                      <span
                        className={`
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.16em]

                          ${
                            plan.featured
                              ? `
                                text-ciano-claro
                              `
                              : `
                                text-verde-escuro
                              `
                          }
                        `}
                      >
                        LeadIn
                      </span>


                      <h3
                        className="
                          mt-2
                          text-3xl
                          font-black
                          tracking-[-0.045em]
                        "
                      >
                        {plan.name}
                      </h3>

                    </div>


                    {plan.featured && (

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-verde-principal/20
                          bg-verde-principal/10
                          px-3
                          py-1.5
                        "
                      >

                        <span
                          data-pro-badge-dot
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-verde-principal
                          "
                        />


                        <span
                          className="
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-[0.13em]
                            text-verde-principal
                          "
                        >
                          Mais escolhido
                        </span>

                      </div>

                    )}

                  </div>


                  <p
                    className={`
                      mt-5
                      min-h-[48px]
                      max-w-[330px]
                      text-sm
                      leading-6

                      ${
                        plan.featured
                          ? `
                            text-white/45
                          `
                          : `
                            text-escuro-principal/45
                          `
                      }
                    `}
                  >
                    {plan.promise}
                  </p>

                </div>


                {/* =================
                    PREÇO
                ================= */}

                <div
                  data-plan-price
                  className="
                    relative
                    mt-8
                  "
                >

                  <div
                    className="
                      flex
                      items-start
                      gap-1
                    "
                  >

                    <span
                      className={`
                        mt-2
                        text-sm
                        font-bold

                        ${
                          plan.featured
                            ? `
                              text-ciano-claro
                            `
                            : `
                              text-verde-escuro
                            `
                        }
                      `}
                    >
                      R$
                    </span>


                    <strong
                      className="
                        text-5xl
                        font-black
                        leading-none
                        tracking-[-0.065em]

                        sm:text-6xl
                      "
                    >
                      {plan.price}
                    </strong>


                    <span
                      className={`
                        mt-auto
                        pb-1
                        text-[10px]

                        ${
                          plan.featured
                            ? `
                              text-white/30
                            `
                            : `
                              text-escuro-principal/30
                            `
                        }
                      `}
                    >
                      /mês
                    </span>

                  </div>

                </div>


                {/* =================
                    LIMITE
                ================= */}

                <div
                  className={`
                    mt-7
                    rounded-2xl
                    border
                    px-4
                    py-3

                    ${
                      plan.featured
                        ? `
                          border-white/[0.08]
                          bg-white/[0.04]
                        `
                        : `
                          border-escuro-principal/[0.06]
                          bg-escuro-principal/[0.025]
                        `
                    }
                  `}
                >

                  <span
                    className={`
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.14em]

                      ${
                        plan.featured
                          ? `
                            text-white/25
                          `
                          : `
                            text-escuro-principal/25
                          `
                      }
                    `}
                  >
                    Estrutura
                  </span>


                  <strong
                    className="
                      mt-1
                      block
                      text-xs
                    "
                  >
                    {plan.limit}
                  </strong>

                </div>


                {/* =================
                    FEATURES
                ================= */}

                <div
                  className="
                    mt-7
                    flex-1
                  "
                >

                  <span
                    className={`
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.14em]

                      ${
                        plan.featured
                          ? `
                            text-white/25
                          `
                          : `
                            text-escuro-principal/25
                          `
                      }
                    `}
                  >
                    O que está incluído
                  </span>


                  <div
                    className="
                      mt-4
                      space-y-3.5
                    "
                  >

                    {plan.features.map(
                      (
                        feature,
                      ) => (

                        <div
                          key={
                            feature
                          }
                          data-plan-feature
                          className="
                            flex
                            items-start
                            gap-3
                          "
                        >

                          <div
                            data-plan-check
                            className={`
                              mt-0.5
                              flex
                              h-5
                              w-5
                              shrink-0
                              items-center
                              justify-center
                              rounded-full

                              ${
                                plan.featured
                                  ? `
                                    bg-verde-principal/15
                                  `
                                  : `
                                    bg-verde-principal/10
                                  `
                              }
                            `}
                          >

                            <Check
                              size={10}
                              strokeWidth={3}
                              className="
                                text-verde-principal
                              "
                            />

                          </div>


                          <span
                            className={`
                              text-[11px]
                              leading-5

                              ${
                                plan.featured
                                  ? `
                                    text-white/55
                                  `
                                  : `
                                    text-escuro-principal/55
                                  `
                              }
                            `}
                          >
                            {feature}
                          </span>

                        </div>

                      ),
                    )}

                  </div>

                </div>


                {/* =================
                    CTA
                ================= */}

                <a
                  href={plan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group/cta
                    relative
                    mt-8
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-full
                    px-5
                    py-3.5
                    text-xs
                    font-bold
                    transition-all
                    duration-300

                    ${
                      plan.featured
                        ? `
                          bg-verde-principal
                          text-escuro-principal

                          hover:bg-ciano-claro
                        `
                        : `
                          border
                          border-escuro-principal/10
                          bg-escuro-principal
                          text-white

                          hover:-translate-y-0.5
                          hover:bg-verde-principal
                          hover:text-escuro-principal
                        `
                    }
                  `}
                >

                  <span>
                    {plan.cta}
                  </span>


                  <ArrowUpRight
                    size={15}
                    className="
                      transition-transform
                      duration-300

                      group-hover/cta:translate-x-0.5
                      group-hover/cta:-translate-y-0.5
                    "
                  />

                </a>

              </article>

            ),
          )}

        </div>


        {/* =========================
            NOTA
        ========================= */}

        <div
          data-plans-note
          className="
            mt-10
            grid
            gap-4
            rounded-[24px]
            border
            border-escuro-principal/[0.07]
            bg-white/60
            p-5

            sm:grid-cols-[auto_1fr]
            sm:items-start

            lg:p-6
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-verde-principal/10
            "
          >
            <CircleDollarSign
              size={18}
              className="
                text-verde-escuro
              "
            />
          </div>


          <div>
            <strong
              className="
                text-sm
                text-escuro-principal
              "
            >
              Importante sobre os valores
            </strong>


            <p
              className="
                mt-2
                max-w-[800px]
                text-xs
                leading-5
                text-escuro-principal/45
              "
            >
              Implantação e migração são
              cotadas à parte pela WR Digital.
              As conversas da Meta são cobradas
              diretamente pela Meta na conta
              do seu WhatsApp.
            </p>
          </div>

        </div>


        {/* =========================
            MINI FECHAMENTO
        ========================= */}

        <div
          className="
            mt-14
            flex
            flex-col
            items-center
            text-center
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-verde-principal/10
            "
          >
            <Sparkles
              size={16}
              className="
                text-verde-principal
              "
            />
          </div>


          <p
            className="
              mt-4
              max-w-[520px]
              text-sm
              leading-6
              text-escuro-principal/40
            "
          >
            Ainda não sabe qual plano
            faz sentido para sua operação?
            A WR pode avaliar sua estrutura
            com você.
          </p>

        </div>

      </div>

    </section>
  );
}