import React, { useState } from "react";
import { ArrowLeft, FileText, ChevronRight, Car } from "lucide-react";
import { PhoneStatusBar } from "../PhoneMockup";
import { useLanguage } from "../../contexts/LanguageContext";

interface SimulatedDashboardScreenProps {
  onNavigate: (screen: any) => void;
  showToast: (msg: string) => void;
}

export function SimulatedDashboardScreen({
  onNavigate,
  showToast,
}: SimulatedDashboardScreenProps) {
  const { language, t } = useLanguage();
  const [viewMode, setViewMode] = useState<"daily" | "monthly">("monthly");
  const [dayOffset, setDayOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);

  const getDayName = () => {
    const days = language === "pt" ? [
      "Sex., 19 De Junho",
      "Sáb., 20 De Junho",
      "Dom., 21 De Junho",
      "Seg., 22 De Junho",
    ] : (language === "en" ? [
      "Fri, June 19",
      "Sat, June 20",
      "Sun, June 21",
      "Mon, June 22",
    ] : [
      "Vie, 19 de Junio",
      "Sáb, 20 de Junio",
      "Dom, 21 de Junio",
      "Lun, 22 de Junio",
    ]);
    const idx = (0 + dayOffset) % days.length;
    return days[idx >= 0 ? idx : idx + days.length];
  };

  const getMonthName = () => {
    const months = language === "pt" ? [
      "Junho de 2026", "Julho de 2026", "Agosto de 2026"
    ] : (language === "en" ? [
      "June 2026", "July 2026", "August 2026"
    ] : [
      "Junio de 2026", "Julio de 2026", "Agosto de 2026"
    ]);
    const idx = (0 + monthOffset) % months.length;
    return months[idx >= 0 ? idx : idx + months.length];
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#1a7bc2] overflow-hidden text-slate-800 rounded-b-[2.25rem] relative select-none text-left">
      <PhoneStatusBar dark={false} />

      {/* Header Blue */}
      <div className="bg-[#1a7bc2] pt-8 pb-6 px-5 shrink-0 relative z-10">
        <div className="flex items-center gap-4 text-white">
          <button
            onClick={() => onNavigate("home")}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer border border-transparent"
            aria-label="Voltar para o início"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-bold tracking-wide">{t.interactive.simDashTitle}</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow bg-[#f8fafc] rounded-t-[2rem] -mt-5 p-4 overflow-y-auto no-scrollbar relative z-10 pt-6 pb-8 space-y-4 shadow-[0_-10px_25px_rgba(0,0,0,0.05)] border-t border-slate-100">
        {/* Toggle Mode */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex gap-1 bg-slate-100 border border-slate-200/60 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("daily")}
              className={`px-4 py-1 text-center rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer border border-transparent
                ${viewMode === "daily" ? "bg-white text-[#1a7bc2] shadow-sm" : "text-slate-500"}`}
            >
              {language === "pt" ? "Diário" : language === "en" ? "Daily" : "Diario"}
            </button>
            <button
              onClick={() => setViewMode("monthly")}
              className={`px-4 py-1 text-center rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer border border-transparent
                ${viewMode === "monthly" ? "bg-white text-[#1a7bc2] shadow-sm" : "text-slate-500"}`}
            >
              {language === "pt" ? "Mensal" : language === "en" ? "Monthly" : "Mensal"}
            </button>
          </div>
          <button
            onClick={() => showToast(language === "pt" ? "PDF gerado com sucesso!" : language === "en" ? "PDF generated successfully!" : "¡PDF generado con éxito!")}
            className="w-8 h-8 bg-white border border-slate-200/60 rounded-xl flex items-center justify-center shadow-sm text-slate-600 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            aria-label="Exportar PDF de estatísticas"
          >
            <FileText size={16} />
          </button>
        </div>

        {/* Date Selector */}
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-slate-200/60 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              if (viewMode === "daily") setDayOffset((p) => p - 1);
              else setMonthOffset((p) => p - 1);
            }}
            className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 border border-transparent"
            aria-label="Período anterior"
          >
            <ChevronRight size={16} className="rotate-180" />
          </button>
          <span className="font-bold text-slate-800">
            {viewMode === "daily" ? getDayName() : getMonthName()}
          </span>
          <button
            onClick={() => {
              if (viewMode === "daily") setDayOffset((p) => p + 1);
              else setMonthOffset((p) => p + 1);
            }}
            className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 border border-transparent"
            aria-label="Próximo período"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Main Stats Card */}
        <div className="bg-[#1a7bc2] rounded-2xl p-4 text-white shadow-md relative overflow-hidden shrink-0">
          <p className="text-blue-100 font-bold text-[11px] tracking-wider mb-0.5 uppercase opacity-90">
            {language === "pt" ? "Faturamento Líquido" : language === "en" ? "Net Revenue" : "Facturación Neta"}
          </p>
          <h2 className="text-2xl font-black tracking-tight mb-2 flex items-baseline gap-0.5">
            <span className="text-base font-bold">{language === "pt" ? "R$" : "$"}</span>{" "}
            {viewMode === "daily"
              ? language === "pt"
                ? "285,00"
                : "285.00"
              : language === "pt"
                ? "8.650,57"
                : "8,650.57"}
          </h2>

          <div className="bg-[#16639c] rounded-lg px-2 py-1 inline-block text-blue-100 text-xs font-semibold mb-3">
            {viewMode === "daily"
              ? language === "pt"
                ? "5 serviços"
                : language === "en"
                  ? "5 services"
                  : "5 servicios"
              : `-${language === "pt" ? "R$ " : "$ "}${language === "pt" ? "29,43 (Taxas de Cartão)" : language === "en" ? "29.43 (Card Fees)" : "29,43 (Comisiones de Tarjeta)"}`}
          </div>

          <div className="flex gap-2 text-xs font-semibold">
            <div className="bg-[#4aa0dc] rounded-full px-2.5 py-1 flex items-center gap-1">
              <Car size={10} />{" "}
              {viewMode === "daily"
                ? language === "pt"
                  ? "Bruto: R$ 285,00"
                  : "Gross: $ 285.00"
                : language === "pt"
                  ? "127 serviços"
                  : language === "en"
                    ? "127 services"
                    : "127 servicios"}
            </div>
            {viewMode === "monthly" && (
              <div className="bg-[#4aa0dc] rounded-full px-2.5 py-1">
                {language === "pt" ? "Bruto: R$ 8.680,00" : language === "en" ? "Gross: $ 8,680.00" : "Bruto: $ 8.680,00"}
              </div>
            )}
          </div>
        </div>

        {/* Saídas & Lucro Real section */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="bg-white rounded-2xl p-3 border border-slate-200/60 shadow-sm flex flex-col">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1">
              {language === "pt" ? "Saídas" : language === "en" ? "Outflow" : "Salidas"}
            </span>
            <span className="text-sm font-black text-rose-500">
              - {language === "pt" ? "R$ " : "$ "}{viewMode === "daily" ? (language === "pt" ? "1.002,57" : "1,002.57") : (language === "pt" ? "3.217,86" : "3,217.86")}
            </span>
            {viewMode === "daily" && (
              <span className="text-[10px] text-slate-400 font-bold mt-1">
                {language === "pt" ? "352% do Fat." : language === "en" ? "352% of Rev." : "352% de Fact."}
              </span>
            )}
          </div>
          <div className="bg-white rounded-2xl p-3 border border-slate-200/60 shadow-sm flex flex-col">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1">
              {language === "pt" ? "Lucro Real" : language === "en" ? "Net Profit" : "Ganancia Real"}
            </span>
            <span
              className={`text-sm font-black ${viewMode === "daily" ? "text-rose-500" : "text-emerald-500"}`}
            >
              {viewMode === "daily"
                ? `- ${language === "pt" ? "R$ " : "$ "}${language === "pt" ? "717,57" : "717.57"}`
                : `${language === "pt" ? "R$ " : "$ "}${language === "pt" ? "5.432,71" : "5,432.71"}`}
            </span>
            <span className="text-[10px] text-slate-400 font-bold mt-1">
              {language === "pt" ? "Margem: " : language === "en" ? "Margin: " : "Margen: "}{viewMode === "daily" ? "-252%" : "63%"}
            </span>
          </div>
        </div>

        {/* Indicadores de Performance */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60">
          <h3 className="font-bold text-slate-800 text-xs mb-3 uppercase tracking-wider">
            {language === "pt" ? "Indicadores de Performance" : language === "en" ? "Performance Indicators" : "Indicadores de Rendimiento"}
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-700">
                  {language === "pt" ? "Ticket Médio Líquido" : language === "en" ? "Average Net Ticket" : "Ticket Promedio Neto"}
                </span>
                <span className="text-[11px] text-slate-400">
                  {language === "pt" ? "Lucro líquido real por lavagem" : language === "en" ? "Real net profit per wash" : "Ganancia neta real por lavado"}
                </span>
              </div>
              <span
                className={`text-xs font-black ${viewMode === "daily" ? "text-rose-500" : "text-emerald-500"}`}
              >
                {viewMode === "daily"
                  ? `- ${language === "pt" ? "R$ " : "$ "}${language === "pt" ? "143,51" : "143.51"}`
                  : `${language === "pt" ? "R$ " : "$ "}${language === "pt" ? "25,34" : "25.34"}`}
              </span>
            </div>

            <div className="flex justify-between items-start border-t border-slate-50 pt-2.5">
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-700">
                  {language === "pt" ? "Custo por Serviço" : language === "en" ? "Cost per Service" : "Costo por Servicio"}
                </span>
                <span className="text-[11px] text-slate-400">
                  {language === "pt" ? "Operação rateada por veículo" : language === "en" ? "Operation split per vehicle" : "Operación prorrateada por vehículo"}
                </span>
              </div>
              <span className="text-xs font-black text-slate-800">
                {language === "pt" ? "R$ " : "$ "}{viewMode === "daily" ? (language === "pt" ? "200,51" : "200.51") : (language === "pt" ? "42,78" : "42.78")}
              </span>
            </div>

            <div className="flex justify-between items-start border-t border-slate-50 pt-2.5">
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-700">
                  {language === "pt" ? "Ponto de Equilíbrio" : language === "en" ? "Break-even Point" : "Punto de Equilibrio"}
                </span>
                <span className="text-[11px] text-slate-400">
                  {language === "pt" ? "Lavagens necessárias para cobrir custos" : language === "en" ? "Washes needed to cover costs" : "Lavados necesarios para cubrir costos"}
                </span>
              </div>
              <span className="text-xs font-black text-slate-800">
                {viewMode === "daily"
                  ? language === "pt"
                    ? "18 lavagens"
                    : language === "en"
                      ? "18 washes"
                      : "18 lavados"
                  : language === "pt"
                    ? "80 lavagens"
                    : language === "en"
                      ? "80 washes"
                      : "80 lavados"}
              </span>
            </div>
          </div>
        </div>

        {/* Formas de Pagamento */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60">
          <h3 className="font-bold text-slate-800 text-xs mb-2.5 uppercase tracking-wider">
            {language === "pt" ? "Formas de Pagamento" : language === "en" ? "Payment Methods" : "Formas de Pago"}
          </h3>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full flex gap-0.5 overflow-hidden mb-4 bg-slate-100">
            <div
              className="h-full bg-[#10b981]"
              style={{ width: viewMode === "daily" ? "46%" : "68%" }}
            ></div>
            <div
              className="h-full bg-[#22c55e]"
              style={{ width: viewMode === "daily" ? "54%" : "19%" }}
            ></div>
            <div
              className="h-full bg-[#d97706]"
              style={{ width: viewMode === "daily" ? "0%" : "13%" }}
            ></div>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-600">
                <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                <span>Pix</span>
              </div>
              <span className="font-bold text-slate-800">
                {viewMode === "daily"
                  ? language === "pt"
                    ? "R$ 130,00 (46%)"
                    : "$ 130.00 (46%)"
                  : language === "pt"
                    ? "R$ 5.910,00 (68%)"
                    : "$ 5,910.00 (68%)"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-600">
                <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
                <span>{language === "pt" ? "Dinheiro" : language === "en" ? "Cash" : "Efectivo"}</span>
              </div>
              <span className="font-bold text-slate-800">
                {viewMode === "daily"
                  ? language === "pt"
                    ? "R$ 155,00 (54%)"
                    : "$ 155.00 (54%)"
                  : language === "pt"
                    ? "R$ 1.660,00 (19%)"
                    : "$ 1,660.00 (19%)"}
              </span>
            </div>
            {viewMode === "monthly" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-[#d97706]"></div>
                  <span>{language === "pt" ? "Cartão" : language === "en" ? "Card" : "Tarjeta"}</span>
                </div>
                <span className="font-bold text-slate-800">
                  {language === "pt" ? "R$ 1.110,00 (13%)" : "$ 1,110.00 (13%)"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bento footer (Melhor Dia do Mês) */}
        {viewMode === "monthly" && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 text-center shrink-0">
            <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider block mb-1">
              {language === "pt" ? "Melhor Dia do Mês" : language === "en" ? "Best Day of Month" : "Mejor Día del Mes"}
            </span>
            <span className="text-sm font-black text-emerald-500">
              {language === "pt"
                ? "Dia 16 com R$ 946,29"
                : language === "en"
                  ? "Day 16 with $ 946.29"
                  : "Día 16 con $ 946,29"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
