import { useEffect, useRef, useState } from "react";
import { AlertCircle, Check, Clock3 } from "lucide-react";
import { useJourney } from "../../context/JourneyContext";

const TOTAL_SECONDS = 24 * 60 * 60;
const MAX_CLOCK_PROGRESS = 0.9;
const CLOCK_SPEED = 0.9;
const COST_PER_LOST_LEAD = 0.34;

const CLIENTS = [
  "Padaria Pão da Praia",
  "Alcides Sales",
  "Espaço das Pratas",
  "Ignez Esteves",
  "Yássara Lohanya",
  "Comércio Aldeia",
  "Marcos Pinheiro",
];

const SUCCESS_MILESTONES = [0.08, 0.18, 0.30, 0.42, 0.55, 0.68, 0.82];
const LOSS_MILESTONES = [0.03, 0.07, 0.12, 0.18, 0.25, 0.33, 0.42];

function formatTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

function formatMoney(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function ScrollClock() {
  const { progress, maxProgress, scrollDirection } = useJourney();

  const [clockProgress, setClockProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "loss" } | null>(null);
  
  const previousProgressRef = useRef(progress);
  const wasGoingBackRef = useRef(false);
  const prevSuccessCountRef = useRef(0);
  const prevLossCountRef = useRef(0);

  const rollbackDistance = Math.max(0, maxProgress - progress);
  const isGoingBack =
    scrollDirection === "up" && rollbackDistance > 0.01 && maxProgress > 0.08;

  // Mostra o relógio apenas após o usuário rolar um pouco para fora da Hero (ex: > 12%)
  const isOutsideHero = progress > 0.12;

  useEffect(() => {
    const previousProgress = previousProgressRef.current;
    const delta = progress - previousProgress;

    if (isGoingBack) {
      wasGoingBackRef.current = true;
      previousProgressRef.current = progress;
      return;
    }

    if (scrollDirection === "down" && wasGoingBackRef.current) {
      setClockProgress(0);
      wasGoingBackRef.current = false;
      previousProgressRef.current = progress;
      return;
    }

    if (scrollDirection === "down" && delta > 0) {
      setClockProgress((current) =>
        Math.min(MAX_CLOCK_PROGRESS, current + delta * CLOCK_SPEED)
      );
    }

    previousProgressRef.current = progress;
  }, [progress, scrollDirection, isGoingBack]);

  const remainingSeconds = TOTAL_SECONDS * (1 - clockProgress);
  const time = formatTime(remainingSeconds);

  const successfulCount = SUCCESS_MILESTONES.filter(
    (milestone) => clockProgress >= milestone
  ).length;

  const successfulClients = CLIENTS.slice(0, successfulCount);
  const lastSuccessfulClient = successfulClients[successfulClients.length - 1];

  const calculatedLostCount = LOSS_MILESTONES.filter(
    (milestone) => rollbackDistance >= milestone
  ).length;

  const actualLostCount = Math.min(calculatedLostCount, successfulCount);
  const lastLostClient = actualLostCount > 0 ? CLIENTS[actualLostCount - 1] : null;
  const potentialCost = actualLostCount * COST_PER_LOST_LEAD;

  useEffect(() => {
    if (!isGoingBack && successfulCount > prevSuccessCountRef.current && lastSuccessfulClient) {
      setToastMessage({ text: `${lastSuccessfulClient} atendido a tempo!`, type: "success" });
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
    prevSuccessCountRef.current = successfulCount;
  }, [successfulCount, isGoingBack, lastSuccessfulClient]);

  useEffect(() => {
    if (isGoingBack && actualLostCount > prevLossCountRef.current && lastLostClient) {
      setToastMessage({ text: `${lastLostClient} ficou para trás.`, type: "loss" });
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
    prevLossCountRef.current = actualLostCount;
  }, [actualLostCount, isGoingBack, lastLostClient]);

  return (
    <div
      className={`
        fixed
        bottom-6
        left-6
        z-50
        flex
        items-end
        gap-3
        group
        transition-all
        duration-700
        ease-out
        ${
          isOutsideHero
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-10 opacity-0 pointer-events-none"
        }
      `}
    >
      {/* BALÃO DE CONTEXTO TEMPORÁRIO (TOAST AO LADO) */}
      {toastMessage && (
        <div
          className={`
            flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-semibold shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300
            ${toastMessage.type === "success" 
              ? "border border-verde-principal/30 bg-white/95 text-escuro-principal" 
              : "border border-red-500/30 bg-white/95 text-escuro-principal"
            }
          `}
        >
          {toastMessage.type === "success" ? (
            <Check size={14} className="text-verde-principal shrink-0" strokeWidth={3} />
          ) : (
            <AlertCircle size={14} className="text-red-500 shrink-0" strokeWidth={2.5} />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* PÍLULA PRINCIPAL */}
      {!isGoingBack ? (
        <div className="flex items-center gap-2.5 rounded-full border border-escuro-principal/15 bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-verde-principal/40">
          <Clock3 size={15} className="text-verde-principal animate-pulse" strokeWidth={2.5} />
          <span className="font-mono text-xs font-bold tabular-nums tracking-wider text-escuro-principal">
            {time}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-verde-principal" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-verde-principal">
            LeadIn
          </span>

          {/* DETALHE FIXO NO HOVER */}
          {lastSuccessfulClient && (
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex flex-col rounded-xl border border-escuro-principal/10 bg-white/95 p-3 shadow-xl backdrop-blur-md w-48">
              <span className="text-[8px] font-bold uppercase tracking-wider text-escuro-principal/40 mb-1">
                Última conversão
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-escuro-principal font-medium">
                <Check size={11} className="text-verde-principal shrink-0" />
                <span className="truncate">{lastSuccessfulClient}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2.5 rounded-full border border-red-500/20 bg-white/95 px-4 py-2.5 shadow-xl shadow-red-500/5 backdrop-blur-md transition-all duration-300">
          <AlertCircle size={15} className="text-red-500 animate-bounce" strokeWidth={2.5} />
          <span className="text-[9px] font-bold uppercase tracking-wider text-red-500">
            Sem LeadIn
          </span>
          {actualLostCount > 0 && (
            <>
              <span className="h-1 w-1 rounded-full bg-red-300" />
              <span className="font-mono text-xs font-black text-red-500">
                {formatMoney(potentialCost)}
              </span>
            </>
          )}

          {/* DETALHE FIXO NO HOVER */}
          {lastLostClient && (
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex flex-col rounded-xl border border-red-500/20 bg-white/95 p-3 shadow-xl backdrop-blur-md w-52">
              <span className="text-[8px] font-bold uppercase tracking-wider text-red-500 mb-1">
                Oportunidade perdida
              </span>
              <span className="text-[10px] text-escuro-principal font-medium line-through decoration-red-500">
                {lastLostClient}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}