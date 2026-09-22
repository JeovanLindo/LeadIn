import {
  journeySections,
  useJourney,
} from "../../context/JourneyContext";

export default function ScrollSidebar() {
  const {
    activeSection,
    goToSection,
  } = useJourney();

  return (
    <aside
      className="
        fixed
        right-8
        top-1/2
        z-40
        hidden
        -translate-y-1/2
        lg:block
      "
    >
      <nav
        className="
          flex
          flex-col
          items-end
          gap-4
        "
      >
        {journeySections.map(
          (section, index) => {
            const active =
              activeSection === index;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() =>
                  goToSection(index)
                }
                className="
                  group
                  flex
                  items-center
                  justify-end
                  gap-3
                  cursor-pointer
                "
                aria-label={
                  `Ir para ${section.label}`
                }
              >
                {/* NOME */}
                <span
                  className={`
                    whitespace-nowrap
                    text-[11px]
                    font-medium
                    transition-all
                    duration-300
                    ${
                      active
                        ? "text-verde-principal opacity-100 font-bold"
                        : "text-escuro-principal/50 opacity-70 group-hover:opacity-100 group-hover:text-escuro-principal"
                    }
                  `}
                >
                  {section.label}
                </span>

                {/* LINHA */}
                <span
                  className={`
                    block
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      active
                        ? "h-[3px] w-12 bg-verde-principal"
                        : "h-[2px] w-6 bg-escuro-principal/25 group-hover:w-9 group-hover:bg-verde-principal/60"
                    }
                  `}
                />
              </button>
            );
          },
        )}
      </nav>
    </aside>
  );
}