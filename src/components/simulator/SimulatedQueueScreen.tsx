import React, { useState } from "react";
import { ArrowLeft, Car, User, MessageCircle, Clock, Check } from "lucide-react";
import { PhoneStatusBar } from "../PhoneMockup";
import { useLanguage } from "../../contexts/LanguageContext";

export function SimulatedQueueScreen({
  servicesList,
  setServicesList,
  onNavigate,
  showToast,
}: {
  servicesList: any[];
  setServicesList: React.Dispatch<React.SetStateAction<any[]>>;
  onNavigate: (screen: any) => void;
  showToast: (msg: string) => void;
}) {
  const { language, t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<"pending" | "completed">(
    "pending",
  );
  const filtered = servicesList.filter((s) => s.status === activeSubTab);

  return (
    <div className="flex flex-col h-full w-full bg-[#1a7bc2] overflow-hidden text-slate-800 rounded-b-[2.25rem] relative select-none text-left">
      <PhoneStatusBar dark={false} />

      {/* Header Blue */}
      <div className="bg-[#1a7bc2] pt-8 pb-6 px-5 shrink-0 relative z-0">
        <div className="flex items-center gap-4 text-white">
          <button
            onClick={() => onNavigate("home")}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer border border-transparent"
            aria-label="Voltar para o início"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-bold tracking-wide">{t.interactive.tabQueue}</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow bg-[#f4f5f7] rounded-t-3xl rounded-b-[2.25rem] -mt-5 p-4 overflow-hidden relative z-10 flex flex-col gap-4 w-full">
        {/* Tabs */}
        <div className="flex gap-2 mb-1 px-1 justify-center z-20 relative">
          <button
            onClick={() => setActiveSubTab("pending")}
            className={`w-[140px] py-1.5 text-center rounded-lg border shadow-sm flex items-center justify-center cursor-pointer transition-all
              ${
                activeSubTab === "pending"
                  ? "border-blue-200 bg-blue-50/20"
                  : "border-slate-200 bg-white"
              }`}
          >
            <span
              className={`font-bold text-xs tracking-wide ${activeSubTab === "pending" ? "text-[#1875D3]" : "text-slate-500"}`}
            >
              {t.hero.tabPending}
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab("completed")}
            className={`w-[140px] py-1.5 text-center rounded-lg border shadow-sm flex items-center justify-center cursor-pointer transition-all
              ${
                activeSubTab === "completed"
                  ? "border-blue-200 bg-blue-50/20"
                  : "border-slate-200 bg-white"
              }`}
          >
            <span
              className={`font-bold text-xs tracking-wide ${activeSubTab === "completed" ? "text-[#1875D3]" : "text-slate-500"}`}
            >
              {t.hero.tabCompleted}
            </span>
          </button>
        </div>

        {/* List */}
        <div className="flex flex-col gap-4 flex-grow overflow-y-auto no-scrollbar">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <Car size={32} className="opacity-40 mb-2" />
              <p className="text-xs font-semibold">{t.interactive.simQueueEmpty}</p>
            </div>
          ) : (
            filtered.map((item, index) => {
              const isCompleted = item.status === "completed";
              const isFirst = index === 0 && !isCompleted;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-[1.25rem] p-4 shadow-[0_2px_15px_rgba(0,0,0,0.06)] border relative flex flex-col gap-4 transition-all
                    ${
                      isCompleted
                        ? "border-slate-100 opacity-60"
                        : isFirst
                          ? "border-blue-300 ring-2 ring-blue-500/10 shadow-lg"
                          : "border-slate-100"
                    }`}
                >
                  {/* Top Row: Car, Plate, Order */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Car
                        size={16}
                        className={
                          isFirst
                            ? "text-blue-500"
                            : isCompleted
                              ? "text-slate-400"
                              : "text-[#1875D3]"
                        }
                      />
                      <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                        {item.model}
                      </span>
                      <span
                        className={`${isFirst ? "bg-blue-100 border-blue-200" : "bg-blue-50 border-blue-100"} text-[#1875D3] text-[11px] font-bold px-1.5 py-0.5 rounded tracking-wider border flex-shrink-0`}
                      >
                        {item.plate}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded flex-shrink-0">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Middle Row: User, WhatsApp Button */}
                  <div className="flex justify-between items-center pl-1">
                    <div className="flex items-center gap-2">
                      <div className="text-slate-400">
                        <User size={14} />
                      </div>
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                        {item.name}
                      </span>
                    </div>
                    {!isCompleted && (
                      <button
                        onClick={() =>
                          showToast(
                            language === "pt"
                              ? `Notificação enviada para ${item.name}!`
                              : language === "en"
                                ? `Notification sent to ${item.name}!`
                                : `Notificación enviada a ${item.name}!`
                          )
                        }
                        className={`${isFirst ? "bg-[#25D366] text-white hover:bg-green-500 shadow-md shadow-green-500/20" : "border border-[#25D366]/40 text-[#25D366] bg-transparent hover:bg-[#25D366]/5"} flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors cursor-pointer`}
                      >
                        <MessageCircle
                          size={12}
                          className={isFirst ? "fill-current" : ""}
                        />
                        <span className="text-xs font-bold">{t.hero.btnNotify}</span>
                      </button>
                    )}
                  </div>

                  {/* Bottom Row: Time, Price, Check Button */}
                  <div className="flex justify-between items-center mt-1 pl-1">
                    <div className="flex items-center gap-1 bg-green-50/80 text-green-600 px-2 py-0.5 rounded-full border border-green-100">
                      <Clock size={12} />
                      <span className="text-xs font-bold">{item.time}</span>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-xl font-black text-slate-900 tracking-[-0.02em] whitespace-nowrap">
                        {language === "pt" ? "R$ " : "$ "}{language === "pt" ? item.price : item.price.replace(",", ".")}
                      </span>
                      {!isCompleted && (
                        <button
                          onClick={() => {
                            setServicesList((prev) =>
                              prev.map((s) =>
                                s.id === item.id
                                  ? { ...s, status: "completed" }
                                  : s,
                              ),
                            );
                            showToast(
                              language === "pt"
                                ? "Serviço concluído!"
                                : language === "en"
                                  ? "Service completed!"
                                  : "¡Servicio completado!"
                            );
                          }}
                          className={`w-10 h-10 aspect-square flex-shrink-0 ${isFirst ? "bg-[#22c55e] hover:bg-[#16a34a] shadow-[0_4px_12px_rgba(34,197,94,0.35)]" : "bg-slate-200 hover:bg-slate-300"} rounded-full flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-[0.98] cursor-pointer`}
                          aria-label="Concluir serviço e notificar"
                        >
                          <Check
                            size={20}
                            strokeWidth={3}
                            className={isFirst ? "" : "text-slate-400"}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
