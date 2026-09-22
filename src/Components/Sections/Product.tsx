import { useRef } from "react";

import {
  Activity,
  CircleDollarSign,
  Clock3,
  MessageCircleMore,
  Users,
} from "lucide-react";

import {
  gsap,
  useGSAP,
} from "../../lib/gsap";


const features = [
  {
    number: "01",
    eyebrow: "Radar",
    title: "Veja quem está ficando sem tempo.",
    text:
      "As conversas deixam de ser apenas uma lista. O LeadIn mostra quais janelas estão mais próximas de fechar.",
    icon: Clock3,
    type: "radar",
  },

  {
    number: "02",
    eyebrow: "Prioridade",
    title: "Saiba quem atender primeiro.",
    text:
      "Um ranking organiza as oportunidades por urgência, para sua equipe não precisar decidir no escuro.",
    icon: Activity,
    type: "priority",
  },

  {
    number: "03",
    eyebrow: "Custo",
    title: "Entenda o custo de deixar uma janela fechar.",
    text:
      "A equipe consegue visualizar o impacto potencial de perder o momento certo de continuar uma conversa.",
    icon: CircleDollarSign,
    type: "cost",
  },

  {
    number: "04",
    eyebrow: "Equipe",
    title: "Um número. Vários atendentes.",
    text:
      "Centralize o atendimento e acompanhe quem está cuidando de cada oportunidade.",
    icon: Users,
    type: "team",
  },
];


function FeatureVisual({
  type,
}: {
  type: string;
}) {
  /*
   * ==========================
   * RADAR
   * ==========================
   */

  if (type === "radar") {
    return (
      <div
        data-feature-visual
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-escuro-principal/[0.06]
          bg-escuro-principal/[0.025]
          p-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-escuro-principal/30
            "
          >
            Janela ativa
          </span>

          <div
            className="
              flex
              items-center
              gap-1.5
            "
          >
            <span
              data-pulse-dot
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
                tracking-[0.12em]
                text-verde-escuro
              "
            >
              ao vivo
            </span>
          </div>
        </div>


        <div
          className="
            mt-5
            space-y-3
          "
        >
          {[
            {
              name: "Alcides",
              time: "02m",
              width: "18%",
              color: "bg-red-500",
            },
            {
              name: "Espaço",
              time: "04m",
              width: "34%",
              color: "bg-red-500",
            },
            {
              name: "Ignez",
              time: "06m",
              width: "52%",
              color: "bg-amber-500",
            },
          ].map(
            (item) => (
              <div
                key={item.name}
                className="
                  grid
                  grid-cols-[52px_1fr_32px]
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    truncate
                    text-[9px]
                    font-medium
                    text-escuro-principal/45
                  "
                >
                  {item.name}
                </span>


                <div
                  className="
                    h-1.5
                    overflow-hidden
                    rounded-full
                    bg-escuro-principal/[0.06]
                  "
                >
                  <div
                    data-mini-bar
                    className={`
                      h-full
                      rounded-full
                      ${item.color}
                    `}
                    style={{
                      width:
                        item.width,
                    }}
                  />
                </div>


                <span
                  className="
                    text-right
                    font-mono
                    text-[8px]
                    font-bold
                    text-escuro-principal/40
                  "
                >
                  {item.time}
                </span>
              </div>
            ),
          )}
        </div>


        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            border-t
            border-escuro-principal/[0.06]
            pt-3
          "
        >
          <MessageCircleMore
            size={12}
            className="
              text-verde-principal
            "
          />

          <span
            className="
              text-[9px]
              text-escuro-principal/35
            "
          >
            3 conversas precisam de atenção
          </span>
        </div>
      </div>
    );
  }


  /*
   * ==========================
   * PRIORIDADE
   * ==========================
   */

  if (type === "priority") {
    return (
      <div
        data-feature-visual
        className="
          overflow-hidden
          rounded-2xl
          border
          border-escuro-principal/[0.06]
          bg-escuro-principal/[0.025]
          p-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-escuro-principal/30
            "
          >
            Ranking
          </span>

          <Activity
            size={13}
            className="
              text-verde-principal
            "
          />
        </div>


        <div
          className="
            mt-4
            space-y-2
          "
        >
          {[
            {
              position: "01",
              name: "Alcides Sales",
              score: "94",
              active: true,
            },
            {
              position: "02",
              name: "Espaço das Pratas",
              score: "87",
              active: false,
            },
            {
              position: "03",
              name: "Ignez Esteves",
              score: "72",
              active: false,
            },
          ].map(
            (item) => (
              <div
                key={item.position}
                data-ranking-row
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  px-3
                  py-2.5
                  transition-all
                  duration-300

                  ${
                    item.active
                      ? `
                        border-verde-principal/20
                        bg-verde-principal/[0.07]
                      `
                      : `
                        border-transparent
                        bg-white/50
                      `
                  }
                `}
              >
                <span
                  className="
                    font-mono
                    text-[9px]
                    font-black
                    text-escuro-principal/20
                  "
                >
                  {item.position}
                </span>


                <span
                  className="
                    min-w-0
                    flex-1
                    truncate
                    text-[10px]
                    font-semibold
                    text-escuro-principal/60
                  "
                >
                  {item.name}
                </span>


                <span
                  className={`
                    font-mono
                    text-[9px]
                    font-bold

                    ${
                      item.active
                        ? "text-verde-escuro"
                        : "text-escuro-principal/30"
                    }
                  `}
                >
                  {item.score}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    );
  }


  /*
   * ==========================
   * CUSTO
   * ==========================
   */

  if (type === "cost") {
    return (
      <div
        data-feature-visual
        className="
          overflow-hidden
          rounded-2xl
          border
          border-escuro-principal/[0.06]
          bg-escuro-principal/[0.025]
          p-4
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
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-escuro-principal/30
              "
            >
              Custo potencial
            </span>

            <strong
              data-money-value
              className="
                mt-2
                block
                font-mono
                text-2xl
                font-black
                tracking-[-0.04em]
                text-escuro-principal
              "
            >
              R$ 1,02
            </strong>
          </div>


          <div
            data-float
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-verde-principal/10
              text-verde-principal
            "
          >
            <CircleDollarSign
              size={18}
            />
          </div>
        </div>


        <div
          className="
            mt-6
            flex
            h-[62px]
            items-end
            gap-2
          "
        >
          {[
            22,
            31,
            43,
            37,
            56,
            72,
            89,
          ].map(
            (
              height,
              index,
            ) => (
              <div
                key={index}
                className="
                  flex
                  h-full
                  flex-1
                  items-end
                "
              >
                <div
                  data-cost-bar
                  className="
                    w-full
                    rounded-t-sm
                    bg-verde-principal/70
                  "
                  style={{
                    height:
                      `${height}%`,
                  }}
                />
              </div>
            ),
          )}
        </div>


        <div
          className="
            mt-3
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-[8px]
              text-escuro-principal/25
            "
          >
            início
          </span>

          <span
            className="
              text-[8px]
              font-semibold
              text-verde-escuro
            "
          >
            3 janelas em risco
          </span>
        </div>
      </div>
    );
  }


  /*
   * ==========================
   * EQUIPE
   * ==========================
   */

  return (
    <div
      data-feature-visual
      className="
        overflow-hidden
        rounded-2xl
        border
        border-escuro-principal/[0.06]
        bg-escuro-principal/[0.025]
        p-4
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-escuro-principal/30
            "
          >
            Equipe online
          </span>

          <strong
            className="
              mt-1
              block
              text-sm
              text-escuro-principal
            "
          >
            3 atendentes
          </strong>
        </div>


        <Users
          size={16}
          className="
            text-verde-principal
          "
        />
      </div>


      <div
        className="
          mt-5
          flex
          items-center
        "
      >
        {[
          "WR",
          "AM",
          "JP",
        ].map(
          (
            person,
            index,
          ) => (
            <div
              key={person}
              data-team-avatar
              className="
                -ml-2
                flex
                h-10
                w-10
                first:ml-0
                items-center
                justify-center
                rounded-full
                border-[3px]
                border-white
                bg-escuro-principal
                text-[9px]
                font-bold
                text-white
              "
              style={{
                zIndex:
                  10 - index,
              }}
            >
              {person}
            </div>
          ),
        )}


        <div
          className="
            ml-3
            text-[9px]
            leading-4
            text-escuro-principal/35
          "
        >
          compartilhando
          <br />
          o mesmo número
        </div>
      </div>


      <div
        className="
          mt-5
          space-y-2
        "
      >
        {[
          {
            name:
              "Alcides Sales",
            person: "Amanda",
          },
          {
            name:
              "Espaço das Pratas",
            person: "João",
          },
        ].map(
          (item) => (
            <div
              key={item.name}
              data-assignment-row
              className="
                flex
                items-center
                justify-between
                gap-3
                rounded-xl
                bg-white/60
                px-3
                py-2
              "
            >
              <span
                className="
                  truncate
                  text-[9px]
                  font-medium
                  text-escuro-principal/45
                "
              >
                {item.name}
              </span>


              <span
                className="
                  whitespace-nowrap
                  rounded-full
                  bg-verde-principal/10
                  px-2
                  py-1
                  text-[8px]
                  font-bold
                  text-verde-escuro
                "
              >
                {item.person}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}


export default function Product() {
  const sectionRef =
    useRef<HTMLElement>(
      null,
    );


  useGSAP(
    () => {

      /*
       * ==========================
       * INTRO
       * ==========================
       */

      gsap.from(
        "[data-product-intro]",
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
       *
       * Todos entram juntos.
       */

      gsap.from(
        "[data-feature-card]",
        {
          opacity: 0,

          y: 40,

          scale: 0.97,

          duration: 0.9,

          ease:
            "power3.out",

          scrollTrigger: {
            trigger:
              "[data-features-grid]",

            start:
              "top 82%",

            toggleActions:
              "play none none reverse",
          },
        },
      );


      /*
       * ==========================
       * MINI INTERFACES
       * ==========================
       *
       * Entram deslizando,
       * todas ao mesmo tempo.
       */

      gsap.from(
        "[data-feature-visual]",
        {
          opacity: 0,

          x: 35,

          duration: 0.85,

          ease:
            "power3.out",

          scrollTrigger: {
            trigger:
              "[data-features-grid]",

            start:
              "top 76%",

            toggleActions:
              "play none none reverse",
          },
        },
      );


      /*
       * ==========================
       * BARRAS DO RADAR
       * ==========================
       */

      gsap.from(
        "[data-mini-bar]",
        {
          scaleX: 0,

          transformOrigin:
            "left center",

          duration: 1.2,

          ease:
            "power4.out",

          scrollTrigger: {
            trigger:
              "[data-features-grid]",

            start:
              "top 72%",
          },
        },
      );


      /*
       * ==========================
       * BARRAS DO CUSTO
       * ==========================
       */

      gsap.from(
        "[data-cost-bar]",
        {
          scaleY: 0,

          transformOrigin:
            "bottom center",

          duration: 1.1,

          ease:
            "power4.out",

          scrollTrigger: {
            trigger:
              "[data-features-grid]",

            start:
              "top 72%",
          },
        },
      );


      /*
       * ==========================
       * RANKING
       * ==========================
       *
       * Aqui existe um pequeno slide,
       * mas não cascata.
       */

      gsap.from(
        "[data-ranking-row]",
        {
          x: 25,

          opacity: 0,

          duration: 0.8,

          ease:
            "power3.out",

          scrollTrigger: {
            trigger:
              "[data-features-grid]",

            start:
              "top 70%",
          },
        },
      );


      /*
       * ==========================
       * EQUIPE
       * ==========================
       */

      gsap.from(
        "[data-team-avatar]",
        {
          scale: 0,

          opacity: 0,

          duration: 0.7,

          ease:
            "back.out(1.8)",

          scrollTrigger: {
            trigger:
              "[data-features-grid]",

            start:
              "top 68%",
          },
        },
      );


      gsap.from(
        "[data-assignment-row]",
        {
          x: 22,

          opacity: 0,

          duration: 0.75,

          ease:
            "power3.out",

          scrollTrigger: {
            trigger:
              "[data-features-grid]",

            start:
              "top 68%",
          },
        },
      );


      /*
       * ==========================
       * PULSO
       * ==========================
       */

      gsap.to(
        "[data-pulse-dot]",
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
       * ÍCONE FLUTUANTE
       * ==========================
       */

      gsap.to(
        "[data-float]",
        {
          y: -5,

          duration: 1.6,

          repeat: -1,

          yoyo: true,

          ease:
            "sine.inOut",
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
      id="produto"
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

      {/* FUNDO */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-180px]
          top-[18%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-verde-principal/[0.08]
          blur-[140px]
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          -left-[250px]
          bottom-[5%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-ciano-claro/[0.05]
          blur-[140px]
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

        {/* ==========================
            INTRO
        ========================== */}

        <div
          data-product-intro
          className="
            mx-auto
            mb-16
            max-w-[830px]
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
            O produto
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
            Conversas deixam de
            ser uma lista.

            <span
              className="
                mt-2
                block
                text-verde-principal
              "
            >
              Viram prioridades.
            </span>
          </h2>


          <p
            className="
              mx-auto
              mt-7
              max-w-[600px]
              text-base
              leading-7
              text-escuro-principal/60

              sm:text-lg
              sm:leading-8
            "
          >
            O LeadIn transforma
            o tempo restante de
            cada conversa em
            informação prática
            para sua equipe agir
            antes da janela fechar.
          </p>
        </div>


        {/* ==========================
            GRID
        ========================== */}

        <div
          data-features-grid
          className="
            grid
            gap-5

            sm:grid-cols-2

            lg:gap-6
          "
        >

          {features.map(
            (
              feature,
            ) => {

              const Icon =
                feature.icon;


              return (
                <article
                  key={
                    feature.number
                  }
                  data-feature-card
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-escuro-principal/[0.06]
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-500

                    sm:p-7

                    lg:p-8

                    hover:-translate-y-1
                    hover:border-verde-principal/25
                    hover:shadow-[0_25px_70px_-25px_rgba(34,197,94,0.2)]
                  "
                >

                  {/* HOVER GLOW */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-[180px]
                      w-[180px]
                      rounded-full
                      bg-verde-principal/0
                      blur-[60px]
                      transition-all
                      duration-500

                      group-hover:bg-verde-principal/10
                    "
                  />


                  {/* TOP */}

                  <div
                    className="
                      relative
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        bg-verde-principal/10
                        text-verde-principal
                        transition-all
                        duration-300

                        group-hover:bg-verde-principal
                        group-hover:text-white
                        group-hover:scale-105
                      "
                    >
                      <Icon
                        size={21}
                      />
                    </div>


                    <span
                      className="
                        font-mono
                        text-xl
                        font-bold
                        text-escuro-principal/10
                      "
                    >
                      {
                        feature.number
                      }
                    </span>

                  </div>


                  {/* TEXTO */}

                  <div
                    className="
                      relative
                      mt-7
                    "
                  >

                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-verde-escuro
                      "
                    >
                      {
                        feature.eyebrow
                      }
                    </span>


                    <h3
                      className="
                        mt-3
                        max-w-[450px]
                        text-2xl
                        font-black
                        leading-[1.05]
                        tracking-[-0.035em]
                        text-escuro-principal

                        lg:text-[28px]
                      "
                    >
                      {
                        feature.title
                      }
                    </h3>


                    <p
                      className="
                        mt-4
                        max-w-[480px]
                        text-sm
                        leading-6
                        text-escuro-principal/50
                      "
                    >
                      {
                        feature.text
                      }
                    </p>

                  </div>


                  {/* MINI PRODUTO */}

                  <div
                    className="
                      relative
                      mt-7
                    "
                  >
                    <FeatureVisual
                      type={
                        feature.type
                      }
                    />
                  </div>


                  {/* LINHA INFERIOR */}

                  <div
                    className="
                      relative
                      mt-5
                      h-[2px]
                      overflow-hidden
                      rounded-full
                      bg-escuro-principal/[0.04]
                    "
                  >
                    <div
                      className="
                        h-full
                        w-1/3
                        -translate-x-full
                        rounded-full
                        bg-verde-principal
                        transition-transform
                        duration-700

                        group-hover:translate-x-[200%]
                      "
                    />
                  </div>

                </article>
              );
            },
          )}

        </div>

      </div>

    </section>
  );
}