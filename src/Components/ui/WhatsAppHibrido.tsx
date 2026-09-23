import { useState } from "react";
import { MessageCircle, X, Sparkles, Send, CheckCheck } from "lucide-react";

export default function WhatsAppHibrido() {
  const [isOpen, setIsOpen] = useState(false);
  const [etapa, setEtapa] = useState<"menu" | "chat-leadin" | "chat-wr">("menu");

  const handleOpenWhatsApp = (tipo: "leadin" | "wr") => {
    let mensagem = "";
    if (tipo === "leadin") {
      mensagem = "Olá! Vi a página do LeadIn e quero ver o sistema funcionando e entender os planos.";
    } else {
      mensagem = "Olá! Vim pela página da WR Digital e preciso de ajuda com tráfego pago, implantação ou estrutura.";
    }
    const encoded = encodeURIComponent(mensagem);
    
    setTimeout(() => {
      window.open(`https://wa.me/552231991580?text=${encoded}`, "_blank");
      setIsOpen(false);
      setEtapa("menu");
    }, 4200);
  };

  const fecharModal = () => {
    setIsOpen(false);
    setEtapa("menu");
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      
      {/* JANELA DE CHAT MODERNA RESPONSIVA */}
      {isOpen && (
        <div className="mb-4 w-full sm:w-[350px] max-w-[calc(100vw-2rem)] rounded-[24px] border border-white/10 bg-[#020618]/95 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 text-white">
          
          {/* CABEÇALHO DO CHAT */}
          <div className="border-b border-white/10 px-4 py-3 bg-white/[0.03] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-verde-principal/20 font-bold text-ciano-claro text-xs">
                  WR
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-verde-principal border-2 border-[#020618]" />
              </div>
              <div className="min-w-0">
                <strong className="block text-[11px] font-bold tracking-tight text-white leading-tight truncate">
                  LeadIn & WR Digital
                </strong>
                <span className="flex items-center gap-1 text-[9px] text-gray-400">
                  <span className="bg-verde-principal h-2 w-2 rounded-full inline-block" /> Online
                </span>
              </div>
            </div>
            
            <button
              onClick={fecharModal}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar chat"
            >
              <X size={13} />
            </button>
          </div>

          {/* CORPO DA CONVERSA SIMULADA */}
          <div className="p-3.5 min-h-[200px] max-h-[260px] overflow-y-auto flex flex-col gap-2.5 text-xs bg-black/20">
            
            <div className="flex items-end gap-2 max-w-[90%]">
              <div className="rounded-2xl rounded-bl-sm bg-white/10 border border-white/5 p-3 text-gray-200 leading-relaxed text-[11px]">
                <p className="font-bold mb-1 text-ciano-claro flex items-center gap-1">
                  <Sparkles size={11} /> Olá! Tudo bem?
                </p>
                Como podemos ajudar a sua operação hoje? Escolha uma opção:
              </div>
            </div>

            {etapa === "chat-leadin" && (
              <>
                <div className="flex items-end justify-end gap-2">
                  <div className="rounded-2xl rounded-br-sm bg-verde-principal/20 border border-verde-principal/30 p-2.5 text-[11px] text-white">
                    Quero conhecer o LeadIn e ver os planos.
                  </div>
                </div>
                <div className="flex items-end gap-2 max-w-[90%]">
                  <div className="rounded-2xl rounded-bl-sm bg-white/10 border border-white/5 p-3 text-gray-200 leading-relaxed text-[11px]">
                    Perfeito! Vou abrir o WhatsApp oficial com os detalhes do CRM e do radar de 24h para conversarmos.
                  </div>
                </div>
              </>
            )}

            {etapa === "chat-wr" && (
              <>
                <div className="flex items-end justify-end gap-2">
                  <div className="rounded-2xl rounded-br-sm bg-amber-500/20 border border-amber-500/30 p-2.5 text-[11px] text-white">
                    Preciso de ajuda com tráfego e implantação.
                  </div>
                </div>
                <div className="flex items-end gap-2 max-w-[90%]">
                  <div className="rounded-2xl rounded-bl-sm bg-white/10 border border-white/5 p-3 text-gray-200 leading-relaxed text-[11px]">
                    Excelente! A nossa equipa está pronta para estruturar a sua conta na Meta. Redirecionando para o WhatsApp...
                  </div>
                </div>
              </>
            )}

          </div>

          {/* RODAPÉ DO CHAT */}
          <div className="p-2.5 border-t border-white/10 bg-white/[0.02] flex flex-col gap-2">
            {etapa === "menu" ? (
              <>
                <button
                  onClick={() => {
                    setEtapa("chat-leadin");
                    handleOpenWhatsApp("leadin");
                  }}
                  className="w-full flex items-center justify-between rounded-xl bg-white/5 hover:bg-verde-principal/15 border border-white/10 hover:border-verde-principal/30 p-2.5 text-[11px] font-semibold text-gray-200 hover:text-white transition-all cursor-pointer text-left group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform truncate pr-2">🤖 Quero conhecer o LeadIn (CRM)</span>
                  <Send size={12} className="text-ciano-claro shrink-0" />
                </button>

                <button
                  onClick={() => {
                    setEtapa("chat-wr");
                    handleOpenWhatsApp("wr");
                  }}
                  className="w-full flex items-center justify-between rounded-xl bg-white/5 hover:bg-amber-500/15 border border-white/10 hover:border-amber-500/30 p-2.5 text-[11px] font-semibold text-gray-200 hover:text-white transition-all cursor-pointer text-left group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform truncate pr-2">🚀 Tráfego e Implantação (WR)</span>
                  <Send size={12} className="text-amber-400 shrink-0" />
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold text-ciano-claro animate-pulse">
                <CheckCheck size={15} className="text-verde-principal" />
                Redirecionando...
              </div>
            )}
          </div>

        </div>
      )}

      {/* BOTÃO FLUTUANTE PRINCIPAL */}
      <div className="flex items-center gap-3 group">
        {!isOpen && (
          <div className="hidden sm:group-hover:flex items-center rounded-2xl border border-white/10 bg-[#020618]/90 px-4 py-2.5 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-right-2 duration-300">
            <span className="text-xs font-bold text-white whitespace-nowrap">
              Falar com especialista
            </span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir chat de atendimento"
          className="
            relative
            flex
            h-13
            w-13
            sm:h-14
            sm:w-14
            items-center
            justify-center
            rounded-full
            bg-[#25D366]
            text-white
            shadow-[0_10px_30px_rgba(37,211,102,0.4)]
            transition-all
            duration-300
            hover:scale-110
            hover:bg-[#20ba5a]
            cursor-pointer
          "
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
          {isOpen ? <X size={24} strokeWidth={2.5} /> : <MessageCircle size={26} strokeWidth={2.2} className="relative z-10" />}
        </button>
      </div>

    </div>
  );
}