import { useRef } from "react";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  DatabaseZap,
  LockKeyhole,
  MessagesSquare,
  ShieldCheck,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

import {
  gsap,
  useGSAP,
} from "../../lib/gsap";

const attendants = [
  { initials: "WG", name: "Wagner", status: "online" },
  { initials: "MT", name: "Matheus", status: "online" },
  { initials: "VI", name: "Vivian", status: "online" },
];

const conversations = [
  { client: "Alcides Sales", attendant: "Wagner", tag: "Urgente" },
  { client: "Espaço das Pratas", attendant: "Matheus", tag: "Atendimento" },
  { client: "Ignez Esteves", attendant: "Vivian", tag: "Follow-up" },
];

const permissions = [
  { name: "Conversas", admin: true, manager: true, attendant: true },
  { name: "Relatórios", admin: true, manager: true, attendant: false },
  { name: "Usuários", admin: true, manager: false, attendant: false },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-features-intro]", {
        opacity: 0,
        y: 55,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-resource-card]", {
        opacity: 0,
        y: 45,
        scale: 0.975,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-resources-grid]",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-attendant]", {
        opacity: 0,
        x: -28,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-team-resource]",
          start: "top 76%",
        },
      });

      gsap.from("[data-conversation-assignment]", {
        opacity: 0,
        x: 35,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-team-resource]",
          start: "top 72%",
        },
      });

      gsap.fromTo(
        "[data-flow-line]",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.3,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: "[data-team-resource]",
            start: "top 70%",
          },
        },
      );

      gsap.from("[data-permission-check]", {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: "[data-permissions-resource]",
          start: "top 76%",
        },
      });

      gsap.fromTo(
        "[data-migration-progress]",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-migration-resource]",
            start: "top 78%",
          },
        },
      );

      gsap.from("[data-migration-step]", {
        opacity: 0,
        y: 12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-migration-resource]",
          start: "top 72%",
        },
      });

      gsap.to("[data-online-dot]", {
        scale: 1.8,
        opacity: 0.25,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("[data-flow-dot]", {
        x: 150,
        duration: 2.3,
        repeat: -1,
        ease: "none",
        modifiers: {
          x: (value) => {
            const number = parseFloat(value);
            return `${number % 150}px`;
          },
        },
      });
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="recursos"
      className="
        relative
        overflow-hidden
        bg-escuro
        px-4
        py-16
        text-white
        sm:px-8
        sm:py-24
        lg:px-12
        lg:py-32
      "
    >
      {/* FUNDOS */}
      <div
        className="
          pointer-events-none
          absolute
          -right-[250px]
          top-[10%]
          h-[400px]
          w-[400px]
          sm:h-[650px]
          sm:w-[650px]
          rounded-full
          bg-ciano-escuro/[0.08]
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-[250px]
          bottom-[5%]
          h-[400px]
          w-[400px]
          sm:h-[600px]
          sm:w-[600px]
          rounded-full
          bg-verde-principal/[0.08]
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
        {/* =========================
            INTRO
        ========================= */}
        <div
          data-features-intro
          className="
            mb-12
            max-w-[880px]
            lg:mb-20
          "
        >
          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-ciano-claro
            "
          >
            Recursos
          </span>

          <h2
            className="
              mt-4
              text-3xl
              font-black
              leading-[0.95]
              tracking-[-0.055em]
              sm:text-5xl
              lg:text-[70px]
            "
          >
            Não é só sobre responder rápido.
            <span
              className="
                mt-1.5
                block
                text-ciano-claro
              "
            >
              É sobre organizar toda a operação.
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-[600px]
              text-sm
              leading-6
              text-white/45
              sm:text-lg
              sm:leading-8
            "
          >
            Centralize pessoas, conversas e acessos em uma estrutura preparada para sua equipe trabalhar com mais controle.
          </p>
        </div>

        {/* =========================
            BENTO
        ========================= */}
        <div
          data-resources-grid
          className="
            grid
            gap-5
            lg:grid-cols-12
          "
        >
          {/* ========================
              EQUIPE / GRANDE
          ======================== */}
          <article
            data-resource-card
            data-team-resource
            className="
              relative
              overflow-hidden
              rounded-[24px]
              sm:rounded-[28px]
              border
              border-white/[0.08]
              bg-white/[0.04]
              p-5
              sm:p-7
              lg:col-span-8
              lg:p-8
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-start
                sm:justify-between
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
                  <UsersRound
                    size={15}
                    className="
                      text-ciano-claro
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-white/30
                    "
                  >
                    Atendimento compartilhado
                  </span>
                </div>

                <h3
                  className="
                    mt-2.5
                    max-w-[500px]
                    text-xl
                    font-black
                    tracking-[-0.04em]
                    sm:text-3xl
                  "
                >
                  Um número.
                  <br />
                  <span
                    className="
                      text-ciano-claro
                    "
                  >
                    Toda a equipe.
                  </span>
                </h3>
              </div>

              <div
                className="
                  flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  bg-verde-principal/10
                  px-3
                  py-1.5
                "
              >
                <span
                  data-online-dot
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
                  3 online
                </span>
              </div>
            </div>

            {/* INTERFACE */}
            <div
              className="
                mt-6
                grid
                gap-4
                md:grid-cols-[0.8fr_1.2fr]
              "
            >
              {/* ATENDENTES */}
              <div
                className="
                  rounded-xl
                  sm:rounded-2xl
                  border
                  border-white/[0.07]
                  bg-black/10
                  p-3.5
                  sm:p-4
                "
              >
                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-white/25
                  "
                >
                  Atendentes
                </span>

                <div
                  className="
                    mt-3
                    space-y-2
                  "
                >
                  {attendants.map((person) => (
                    <div
                      key={person.name}
                      data-attendant
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-white/[0.05]
                        bg-white/[0.035]
                        px-3
                        py-2.5
                      "
                    >
                      <div
                        className="
                          flex
                          h-7
                          w-7
                          sm:h-8
                          sm:w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-ciano-claro/10
                          text-[8px]
                          font-bold
                          text-ciano-claro
                        "
                      >
                        {person.initials}
                      </div>

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >
                        <span
                          className="
                            block
                            truncate
                            text-[10px]
                            font-semibold
                            text-white/65
                          "
                        >
                          {person.name}
                        </span>

                        <span
                          className="
                            text-[8px]
                            text-verde-principal
                          "
                        >
                          online
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CONVERSAS */}
              <div
                className="
                  rounded-xl
                  sm:rounded-2xl
                  border
                  border-white/[0.07]
                  bg-black/10
                  p-3.5
                  sm:p-4
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
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-white/25
                    "
                  >
                    Distribuição
                  </span>

                  <MessagesSquare
                    size={13}
                    className="
                      text-ciano-claro
                    "
                  />
                </div>

                {/* LINHA DE FLUXO */}
                <div
                  className="
                    relative
                    my-3
                    sm:my-4
                    h-px
                    overflow-hidden
                    bg-white/[0.06]
                  "
                >
                  <div
                    data-flow-line
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-transparent
                      via-ciano-claro
                      to-transparent
                      opacity-60
                    "
                  />

                  <span
                    data-flow-dot
                    className="
                      absolute
                      -top-[2px]
                      left-0
                      h-[5px]
                      w-[5px]
                      rounded-full
                      bg-ciano-claro
                    "
                  />
                </div>

                <div
                  className="
                    space-y-2
                  "
                >
                  {conversations.map((item) => (
                    <div
                      key={item.client}
                      data-conversation-assignment
                      className="
                        flex
                        items-center
                        gap-2.5
                        sm:gap-3
                        rounded-xl
                        bg-white/[0.035]
                        px-2.5
                        py-2.5
                        sm:px-3
                        sm:py-3
                      "
                    >
                      <div
                        className="
                          flex
                          h-6
                          w-6
                          sm:h-7
                          sm:w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-white/[0.05]
                        "
                      >
                        <MessageCircleIcon />
                      </div>

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >
                        <span
                          className="
                            block
                            truncate
                            text-[10px]
                            font-semibold
                            text-white/65
                          "
                        >
                          {item.client}
                        </span>

                        <span
                          className="
                            text-[8px]
                            text-white/25
                          "
                        >
                          {item.tag}
                        </span>
                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-1
                          sm:gap-1.5
                          rounded-full
                          bg-ciano-claro/10
                          px-2
                          py-1
                        "
                      >
                        <UserRoundCheck
                          size={10}
                          className="
                            text-ciano-claro
                          "
                        />

                        <span
                          className="
                            text-[8px]
                            font-semibold
                            text-ciano-claro
                          "
                        >
                          {item.attendant}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* ========================
              PERMISSÕES
          ======================== */}
          <article
            data-resource-card
            data-permissions-resource
            className="
              rounded-[24px]
              sm:rounded-[28px]
              border
              border-white/[0.08]
              bg-white/[0.04]
              p-5
              sm:p-7
              lg:col-span-4
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                sm:h-11
                sm:w-11
                items-center
                justify-center
                rounded-2xl
                bg-ciano-claro/10
                text-ciano-claro
              "
            >
              <ShieldCheck size={18} />
            </div>

            <span
              className="
                mt-5
                sm:mt-7
                block
                text-[9px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-ciano-claro
              "
            >
              Permissões
            </span>

            <h3
              className="
                mt-2.5
                text-xl
                sm:text-2xl
                font-black
                leading-[1.05]
                tracking-[-0.04em]
              "
            >
              Cada pessoa vê o que precisa ver.
            </h3>

            <p
              className="
                mt-3
                text-xs
                sm:text-sm
                leading-5
                sm:leading-6
                text-white/40
              "
            >
              Defina níveis de acesso sem perder o controle da operação.
            </p>

            {/* MATRIZ */}
            <div
              className="
                mt-5
                sm:mt-7
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.07]
              "
            >
              <div
                className="
                  grid
                  grid-cols-[1fr_42px_42px_42px]
                  sm:grid-cols-[1fr_48px_48px_48px]
                  items-center
                  border-b
                  border-white/[0.06]
                  bg-white/[0.025]
                  px-3
                  py-2
                "
              >
                <span />
                <span className="text-center text-[7px] uppercase text-white/25">ADM</span>
                <span className="text-center text-[7px] uppercase text-white/25">GER</span>
                <span className="text-center text-[7px] uppercase text-white/25">ATD</span>
              </div>

              {permissions.map((permission) => (
                <div
                  key={permission.name}
                  className="
                    grid
                    grid-cols-[1fr_42px_42px_42px]
                    sm:grid-cols-[1fr_48px_48px_48px]
                    items-center
                    border-b
                    border-white/[0.05]
                    px-3
                    py-2.5
                    sm:py-3
                    last:border-b-0
                  "
                >
                  <span className="text-[9px] font-medium text-white/45">
                    {permission.name}
                  </span>

                  {[permission.admin, permission.manager, permission.attendant].map(
                    (allowed, index) => (
                      <div key={index} className="flex justify-center">
                        {allowed ? (
                          <div
                            data-permission-check
                            className="
                              flex
                              h-4
                              w-4
                              sm:h-5
                              sm:w-5
                              items-center
                              justify-center
                              rounded-full
                              bg-verde-principal/10
                            "
                          >
                            <Check
                              size={9}
                              strokeWidth={3}
                              className="text-verde-principal"
                            />
                          </div>
                        ) : (
                          <div className="h-1 w-2.5 sm:w-3 rounded-full bg-white/10" />
                        )}
                      </div>
                    ),
                  )}
                </div>
              ))}
            </div>
          </article>

          {/* ========================
              MIGRAÇÃO
          ======================== */}
          <article
            data-resource-card
            data-migration-resource
            className="
              rounded-[24px]
              sm:rounded-[28px]
              border
              border-white/[0.08]
              bg-white/[0.04]
              p-5
              sm:p-7
              lg:col-span-5
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
                    tracking-[0.16em]
                    text-ciano-claro
                  "
                >
                  Migração
                </span>

                <h3
                  className="
                    mt-2.5
                    text-xl
                    sm:text-2xl
                    font-black
                    tracking-[-0.04em]
                  "
                >
                  Sua operação não começa do zero.
                </h3>
              </div>

              <DatabaseZap
                size={20}
                className="
                  shrink-0
                  text-ciano-claro
                "
              />
            </div>

            <p
              className="
                mt-3
                max-w-[420px]
                text-xs
                sm:text-sm
                leading-5
                sm:leading-6
                text-white/40
              "
            >
              Estruture a entrada da equipe e leve sua base para o novo fluxo.
            </p>

            {/* PROGRESS */}
            <div className="mt-6 sm:mt-8">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-[0.12em] text-white/25">
                  Preparando operação
                </span>
                <span className="font-mono text-[9px] font-bold text-ciano-claro">
                  100%
                </span>
              </div>

              <div className="mt-2.5 sm:mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  data-migration-progress
                  className="
                    h-full
                    w-full
                    rounded-full
                    bg-gradient-to-r
                    from-verde-principal
                    to-ciano-claro
                  "
                />
              </div>
            </div>

            <div
              className="
                mt-5
                sm:mt-6
                grid
                gap-2
                grid-cols-3
              "
            >
              {["Configuração", "Base", "Equipe"].map((step, index) => (
                <div
                  key={step}
                  data-migration-step
                  className="
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    px-2.5
                    py-2.5
                    sm:px-3
                    sm:py-3
                  "
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] text-white/20">
                      0{index + 1}
                    </span>
                    <CheckCircle2 size={12} className="text-verde-principal" />
                  </div>

                  <span
                    className="
                      mt-2
                      sm:mt-3
                      block
                      text-[9px]
                      font-semibold
                      text-white/50
                      truncate
                    "
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </article>

          {/* ========================
              CONTROLE
          ======================== */}
          <article
            data-resource-card
            className="
              relative
              overflow-hidden
              rounded-[24px]
              sm:rounded-[28px]
              border
              border-ciano-claro/15
              bg-ciano-claro/[0.07]
              p-5
              sm:p-7
              lg:col-span-7
            "
          >
            <div
              className="
                grid
                gap-6
                sm:gap-8
                sm:grid-cols-[1fr_0.8fr]
                sm:items-end
              "
            >
              <div>
                <div
                  className="
                    flex
                    h-10
                    w-10
                    sm:h-11
                    sm:w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-ciano-claro/10
                  "
                >
                  <LockKeyhole size={18} className="text-ciano-claro" />
                </div>

                <span
                  className="
                    mt-5
                    sm:mt-7
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-ciano-claro
                  "
                >
                  Controle
                </span>

                <h3
                  className="
                    mt-2.5
                    max-w-[460px]
                    text-xl
                    sm:text-3xl
                    font-black
                    leading-[1.05]
                    tracking-[-0.04em]
                  "
                >
                  A conversa continua sendo da empresa.
                </h3>

                <p
                  className="
                    mt-3
                    max-w-[470px]
                    text-xs
                    sm:text-sm
                    leading-5
                    sm:leading-6
                    text-white/45
                  "
                >
                  Mesmo com várias pessoas atendendo, o histórico e a operação continuam centralizados.
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  sm:rounded-2xl
                  border
                  border-white/[0.08]
                  bg-black/10
                  p-3.5
                  sm:p-4
                "
              >
                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-white/25
                  "
                >
                  Histórico
                </span>

                <div
                  className="
                    mt-3
                    space-y-2.5
                    sm:space-y-3
                  "
                >
                  {[
                    "Wagner iniciou o atendimento",
                    "Matheus adicionou uma observação",
                    "Conversa atribuída a Vivian",
                  ].map((text, index) => (
                    <div key={text} className="flex items-start gap-2.5 sm:gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ciano-claro" />
                      <div>
                        <p className="text-[9px] leading-4 text-white/45">{text}</p>
                        <span className="text-[7px] text-white/20">há {index + 1} min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="
                pointer-events-none
                absolute
                -bottom-24
                -right-24
                h-[220px]
                w-[220px]
                rounded-full
                bg-ciano-claro/10
                blur-[70px]
              "
            />
          </article>
        </div>

        {/* =========================
            FECHAMENTO
        ========================= */}
        <div
          className="
            mt-10
            sm:mt-12
            flex
            flex-col
            gap-4
            sm:gap-5
            border-t
            border-white/[0.08]
            pt-6
            sm:pt-8
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              max-w-[620px]
              text-xs
              sm:text-sm
              leading-5
              sm:leading-6
              text-white/35
            "
          >
            Quando cada conversa, atendente e acesso estão no lugar certo, sua equipe deixa de trabalhar no improviso.
          </p>

          <button
            type="button"
            onClick={() => {
              document.getElementById("wr")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="
              group
              flex
              w-full
              sm:w-fit
              justify-center
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              px-5
              py-3
              text-xs
              font-semibold
              text-white
              transition-all
              duration-300
              hover:border-ciano-claro/30
              hover:bg-ciano-claro/10
            "
          >
            E quem coloca tudo isso para funcionar?
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

function MessageCircleIcon() {
  return <MessagesSquare size={12} className="text-white/35" />;
}