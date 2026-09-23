import { useEffect, useRef, useState } from "react";
import { AlertCircle, Check, Clock3, MapPin, Crosshair } from "lucide-react";
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
  
  const [userState, setUserState] = useState("A localizar...");
  const [targetLeads, setTargetLeads] = useState(0);
  const [leadsCount, setLeadsCount] = useState(0);

  const previousProgressRef = useRef(progress);
  const wasGoingBackRef = useRef(false);
  const prevSuccessCountRef = useRef(0);
  const prevLossCountRef = useRef(0);

  const rollbackDistance = Math.max(0, maxProgress - progress);
  const isGoingBack = scrollDirection === "up" && rollbackDistance > 0.01 && maxProgress > 0.08;
  const isOutsideHero = progress > 0.12;

  useEffect(() => {
    async function fetchLocation() {
      const generateLeadsTarget = (regionName: string) => {
        const hash = regionName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return (hash * 31) % 15000 + 4500;
      };

      try {
        const res1 = await fetch("https://get.geojs.io/v1/ip/geo.json");
        const data1 = await res1.json();
        if (data1 && data1.region) {
          setUserState(data1.region);
          setTargetLeads(generateLeadsTarget(data1.region));
          return;
        }
      } catch (e) {}

      try {
        const res2 = await fetch("https://ipinfo.io/json");
        const data2 = await res2.json();
        if (data2 && data2.region) {
          setUserState(data2.region);
          setTargetLeads(generateLeadsTarget(data2.region));
          return;
        }
      } catch (e) {}

      setUserState("Brasil");
      setTargetLeads(8482);
    }

    fetchLocation();
  }, []);

  useEffect(() => {
    if (isOutsideHero && targetLeads > 0 && leadsCount < targetLeads) {
      const interval = setInterval(() => {
        setLeadsCount((prev) => {
          const step = Math.ceil((targetLeads - prev) / 8);
          if (prev + step >= targetLeads) {
            clearInterval(interval);
            return targetLeads;
          }
          return prev + step;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isOutsideHero, leadsCount, targetLeads]);

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

  const successfulCount = SUCCESS_MILESTONES.filter((m) => clockProgress >= m).length;
  const successfulClients = CLIENTS.slice(0, successfulCount);
  const lastSuccessfulClient = successfulClients[successfulClients.length - 1];

  const calculatedLostCount = LOSS_MILESTONES.filter((m) => rollbackDistance >= m).length;
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
        bottom-4
        left-4
        sm:bottom-6
        sm:left-6
        z-40
        flex
        flex-col
        items-start
        gap-2
        max-w-[calc(100vw-2rem)]
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
      {/* 1. LOCALIZAÇÃO (EM CIMA) COM O TOOLTIP RESTAURADO */}
      <div className="group/radar relative flex items-center gap-2 rounded-full border border-escuro-principal/10 bg-white/90 px-3.5 py-2 shadow-lg backdrop-blur-md transition-all duration-300 max-w-full cursor-help">
        <MapPin size={13} className="text-escuro-principal shrink-0" strokeWidth={2.5} />
        
        <span className="text-[10px] font-bold uppercase tracking-wider text-escuro-principal truncate max-w-[120px] sm:max-w-[160px]">
          {userState}
        </span>
        
        <span className="h-1 w-1 rounded-full bg-escuro-principal/20 shrink-0" />
        
        <div className="flex items-center gap-1 text-ciano-escuro shrink-0">
          <Crosshair size={12} className={leadsCount < targetLeads ? "animate-spin text-ciano-claro" : "opacity-80"} strokeWidth={2.5} />
          
          <span className="font-mono text-[10px] sm:text-[11px] font-black tabular-nums tracking-tight">
            {leadsCount > 0 ? `${leadsCount.toLocaleString("pt-BR")}.00` : "---"}
          </span>
          
          <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-escuro-principal/60 hidden xs:inline">
            Leads
          </span>
        </div>

        {/* TOOLTIP DE REFLEXÃO NO HOVER */}
        <div className="absolute bottom-full left-0 mb-3 hidden group-hover/radar:flex flex-col rounded-2xl border border-red-500/10 bg-white/95 p-3.5 shadow-[0_10px_40px_rgba(0,0,0,0.12)] backdrop-blur-md w-64 animate-in fade-in slide-in-from-bottom-2">
          <span className="text-[11px] text-escuro-principal font-medium leading-relaxed">
            Quantos destes fecharam com o <strong className="text-red-500">concorrente</strong> hoje enquanto a sua equipe tentava organizar o WhatsApp?
          </span>
        </div>
      </div>

      {/* 2. LINHA INFERIOR: RELÓGIO + NOTIFICAÇÃO DA PADARIA LADO A LADO */}
      <div className="flex flex-wrap items-center gap-2 w-full">
        
        {/* RELÓGIO */}
        {!isGoingBack ? (
          <div className="group relative flex items-center gap-2 rounded-full border border-escuro-principal/15 bg-white/95 px-3.5 py-2 shadow-xl backdrop-blur-md transition-all duration-300 shrink-0">
            <Clock3 size={14} className="text-verde-principal animate-pulse shrink-0" strokeWidth={2.5} />
            <span className="font-mono text-xs font-bold tabular-nums tracking-wider text-escuro-principal">
              {time}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-verde-principal shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-verde-principal">
              LeadIn
            </span>
          </div>
        ) : (
          <div className="group relative flex items-center gap-2 rounded-full border border-red-500/20 bg-white/95 px-3.5 py-2 shadow-xl shadow-red-500/5 backdrop-blur-md transition-all duration-300 shrink-0">
            <AlertCircle size={14} className="text-red-500 animate-bounce shrink-0" strokeWidth={2.5} />
            <span className="text-[9px] font-bold uppercase tracking-wider text-red-500">
              Sem LeadIn
            </span>
            {actualLostCount > 0 && (
              <>
                <span className="h-1 w-1 rounded-full bg-red-300 shrink-0" />
                <span className="font-mono text-xs font-black text-red-500">
                  {formatMoney(potentialCost)}
                </span>
              </>
            )}
          </div>
        )}

        {/* BALÃO DA PADARIA / TOAST AO LADO DO RELÓGIO */}
        {toastMessage && (
          <div
            className={`
              flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-left-2 duration-300 max-w-full truncate shrink-0
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
            <span className="truncate">{toastMessage.text}</span>
          </div>
        )}

      </div>

    </div>
  );
}