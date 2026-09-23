import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  journeySections,
  useJourney,
} from "../../context/JourneyContext";
import Icon from "../../assets/Verde-com-fundo-branco.svg";
import wricon from "../../assets/Nome-COLORIDO.png"

const WHATSAPP_URL = "https://wa.me/552231991580?text=Ol%C3%A1!%20Vi%20a%20p%C3%A1gina%20do%20LeadIn%20e%20quero%20falar%20com%20um%20especialista.";

export default function TimelineHeader() {
  const {
    activeSection,
    goToSection,
    progress,
  } = useJourney();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectSection = (index: number) => {
    goToSection(index);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        border-b
        border-escuro-principal/10
        bg-white/90
        shadow-sm
        backdrop-blur-xl
        transition-all
        duration-300
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          w-full
          max-w-[1240px]
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-12
        "
      >
        {/* LOGO / NOME */}
        <div
          onClick={() => handleSelectSection(0)}
          className="flex cursor-pointer items-center gap-2 shrink-0"
        >
          <img src={Icon} alt="LeadIn" className="h-8 w-8" />
          <h1 className="font-bold tracking-tight text-escuro-principal text-sm sm:text-base">
            LeadIn
          </h1>
          <span className="font-bold text-escuro-principal">+</span>
          <img src={wricon} alt="WR" className="h-6 w-full object-contain" />
        </div>

        {/* TIMELINE HORIZONTAL (APENAS DESKTOP) */}
        <nav
          className="
            hidden
            md:flex
            items-center
            gap-6
            lg:gap-8
          "
        >
          {journeySections.map((section, index) => {
            const active = activeSection === index;
            const past = activeSection > index;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSelectSection(index)}
                className="group relative flex items-center gap-2 py-1 shrink-0 cursor-pointer"
                aria-label={`Ir para ${section.label}`}
              >
                <span
                  className={`
                    block
                    rounded-full
                    transition-all
                    duration-500
                    ${
                      active
                        ? "h-2 w-6 bg-verde-principal shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                        : past
                          ? "h-2 w-2 bg-escuro-principal/40 group-hover:bg-escuro-principal/70"
                          : "h-2 w-2 bg-escuro-principal/15 group-hover:bg-escuro-principal/40"
                    }
                  `}
                />
                <span
                  className={`
                    text-xs
                    font-medium
                    whitespace-nowrap
                    transition-all
                    duration-300
                    ${
                      active
                        ? "font-bold text-escuro-principal"
                        : "text-escuro-principal/50 group-hover:text-escuro-principal/80"
                    }
                  `}
                >
                  {section.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* LINK DO WHATSAPP (DESKTOP) E HAMBURGER (MOBILE) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex rounded-full bg-escuro-principal px-4 py-1.5 text-xs font-bold text-white transition-all duration-300 hover:bg-verde-principal hover:text-escuro-principal hover:shadow-[0_4px_15px_rgba(34,197,94,0.3)]"
          >
            Falar com especialista
          </a>

          {/* BOTÃO MENU MOBILE */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-escuro-principal/5 text-escuro-principal border border-escuro-principal/10 transition-colors hover:bg-escuro-principal/10"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MENU DROPDOWN MOBILE */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full border-b border-escuro-principal/10 bg-white/95 px-6 py-5 shadow-xl backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {journeySections.map((section, index) => {
              const active = activeSection === index;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleSelectSection(index)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-verde-principal/15 font-bold text-verde-escuro border border-verde-principal/20"
                      : "text-escuro-principal/70 hover:bg-escuro-principal/5 border border-transparent"
                  }`}
                >
                  <span>{section.label}</span>
                  {active && <span className="h-2 w-2 rounded-full bg-verde-principal" />}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* BARRA DE PROGRESSO GLOBAL SUTIL NO TOPO DO HEADER */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-escuro-principal/[0.03]">
        <div
          className="h-full bg-verde-principal transition-all duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}