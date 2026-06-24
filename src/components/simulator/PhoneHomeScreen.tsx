import React from "react";
import { Car, Plus, Search, Camera, ClipboardList, TrendingDown } from "lucide-react";
import { PhoneStatusBar } from "../PhoneMockup";
import { useLanguage } from "../../contexts/LanguageContext";

interface MenuCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  colorBg: string;
  onClick: () => void;
}

function MenuCard({ title, desc, icon, colorBg, onClick }: MenuCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 ${colorBg} p-3.5 rounded-2xl border border-white/10 hover:brightness-105 transition-all active:scale-[0.98] cursor-pointer shadow-md shadow-slate-900/5 w-full`}
    >
      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-white">
        {icon}
      </div>
      <div className="text-left text-white">
        <h4 className="font-bold text-sm leading-tight">{title}</h4>
        <p className="text-white/80 text-[11px] mt-0.5 leading-tight">{desc}</p>
      </div>
    </button>
  );
}

export function PhoneHomeScreen({
  onNavigate,
  showToast,
}: {
  onNavigate: (screen: any) => void;
  showToast: (msg: string) => void;
}) {
  const { language, t } = useLanguage();
  const initial = "A";

  return (
    <div className="flex flex-col h-full w-full bg-[#1a7bc2] text-white relative select-none">
      <PhoneStatusBar dark={false} />

      {/* Top Blue Header Section */}
      <div className="bg-[#1a7bc2] pt-8 pb-6 px-5 flex justify-end items-center z-10 shrink-0">
        <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:bg-white/30 transition-colors">
          {initial}
        </div>
      </div>

      {/* Main Body with rounded top corner */}
      <div className="flex-grow bg-[#f8fafc] rounded-t-[2rem] -mt-5 p-4 pt-6 flex flex-col gap-4 overflow-y-auto no-scrollbar relative z-10 shadow-[0_-10px_25px_rgba(0,0,0,0.05)]">
        {/* SISTEMA DE LAVAGEM Subtitle */}
        <div className="text-center shrink-0">
          <span className="text-[#eb4547] text-xs font-extrabold tracking-widest uppercase block">
            {language === "pt" ? "Sistema de Lavagem" : language === "en" ? "Wash System" : "Sistema de Lavado"}
          </span>

          {/* Badge: VIP PRO */}
          <div className="mx-auto mt-1.5 px-3 py-0.5 bg-[#fef08a] border border-[#fef08a] rounded-full flex items-center justify-center gap-1 w-fit shadow-sm">
            <span className="text-[10px] font-black text-[#854d0e]">
              ★ VIP PRO
            </span>
          </div>
        </div>

        {/* Menu Cards List */}
        <div className="flex flex-col gap-2 flex-grow overflow-y-auto no-scrollbar pb-2">
          <MenuCard
            title={t.interactive.tabQueue}
            desc={language === "pt" ? "Acompanhar lavagens" : language === "en" ? "Track washes" : "Monitorear lavados"}
            icon={<Car size={18} className="text-white" />}
            colorBg="bg-[#10b981]"
            onClick={() => onNavigate("patio")}
          />
          <MenuCard
            title={t.interactive.tabRegister}
            desc={language === "pt" ? "Cliente ou Serviço" : language === "en" ? "Customer or Service" : "Cliente o Servicio"}
            icon={<Plus size={18} className="text-white" />}
            colorBg="bg-[#1a7bc2]"
            onClick={() => onNavigate("novo_cadastro")}
          />
          <MenuCard
            title={t.interactive.tabHistory}
            desc={language === "pt" ? "Clientes ou Serviços" : language === "en" ? "Customers or Services" : "Clientes o Servicios"}
            icon={<Search size={18} className="text-white" />}
            colorBg="bg-[#0f172a]"
            onClick={() => onNavigate("history")}
          />
          <MenuCard
            title={t.interactive.tabScanTitle}
            desc={language === "pt" ? "Escanear via Câmera" : language === "en" ? "Scan via Camera" : "Escanear con Cámara"}
            icon={<Camera size={18} className="text-white" />}
            colorBg="bg-[#eb4547]"
            onClick={() => onNavigate("caixa")}
          />
          <MenuCard
            title={t.interactive.simDashTitle}
            desc={language === "pt" ? "Estatísticas do dia" : language === "en" ? "Daily statistics" : "Estadísticas del día"}
            icon={<ClipboardList size={18} className="text-white" />}
            colorBg="bg-[#8b5cf6]"
            onClick={() => onNavigate("agenda")}
          />
          <MenuCard
            title={t.interactive.tabExpenses}
            desc={language === "pt" ? "Registrar gastos da loja" : language === "en" ? "Record shop expenses" : "Registrar gastos de tienda"}
            icon={<TrendingDown size={18} className="text-white" />}
            colorBg="bg-[#ec4899]"
            onClick={() => onNavigate("expenses")}
          />
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-[#64748b] font-bold uppercase tracking-widest mt-auto mb-1 shrink-0">
          {language === "pt" ? "Gestão Profissional" : language === "en" ? "Professional Management" : "Gestión Profesional"}
        </div>
      </div>
    </div>
  );
}
