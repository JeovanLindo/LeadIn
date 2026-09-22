import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  ScrollTrigger,
  useGSAP,
} from "../lib/gsap";

export const journeySections = [
  {
    id: "inicio",
    label: "Início",
  },
  {
    id: "problema",
    label: "Problema",
  },
  {
    id: "produto",
    label: "Produto",
  },
  {
    id: "recursos",
    label: "Recursos",
  },
  {
    id: "wr",
    label: "WR Digital",
  },
  {
    id: "planos",
    label: "Planos",
  },
];

type ScrollDirection = "up" | "down";

type JourneyContextType = {
  progress: number;
  maxProgress: number;
  activeSection: number;
  scrollDirection: ScrollDirection;
  hasReturnedToHero: boolean;
  goToSection: (index: number) => void;
};

const JourneyContext =
  createContext<
    JourneyContextType | undefined
  >(undefined);

type JourneyProviderProps = {
  children: ReactNode;
};

/*
 * Quanto a pessoa precisa explorar
 * antes da Hero poder mudar.
 *
 * 0.30 = 30% do site.
 */
const HERO_UNLOCK_PROGRESS = 0.3;

export function JourneyProvider({
  children,
}: JourneyProviderProps) {
  const [progress, setProgress] =
    useState(0);

  const [
    maxProgress,
    setMaxProgress,
  ] = useState(0);

  const [
    activeSection,
    setActiveSection,
  ] = useState(0);

  const [
    scrollDirection,
    setScrollDirection,
  ] =
    useState<ScrollDirection>(
      "down",
    );

  const [
    hasReturnedToHero,
    setHasReturnedToHero,
  ] = useState(false);

  /*
   * Guardamos o maior progresso
   * sem depender de renderizações.
   */
  const maxProgressRef =
    useRef(0);

  useGSAP(() => {
    /*
     * PROGRESSO GERAL
     */

    const pageProgress =
      ScrollTrigger.create({
        start: 0,

        end: () =>
          ScrollTrigger.maxScroll(
            window,
          ),

        onUpdate: (self) => {
          const current = self.progress;

          setProgress(current);

          setScrollDirection(
            self.direction === 1
              ? "down"
              : "up",
          );

          if (
            current >
            maxProgressRef.current
          ) {
            maxProgressRef.current =
              current;

            setMaxProgress(current);
          }
        },
      });

    /*
     * SECTIONS
     */

    const sectionTriggers =
      journeySections.map(
        (section, index) => {
          const element =
            document.getElementById(
              section.id,
            );

          if (!element) {
            return null;
          }

          return ScrollTrigger.create({
            trigger: element,

            start: "top 50%",

            end: "bottom 50%",

            onToggle: (self) => {
              if (self.isActive) {
                setActiveSection(
                  index,
                );
              }
            },
          });
        },
      );

    /*
     * DETECTA RETORNO À HERO
     *
     * Só muda a Hero se a pessoa
     * já tiver conhecido uma parte
     * relevante do site.
     */

    const hero =
      document.getElementById(
        "inicio",
      );

    let heroTrigger:
      | ScrollTrigger
      | undefined;

    if (hero) {
      heroTrigger =
        ScrollTrigger.create({
          trigger: hero,

          start: "top top",

          end: "bottom 50%",

          onEnterBack: () => {
            if (
              maxProgressRef.current >=
              HERO_UNLOCK_PROGRESS
            ) {
              setHasReturnedToHero(
                true,
              );
            }
          },
        });
    }

    ScrollTrigger.refresh();

    return () => {
      pageProgress.kill();

      heroTrigger?.kill();

      sectionTriggers.forEach(
        (trigger) => {
          trigger?.kill();
        },
      );
    };
  });

  /*
   * NAVEGAÇÃO
   */

  const goToSection =
    useCallback(
      (index: number) => {
        const section =
          journeySections[index];

        if (!section) return;

        const element =
          document.getElementById(
            section.id,
          );

        if (!element) return;

        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      },
      [],
    );

  const value = useMemo(
    () => ({
      progress,

      maxProgress,

      activeSection,

      scrollDirection,

      hasReturnedToHero,

      goToSection,
    }),
    [
      progress,
      maxProgress,
      activeSection,
      scrollDirection,
      hasReturnedToHero,
      goToSection,
    ],
  );

  return (
    <JourneyContext.Provider
      value={value}
    >
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const context =
    useContext(JourneyContext);

  if (!context) {
    throw new Error(
      "useJourney precisa estar dentro de JourneyProvider",
    );
  }

  return context;
}