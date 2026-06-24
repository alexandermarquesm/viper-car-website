import React, { useState } from "react";
import { ArrowLeft, ChevronRight, Plus } from "lucide-react";
import { PhoneStatusBar } from "../PhoneMockup";
import { useLanguage } from "../../contexts/LanguageContext";

export function SimulatedExpensesScreen({
  onNavigate,
  showToast,
}: {
  onNavigate: (screen: any) => void;
  showToast: (msg: string) => void;
}) {
  const { language, t } = useLanguage();
  const [monthOffset, setMonthOffset] = useState(0);

  const [expenses, setExpenses] = useState([
    {
      desc: language === "pt" ? "Diaria, combustivel,.." : (language === "en" ? "Daily wage, fuel,.." : "Diario, combustible,.."),
      category: language === "pt" ? "Diversos / Outros" : (language === "en" ? "Miscellaneous / Others" : "Varios / Otros"),
      date: "19/06",
      val: "1.002,57",
    },
    {
      desc: language === "pt" ? "Café, diaria, combust..." : (language === "en" ? "Coffee, daily wage, fuel..." : "Café, diario, combustible..."),
      category: language === "pt" ? "Diversos / Outros" : (language === "en" ? "Miscellaneous / Others" : "Varios / Otros"),
      date: "18/06",
      val: "282,42",
    },
    {
      desc: language === "pt" ? "Café, diaria, comissao" : (language === "en" ? "Coffee, daily wage, commission" : "Café, diario, comisión"),
      category: language === "pt" ? "Diversos / Outros" : (language === "en" ? "Miscellaneous / Others" : "Varios / Otros"),
      date: "17/06",
      val: "142,17",
    },
  ]);

  const getMonthName = () => {
    const ptMonths = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const enMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const esMonths = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const baseMonthIdx = 5; // Junho
    const offsetIdx = (baseMonthIdx + monthOffset) % 12;
    const monthStr = language === "pt" ? ptMonths[offsetIdx] : (language === "en" ? enMonths[offsetIdx] : esMonths[offsetIdx]);
    return language === "pt" ? `${monthStr} de 2026` : (language === "en" ? `${monthStr} 2026` : `${monthStr} de 2026`);
  };

  const handleAddExpense = () => {
    const randomDescs = language === "pt" ? [
      "Diária de Lavador",
      "Compra de Shampoo Automotivo",
      "Manutenção de Lavadora VAP",
      "Aluguel do Espaço",
      "Lanche equipe",
    ] : (language === "en" ? [
      "Washer Daily Wage",
      "Car Shampoo Purchase",
      "Pressure Washer Repair",
      "Space Rental",
      "Team Snacks",
    ] : [
      "Diario de Lavador",
      "Compra de Champú Automotriz",
      "Mantenimiento de Hidrolavadora",
      "Alquiler de Espacio",
      "Merienda del Equipo",
    ]);

    const randomVals = ["120,00", "75,50", "220,00", "1.500,00", "45,00"];
    const randomDesc =
      randomDescs[Math.floor(Math.random() * randomDescs.length)];
    const randomVal = randomVals[Math.floor(Math.random() * randomVals.length)];

    const newExp = {
      desc: randomDesc,
      category: language === "pt" ? "Diversos / Outros" : (language === "en" ? "Miscellaneous / Others" : "Varios / Otros"),
      date: "19/06",
      val: randomVal,
    };

    setExpenses((prev) => [newExp, ...prev]);
    showToast(language === "pt" ? "Despesa cadastrada com sucesso!" : language === "en" ? "Expense registered successfully!" : "¡Gasto registrado con éxito!");
  };

  const totalValue = expenses.reduce((acc, curr) => {
    const valFloat = parseFloat(curr.val.replace(".", "").replace(",", "."));
    return acc + valFloat;
  }, 0);

  const formattedTotal = totalValue.toLocaleString(language === "pt" ? "pt-BR" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col h-full w-full bg-[#1a7bc2] overflow-hidden text-slate-800 rounded-b-[2.25rem] relative select-none text-left">
      <PhoneStatusBar dark={false} />

      {/* Header */}
      <div className="bg-[#1a7bc2] pt-8 pb-6 px-5 shrink-0 relative z-10">
        <div className="flex items-center gap-4 text-white">
          <button
            onClick={() => onNavigate("home")}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer border border-transparent"
            aria-label="Voltar para o início"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-bold tracking-wide">
            {t.interactive.tabExpenses}
          </h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow bg-[#f8fafc] rounded-t-[2rem] -mt-5 p-4 pt-6 flex flex-col gap-4 overflow-y-auto no-scrollbar relative z-10 shadow-[0_-10px_25px_rgba(0,0,0,0.05)] border-t border-slate-100 pb-16">
        {/* Month Selector */}
        <div className="bg-white rounded-2xl p-2 px-4 shadow-sm border border-slate-200/60 flex items-center justify-between text-xs shrink-0">
          <button
            onClick={() => setMonthOffset((p) => p - 1)}
            className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 border border-transparent"
            aria-label="Mês anterior"
          >
            <ChevronRight size={16} className="rotate-180" />
          </button>
          <span className="font-extrabold text-slate-800 uppercase tracking-wider">
            {getMonthName()}
          </span>
          <button
            onClick={() => setMonthOffset((p) => p + 1)}
            className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 border border-transparent"
            aria-label="Próximo mês"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Total Cost Box */}
        <div className="bg-[#fff1f2] border border-[#fecdd3] rounded-2xl p-4 shadow-sm shrink-0">
          <span className="text-[#e11d48] text-[11px] font-black uppercase tracking-widest block mb-1">
            {language === "pt" ? "Total de Custos do Mês" : language === "en" ? "Total Monthly Costs" : "Costos Totales del Mes"}
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
            {language === "pt" ? "R$ " : "$ "}{formattedTotal}
          </h2>

          <div className="w-full bg-[#ffe4e6] h-1.5 rounded-full overflow-hidden mb-1 mt-3">
            <div
              className="h-full bg-[#f43f5e] rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
          <span className="text-xs text-slate-500 font-bold block">
            {language === "pt" ? "Diversos / Outros" : language === "en" ? "Miscellaneous / Others" : "Varios / Otros"} {language === "pt" ? "R$ " : "$ "}{formattedTotal} (100%)
          </span>
        </div>

        {/* Section Title */}
        <div className="flex justify-between items-center text-xs text-slate-400 font-bold px-1 mt-1 shrink-0">
          <span className="uppercase tracking-wider">
            {language === "pt" ? "Fluxo de Saídas" : language === "en" ? "Cash Outflows" : "Flujo de Salidas"}
          </span>
          <span>
            {expenses.length}{" "}
            {expenses.length === 1
              ? language === "pt"
                ? "registrada"
                : language === "en"
                  ? "logged"
                  : "registrada"
              : language === "pt"
                ? "registradas"
                : language === "en"
                  ? "logged"
                  : "registradas"}
          </span>
        </div>

        {/* Outflows List */}
        <div className="flex flex-col gap-2.5 flex-grow overflow-y-auto no-scrollbar pb-2">
          {expenses.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-3 border border-slate-200/60 shadow-sm flex items-center justify-between"
            >
              <div className="flex flex-col gap-1.5 min-w-0">
                <span className="text-[11px] font-black text-[#e11d48] bg-rose-50 border border-rose-100 rounded-md px-1.5 py-0.5 w-fit uppercase">
                  {exp.category}
                </span>
                <div className="text-xs font-extrabold text-slate-800 truncate pr-2 leading-tight">
                  {exp.desc}
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0 text-right">
                <span className="text-xs font-black text-[#e11d48]">
                  -{language === "pt" ? "R$ " : "$ "}{language === "pt" ? exp.val : exp.val.replace(",", ".")}
                </span>
                <span className="text-[11px] text-slate-400 font-bold mt-0.5">
                  {exp.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <button
          onClick={handleAddExpense}
          className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#ec4899] hover:bg-pink-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer z-20 border border-transparent"
          aria-label="Adicionar despesa"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
