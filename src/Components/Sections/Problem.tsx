import {
  useRef,
} from "react";

import {
  Radar,
  Zap,
} from "lucide-react";

import {
  gsap,
  useGSAP,
} from "../../lib/gsap";

const conversations = [
  {
    name: "Alcides",
    minutes: 2,
    status: "critical",
  },
  {
    name: "Espaço",
    minutes: 4,
    status: "critical",
  },
  {
    name: "Ignez",
    minutes: 6,
    status: "attention",
  },
  {
    name: "Yássara",
    minutes: 10,
    status: "safe",
  },
  {
    name: "Comércio",
    minutes: 13,
    status: "safe",
  },
  {
    name: "Marcos",
    minutes: 17,
    status: "safe",
  },
];

function getStatusColor(
  status: string,
) {
  if (status === "critical") {
    return "bg-red-500";
  }

  if (status === "attention") {
    return "bg-amber-500";
  }

  return "bg-verde-principal";
}

function getStatusTextColor(
  status: string,
) {
  if (status === "critical") {
    return "text-red-400";
  }

  if (status === "attention") {
    return "text-amber-400";
  }

  return "text-verde-principal";
}

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      intro
        .from(
          "[data-problem-label]",
          {
            opacity: 0,
            y: 18,
            duration: 0.4,
          },
        )
        .from(
          "[data-problem-title]",
          {
            opacity: 0,
            y: 60,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.15",
        )
        .from(
          "[data-problem-copy]",
          {
            opacity: 0,
            y: 24,
            duration: 0.6,
          },
          "-=0.5",
        );

      gsap.from(
        "[data-radar-panel]",
        {
          opacity: 0,
          y: 65,
          scale: 0.97,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-radar-panel]",
            start: "top 83%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.from(
        "[data-radar-stat]",
        {
          opacity: 0,
          y: 15,
          stagger: 0.12,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-radar-stats]",
            start: "top 80%",
          },
        },
      );

      gsap.from(
        "[data-conversation-row]",
        {
          opacity: 0,
          x: 25,
          stagger: 0.1,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-conversation-chart]",
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        "[data-urgency-bar]",
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          stagger: 0.1,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-conversation-chart]",
            start: "top 76%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.from(
        "[data-critical-line]",
        {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-conversation-chart]",
            start: "top 78%",
          },
        },
      );

      gsap.fromTo(
        "[data-pressure-line]",
        {
          strokeDashoffset: 1,
        },
        {
          strokeDashoffset: 0,
          duration: 1.7,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "[data-pressure-chart]",
            start: "top 84%",
          },
        },
      );

      gsap.from(
        "[data-pressure-point]",
        {
          opacity: 0,
          scale: 0,
          transformOrigin: "center",
          stagger: 0.12,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: "[data-pressure-chart]",
            start: "top 82%",
          },
        },
      );

      gsap.from(
        "[data-problem-card]",
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
          stagger: 0.12,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-problem-cards]",
            start: "top 85%",
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
      id="problema"
      className="
        relative
        overflow-hidden
        bg-escuro-principal
        px-5
        py-8
        text-white
        sm:px-8
        sm:py-12
        lg:px-12
        lg:py-16
      "
    >
      {/* LUZ DE FUNDO */}
      <div
        className="
          pointer-events-none
          absolute
          -left-[200px]
          top-[20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-verde-principal/10
          blur-[140px]
        "
      />

      <div
        className="
          relative
          mx-auto
          grid
          w-full
          max-w-[1240px]
          gap-10
          lg:grid-cols-[0.8fr_1.2fr]
          lg:gap-14
          lg:items-start
        "
      >
        {/* =========================
            TEXTO
        ========================= */}
        <div
          className="
            lg:sticky
            lg:top-28
          "
        >
          <span
            data-problem-label
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-ciano-claro
            "
          >
            O problema
          </span>

          <h2
            data-problem-title
            className="
              mt-4
              max-w-[620px]
              text-4xl
              font-black
              leading-[0.95]
              tracking-[-0.05em]
               sm:text-4xl

              lg:text-5xl
            "
          >
            24 horas
            parecem muito.

            <span
              className="
                mt-2
                block
                text-ciano-claro
                 sm:text-4xl

              lg:text-5xl
              "
            >
              Até várias conversas
              começarem a correr
              ao mesmo tempo.
            </span>
          </h2>

          <p
            data-problem-copy
            className="
              mt-6
              max-w-[510px]
              text-base
              leading-7
              text-white/50
              sm:text-lg
              sm:leading-8
            "
          >
            Sua equipe não precisa simplesmente responder mais rápido. Ela precisa saber qual conversa deve receber atenção primeiro.
          </p>
        </div>

        {/* =========================
            PAINEL E CARDS
        ========================= */}
        <div className="flex flex-col gap-4">
          <div
            data-radar-panel
            className="
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-white/[0.035]
              backdrop-blur-xl
            "
          >
            {/* HEADER */}
            <div
              className="
                flex
                flex-col
                gap-5
                border-b
                border-white/10
                p-5
                sm:flex-row
                sm:items-start
                sm:justify-between
                sm:p-7
              "
            >
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Radar
                    size={14}
                    className="
                      text-ciano-claro
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-white/35
                    "
                  >
                    Radar de janela
                  </span>
                </div>

                <h3
                  className="
                    mt-3
                    text-xl
                    font-bold
                    tracking-[-0.03em]
                    sm:text-2xl
                  "
                >
                  Quem precisa de
                  atenção primeiro?
                </h3>

                <p
                  className="
                    mt-2
                    max-w-[430px]
                    text-xs
                    leading-5
                    text-white/35
                  "
                >
                  Uma simulação de como diferentes conversas podem disputar a atenção da equipe ao mesmo tempo.
                </p>
              </div>

              <div
                className="
                  flex
                  w-fit
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
                  className="
                    h-2
                    w-2
                    animate-pulse
                    rounded-full
                    bg-verde-principal
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-verde-principal
                  "
                >
                  ao vivo
                </span>
              </div>
            </div>

            {/* STATUS */}
            <div
              data-radar-stats
              className="
                grid
                grid-cols-3
                border-b
                border-white/10
              "
            >
              <div
                data-radar-stat
                className="
                  border-r
                  border-white/10
                  px-4
                  py-3
                "
              >
                <strong
                  className="
                    block
                    text-lg
                    text-red-400
                  "
                >
                  2
                </strong>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-white/30
                  "
                >
                  críticas
                </span>
              </div>

              <div
                data-radar-stat
                className="
                  border-r
                  border-white/10
                  px-4
                  py-3
                "
              >
                <strong
                  className="
                    block
                    text-lg
                    text-amber-400
                  "
                >
                  1
                </strong>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-white/30
                  "
                >
                  atenção
                </span>
              </div>

              <div
                data-radar-stat
                className="
                  px-4
                  py-3
                "
              >
                <strong
                  className="
                    block
                    text-lg
                    text-verde-principal
                  "
                >
                  3
                </strong>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-white/30
                  "
                >
                  estáveis
                </span>
              </div>
            </div>

            {/* GRÁFICO PRINCIPAL */}
            <div
              data-conversation-chart
              className="
                p-5
                sm:p-7
              "
            >
              <div
                className="
                  mb-5
                  flex
                  items-end
                  justify-between
                  gap-4
                "
              >
                <div>
                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-white/30
                    "
                  >
                    Tempo restante
                  </span>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-white/45
                    "
                  >
                    Quanto menor a barra, maior a urgência.
                  </p>
                </div>

                <span
                  className="
                    hidden
                    text-[9px]
                    text-red-400/70
                    sm:block
                  "
                >
                  ≤ 5 min = crítico
                </span>
              </div>

              <div
                className="
                  relative
                "
              >
                {conversations.map(
                  (
                    conversation,
                  ) => {
                    const width =
                      Math.max(
                        8,
                        (
                          conversation.minutes /
                          20
                        ) * 100,
                      );

                    return (
                      <div
                        key={
                          conversation.name
                        }
                        data-conversation-row
                        className="
                          grid
                          grid-cols-[64px_1fr_42px]
                          items-center
                          gap-3
                          py-2
                        "
                      >
                        {/* NOME */}
                        <span
                          className="
                            truncate
                            text-[10px]
                            font-medium
                            text-white/55
                          "
                        >
                          {
                            conversation.name
                          }
                        </span>

                        {/* TRACK */}
                        <div
                          className="
                            relative
                            h-[16px]
                            overflow-visible
                            rounded-full
                            bg-white/[0.055]
                          "
                        >
                          <div
                            data-urgency-bar
                            className={`
                              relative
                              h-full
                              rounded-full
                              ${getStatusColor(
                                conversation.status,
                              )}
                            `}
                            style={{
                              width:
                                `${width}%`,
                            }}
                          >
                            <div
                              className="
                                absolute
                                inset-0
                                rounded-full
                                bg-white/10
                              "
                            />
                          </div>
                        </div>

                        {/* TEMPO */}
                        <span
                          className={`
                            text-right
                            font-mono
                            text-[10px]
                            font-bold
                            ${getStatusTextColor(
                              conversation.status,
                            )}
                          `}
                        >
                          {
                            conversation.minutes
                          }
                          m
                        </span>
                      </div>
                    );
                  },
                )}

                {/* EIXO */}
                <div
                  className="
                    ml-[77px]
                    mr-[48px]
                    mt-1.5
                    flex
                    justify-between
                    text-[8px]
                    text-white/20
                  "
                >
                  <span>0m</span>
                  <span>5m</span>
                  <span>10m</span>
                  <span>15m</span>
                  <span>20m</span>
                </div>
              </div>

              {/* PRIORIDADE */}
              <div
                className="
                  mt-5
                  flex
                  flex-col
                  gap-3
                  rounded-2xl
                  border
                  border-red-500/15
                  bg-red-500/[0.045]
                  p-3.5
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-red-500/10
                      text-red-400
                    "
                  >
                    <Zap
                      size={15}
                    />
                  </div>

                  <div>
                    <span
                      className="
                        block
                        text-[9px]
                        uppercase
                        tracking-[0.14em]
                        text-white/30
                      "
                    >
                      Prioridade agora
                    </span>

                    <strong
                      className="
                        mt-0.5
                        block
                        text-sm
                      "
                    >
                      Alcides Sales
                    </strong>
                  </div>
                </div>

                <div
                  className="
                    sm:text-right
                  "
                >
                  <strong
                    className="
                      block
                      font-mono
                      text-sm
                      text-red-400
                    "
                  >
                    02 min
                  </strong>

                  <span
                    className="
                      text-[9px]
                      text-white/30
                    "
                  >
                    janela crítica
                  </span>
                </div>
              </div>

              {/* MINI GRÁFICO */}
              <div
                data-pressure-chart
                className="
                  mt-5
                  grid
                  gap-4
                  border-t
                  border-white/10
                  pt-5
                  sm:grid-cols-[1fr_140px]
                  sm:items-center
                "
              >
                <div>
                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-white/30
                    "
                  >
                    Pressão da fila
                  </span>

                  <p
                    className="
                      mt-1.5
                      max-w-[330px]
                      text-xs
                      leading-5
                      text-white/40
                    "
                  >
                    Sem uma ordem clara, mais conversas entram na zona de risco ao mesmo tempo.
                  </p>
                </div>

                <svg
                  viewBox="0 0 160 70"
                  className="
                    h-[60px]
                    w-full
                  "
                  aria-hidden="true"
                >
                  <path
                    d="
                      M 4 60
                      C 28 58,
                        30 51,
                        48 49
                      C 66 47,
                        64 39,
                        82 36
                      C 100 33,
                        105 24,
                        122 21
                      C 137 17,
                        145 10,
                        156 7
                    "
                    fill="none"
                    stroke="var(--color-ciano-claro)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset="1"
                    data-pressure-line
                  />

                  {[
                    [4, 60],
                    [48, 49],
                    [82, 36],
                    [122, 21],
                    [156, 7],
                  ].map(
                    (
                      [x, y],
                      index,
                    ) => (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="var(--color-ciano-claro)"
                        data-pressure-point
                      />
                    ),
                  )}
                </svg>
              </div>

              <p
                className="
                  mt-2
                  text-[8px]
                  text-white/20
                "
              >
                Dados ilustrativos para demonstrar a lógica da priorização.
              </p>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}