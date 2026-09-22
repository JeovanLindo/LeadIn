import { useRef } from "react";

import {
  ArrowRight,
  Check,
  GraduationCap,
  Headphones,
  Megaphone,
  RefreshCcw,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import {
  gsap,
  useGSAP,
} from "../../lib/gsap";


const implementationSteps = [
  {
    number: "01",
    title: "Configuração",
    text: "Preparamos a estrutura necessária para o LeadIn funcionar dentro da sua operação.",
    icon: Settings2,
  },

  {
    number: "02",
    title: "Migração",
    text: "Organizamos a transição para que sua equipe não precise começar do zero.",
    icon: RefreshCcw,
  },

  {
    number: "03",
    title: "Treinamento",
    text: "Sua equipe aprende como usar o sistema no dia a dia e aproveitar cada recurso.",
    icon: GraduationCap,
  },

  {
    number: "04",
    title: "Suporte",
    text: "A WR continua ao lado da sua operação depois que o sistema entra no ar.",
    icon: Headphones,
  },
];


const included = [
  {
    icon: ShieldCheck,
    title: "Configuração Meta",
    text: "Acompanhamento da estrutura necessária para integrar sua operação.",
  },

  {
    icon: Users,
    title: "Treinamento da equipe",
    text: "Seu time aprende o fluxo antes de começar a operar.",
  },

  {
    icon: RefreshCcw,
    title: "Migração da base",
    text: "Organização da transição para o novo ambiente.",
  },

  {
    icon: Megaphone,
    title: "Estratégia de tráfego",
    text: "A operação pode trabalhar integrada às estratégias da WR Digital.",
  },
];


export default function WR() {
  const sectionRef =
    useRef<HTMLElement>(null);


  useGSAP(
    () => {

      /*
       * =========================
       * INTRO
       * =========================
       */

      gsap.from(
        "[data-wr-intro]",
        {
          opacity: 0,
          y: 50,

          duration: 0.9,

          ease: "power3.out",

          scrollTrigger: {
            trigger:
              sectionRef.current,

            start:
              "top 76%",

            toggleActions:
              "play none none reverse",
          },
        },
      );


      /*
       * =========================
       * PAINEL PRINCIPAL
       * =========================
       */

      gsap.from(
        "[data-wr-panel]",
        {
          opacity: 0,

          x: -55,

          scale: 0.97,

          duration: 1,

          ease: "power3.out",

          scrollTrigger: {
            trigger:
              "[data-wr-content]",

            start:
              "top 80%",

            toggleActions:
              "play none none reverse",
          },
        },
      );


      /*
       * =========================
       * CONTEÚDO DIREITO
       * =========================
       */

      gsap.from(
        "[data-wr-right]",
        {
          opacity: 0,

          x: 55,

          duration: 1,

          ease: "power3.out",

          scrollTrigger: {
            trigger:
              "[data-wr-content]",

            start:
              "top 80%",

            toggleActions:
              "play none none reverse",
          },
        },
      );


      /*
       * =========================
       * LINHA DA IMPLANTAÇÃO
       * =========================
       */

      gsap.fromTo(
        "[data-wr-progress]",

        {
          scaleY: 0,

          transformOrigin:
            "top center",
        },

        {
          scaleY: 1,

          duration: 1.8,

          ease:
            "power3.inOut",

          scrollTrigger: {
            trigger:
              "[data-wr-process]",

            start:
              "top 75%",
          },
        },
      );


      /*
       * =========================
       * PASSOS
       * =========================
       *
       * Sem cascata.
       * Todos entram juntos.
       */

      gsap.from(
        "[data-wr-step]",
        {
          opacity: 0,

          x: 25,

          duration: 0.8,

          ease:
            "power3.out",

          scrollTrigger: {
            trigger:
              "[data-wr-process]",

            start:
              "top 73%",
          },
        },
      );


      /*
       * =========================
       * CHECKS
       * =========================
       */

      gsap.from(
        "[data-wr-check]",
        {
          opacity: 0,

          scale: 0,

          duration: 0.65,

          ease:
            "back.out(2)",

          scrollTrigger: {
            trigger:
              "[data-wr-process]",

            start:
              "top 68%",
          },
        },
      );


      /*
       * =========================
       * SERVIÇOS INCLUSOS
       * =========================
       */

      gsap.from(
        "[data-wr-included]",
        {
          opacity: 0,

          y: 30,

          duration: 0.8,

          ease:
            "power3.out",

          scrollTrigger: {
            trigger:
              "[data-wr-included-grid]",

            start:
              "top 85%",

            toggleActions:
              "play none none reverse",
          },
        },
      );


      /*
       * =========================
       * PONTO PULSANDO
       * =========================
       */

      gsap.to(
        "[data-wr-live]",
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
       * =========================
       * FLUTUAÇÃO
       * =========================
       */

      gsap.to(
        "[data-wr-float]",
        {
          y: -6,

          duration: 1.8,

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
      id="wr"
      className="
        relative
        overflow-hidden
        bg-azul-escuro
        px-5
        py-24
        text-white

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
          -left-[220px]
          top-[10%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-ciano-claro/[0.08]
          blur-[160px]
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          -right-[200px]
          bottom-[-100px]
          h-[600px]
          w-[600px]
          rounded-full
          bg-verde-principal/[0.08]
          blur-[150px]
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
          data-wr-intro
          className="
            mb-16
            max-w-[900px]

            lg:mb-20
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Sparkles
              size={14}
              className="
                text-ciano-claro
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-ciano-claro
              "
            >
              LeadIn + WR Digital
            </span>
          </div>


          <h2
            className="
              mt-5
              text-4xl
              font-black
              leading-[0.94]
              tracking-[-0.055em]

              sm:text-5xl

              lg:text-[70px]
            "
          >
            Você não recebe
            apenas um sistema.

            <span
              className="
                mt-2
                block
                text-ciano-claro
              "
            >
              A WR coloca ele
              para funcionar.
            </span>
          </h2>


          <p
            className="
              mt-7
              max-w-[650px]
              text-base
              leading-7
              text-white/45

              sm:text-lg
              sm:leading-8
            "
          >
            Da configuração inicial
            ao treinamento da equipe,
            acompanhamos a implantação
            para que o LeadIn entre
            de verdade na rotina da
            sua empresa.
          </p>

        </div>


        {/* =========================
            CONTEÚDO PRINCIPAL
        ========================= */}

        <div
          data-wr-content
          className="
            grid
            gap-6

            lg:grid-cols-[0.95fr_1.05fr]
            lg:gap-8
          "
        >

          {/* =======================
              PAINEL
          ======================= */}

          <div
            data-wr-panel
            className="
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.05]
              backdrop-blur-xl
            "
          >

            {/* HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/[0.08]
                px-5
                py-4

                sm:px-6
              "
            >

              <div>
                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white/30
                  "
                >
                  Implantação LeadIn
                </span>

                <strong
                  className="
                    mt-1
                    block
                    text-sm
                    text-white
                  "
                >
                  Operação preparada
                </strong>
              </div>


              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-verde-principal/10
                  px-3
                  py-1.5
                "
              >
                <span
                  data-wr-live
                  className="
                    h-2
                    w-2
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
                    text-verde-principal
                  "
                >
                  em andamento
                </span>
              </div>

            </div>


            {/* PROGRESSO */}

            <div
              className="
                p-5

                sm:p-7
              "
            >

              <div
                className="
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
                    Estrutura
                  </span>

                  <strong
                    className="
                      mt-2
                      block
                      text-4xl
                      font-black
                      tracking-[-0.05em]
                      text-white
                    "
                  >
                    4 etapas
                  </strong>
                </div>


                <div
                  data-wr-float
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-ciano-claro/20
                    bg-ciano-claro/10
                  "
                >
                  <Settings2
                    size={20}
                    className="
                      text-ciano-claro
                    "
                  />
                </div>

              </div>


              {/* TIMELINE */}

              <div
                data-wr-process
                className="
                  relative
                  mt-10
                "
              >

                {/* LINHA FUNDO */}

                <div
                  className="
                    absolute
                    bottom-6
                    left-[18px]
                    top-6
                    w-px
                    bg-white/10
                  "
                />


                {/* LINHA ANIMADA */}

                <div
                  data-wr-progress
                  className="
                    absolute
                    bottom-6
                    left-[18px]
                    top-6
                    w-px
                    bg-gradient-to-b
                    from-ciano-claro
                    to-verde-principal
                  "
                />


                <div
                  className="
                    space-y-4
                  "
                >

                  {implementationSteps.map(
                    (
                      step,
                    ) => {

                      const Icon =
                        step.icon;


                      return (
                        <div
                          key={
                            step.number
                          }
                          data-wr-step
                          className="
                            relative
                            flex
                            gap-4
                          "
                        >

                          {/* CHECK */}

                          <div
                            data-wr-check
                            className="
                              relative
                              z-10
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-ciano-claro/20
                              bg-azul-escuro
                            "
                          >
                            <Check
                              size={13}
                              strokeWidth={3}
                              className="
                                text-ciano-claro
                              "
                            />
                          </div>


                          {/* CONTEÚDO */}

                          <div
                            className="
                              min-w-0
                              flex-1
                              rounded-2xl
                              border
                              border-white/[0.07]
                              bg-white/[0.035]
                              p-4
                              transition-all
                              duration-300

                              hover:border-ciano-claro/20
                              hover:bg-white/[0.06]
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
                                    font-mono
                                    text-[8px]
                                    font-bold
                                    text-ciano-claro/50
                                  "
                                >
                                  {step.number}
                                </span>

                                <h3
                                  className="
                                    mt-1
                                    text-sm
                                    font-bold
                                    text-white
                                  "
                                >
                                  {step.title}
                                </h3>
                              </div>


                              <Icon
                                size={15}
                                className="
                                  shrink-0
                                  text-ciano-claro
                                "
                              />
                            </div>


                            <p
                              className="
                                mt-2
                                max-w-[400px]
                                text-[10px]
                                leading-4
                                text-white/35
                              "
                            >
                              {step.text}
                            </p>

                          </div>

                        </div>
                      );
                    },
                  )}

                </div>

              </div>

            </div>

          </div>


          {/* =======================
              LADO DIREITO
          ======================= */}

          <div
            data-wr-right
            className="
              flex
              flex-col
              gap-5
            "
          >

            {/* CARD GRANDE */}

            <div
              className="
                flex-1
                rounded-[30px]
                border
                border-white/10
                bg-white/[0.04]
                p-6

                sm:p-8
              "
            >

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-ciano-claro
                "
              >
                Da tecnologia à operação
              </span>


              <h3
                className="
                  mt-4
                  max-w-[540px]
                  text-3xl
                  font-black
                  leading-[1]
                  tracking-[-0.045em]

                  sm:text-4xl
                "
              >
                Tecnologia funciona
                melhor quando existe
                alguém cuidando da
                implantação.
              </h3>


              <p
                className="
                  mt-5
                  max-w-[530px]
                  text-sm
                  leading-6
                  text-white/40
                "
              >
                Por isso o LeadIn chega
                acompanhado da estrutura
                da WR Digital para ajudar
                sua empresa a colocar o
                sistema em uso.
              </p>


              {/* MINI VISUAL */}

              <div
                className="
                  mt-8
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-black/10
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/[0.06]
                    px-4
                    py-3
                  "
                >

                  <span
                    className="
                      text-[8px]
                      uppercase
                      tracking-[0.13em]
                      text-white/25
                    "
                  >
                    Status da implantação
                  </span>


                  <span
                    className="
                      font-mono
                      text-[9px]
                      font-bold
                      text-verde-principal
                    "
                  >
                    concluído
                  </span>

                </div>


                <div
                  className="
                    grid
                    grid-cols-2
                  "
                >

                  {[
                    "Conta configurada",
                    "Base organizada",
                    "Equipe treinada",
                    "Operação ativa",
                  ].map(
                    (
                      item,
                    ) => (
                      <div
                        key={item}
                        className="
                          flex
                          items-center
                          gap-2
                          border-b
                          border-r
                          border-white/[0.05]
                          px-4
                          py-4
                        "
                      >
                        <div
                          className="
                            flex
                            h-5
                            w-5
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-verde-principal/10
                          "
                        >
                          <Check
                            size={9}
                            strokeWidth={3}
                            className="
                              text-verde-principal
                            "
                          />
                        </div>


                        <span
                          className="
                            text-[9px]
                            font-medium
                            text-white/45
                          "
                        >
                          {item}
                        </span>

                      </div>
                    ),
                  )}

                </div>

              </div>

            </div>


            {/* SUPORTE */}

            <div
              className="
                grid
                gap-5

                sm:grid-cols-2
              "
            >

              <div
                className="
                  rounded-[24px]
                  border
                  border-ciano-claro/15
                  bg-ciano-claro/[0.07]
                  p-5
                "
              >
                <Headphones
                  size={18}
                  className="
                    text-ciano-claro
                  "
                />

                <strong
                  className="
                    mt-5
                    block
                    text-lg
                    font-bold
                  "
                >
                  Suporte próximo
                </strong>

                <p
                  className="
                    mt-2
                    text-[10px]
                    leading-4
                    text-white/35
                  "
                >
                  Acompanhamento para
                  sua equipe continuar
                  usando o LeadIn com
                  segurança.
                </p>
              </div>


              <div
                className="
                  rounded-[24px]
                  border
                  border-verde-principal/15
                  bg-verde-principal/[0.07]
                  p-5
                "
              >
                <Users
                  size={18}
                  className="
                    text-verde-principal
                  "
                />

                <strong
                  className="
                    mt-5
                    block
                    text-lg
                    font-bold
                  "
                >
                  Feito com sua equipe
                </strong>

                <p
                  className="
                    mt-2
                    text-[10px]
                    leading-4
                    text-white/35
                  "
                >
                  A implantação acontece
                  considerando o fluxo
                  real da sua operação.
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            INCLUSO
        ========================= */}

        <div
          className="
            mt-16
            border-t
            border-white/10
            pt-10
          "
        >

          <div
            className="
              flex
              flex-col
              gap-4

              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-white/30
                "
              >
                Com a WR Digital
              </span>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-black
                  tracking-[-0.04em]
                "
              >
                O que acompanha
                sua implantação.
              </h3>
            </div>

          </div>


          <div
            data-wr-included-grid
            className="
              mt-7
              grid
              gap-3

              sm:grid-cols-2

              lg:grid-cols-4
            "
          >

            {included.map(
              ({
                icon: Icon,
                title,
                text,
              }) => (

                <div
                  key={title}
                  data-wr-included
                  className="
                    group
                    rounded-[22px]
                    border
                    border-white/[0.07]
                    bg-white/[0.035]
                    p-5
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-ciano-claro/20
                    hover:bg-white/[0.055]
                  "
                >

                  <Icon
                    size={17}
                    className="
                      text-ciano-claro
                    "
                  />


                  <strong
                    className="
                      mt-5
                      block
                      text-sm
                    "
                  >
                    {title}
                  </strong>


                  <p
                    className="
                      mt-2
                      text-[10px]
                      leading-4
                      text-white/35
                    "
                  >
                    {text}
                  </p>

                </div>

              ),
            )}

          </div>

        </div>


        {/* =========================
            CTA
        ========================= */}

        <div
          className="
            mt-12
            flex
            flex-col
            gap-5
            rounded-[26px]
            border
            border-white/10
            bg-white/[0.04]
            p-6

            sm:flex-row
            sm:items-center
            sm:justify-between

            lg:p-8
          "
        >

          <div>
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-ciano-claro
              "
            >
              Próximo passo
            </span>

            <h3
              className="
                mt-2
                text-xl
                font-black
                tracking-[-0.035em]

                sm:text-2xl
              "
            >
              Agora escolha o plano
              para sua operação.
            </h3>
          </div>


          <button
            type="button"
            onClick={() => {
              document
                .getElementById(
                  "planos",
                )
                ?.scrollIntoView({
                  behavior:
                    "smooth",
                });
            }}
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-3
              rounded-full
              bg-verde-principal
              px-6
              py-3.5
              text-xs
              font-bold
              text-escuro-principal
              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:bg-ciano-claro
            "
          >
            Ver planos

            <ArrowRight
              size={14}
              className="
                transition-transform
                duration-300

                group-hover:translate-x-1
              "
            />
          </button>

        </div>

      </div>

    </section>
  );
}