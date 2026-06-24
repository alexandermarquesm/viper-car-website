import React, { useState } from "react";
import { ArrowLeft, Search, Calendar } from "lucide-react";
import { PhoneStatusBar } from "../PhoneMockup";
import { useLanguage } from "../../contexts/LanguageContext";

export function SimulatedHistoryScreen({
  onNavigate,
  showToast,
}: {
  onNavigate: (screen: any) => void;
  showToast: (msg: string) => void;
}) {
  const { language, t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<"services" | "clients">(
    "services",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const clientsData = [
    { name: "Lucas Oliveira", plate: "ABC1D23", phone: "51999991111" },
    { name: "Rodrigo Santos", plate: "XYZ2B34", phone: "51988882222" },
    { name: "Mariana Lima", plate: "MNO3C45", phone: "51977773333" },
    { name: "Eduardo Pereira", plate: "KJH4E56", phone: "51966664444" },
  ];

  const servicesData = [
    {
      plate: "ABC1D23",
      model: "Sandero",
      client: "Lucas",
      time: "16:22",
      phone: "51999991111",
      price: "60,00",
      payment: "Pix",
      date: "19/06/2026",
    },
    {
      plate: "XYZ9A87",
      model: "Montana",
      client: "Fernando",
      time: "15:32",
      phone: "51955555555",
      price: "35,00",
      payment: "Dinheiro",
      date: "19/06/2026",
    },
    {
      plate: "MNO3C45",
      model: "Audi A3 Sedan",
      client: "Amanda Costa",
      time: "08:00",
      phone: "51977773333",
      price: "85,00",
      payment: "Pix",
      date: "19/06/2026",
    },
    {
      plate: "KJH4E56",
      model: "Volvo XC60",
      client: "Claudio Pereira",
      time: "10:15",
      phone: "519666664444",
      price: "90,00",
      payment: "Pix",
      date: "19/06/2026",
    },
  ];

  const filteredClients = clientsData.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery),
  );

  const filteredServices = servicesData.filter(
    (s) =>
      s.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.model.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          <h2 className="text-lg font-bold tracking-wide">{t.interactive.tabHistory}</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow bg-[#f8fafc] rounded-t-[2rem] -mt-5 p-4 pt-6 flex flex-col gap-4 overflow-y-auto no-scrollbar relative z-10 shadow-[0_-10px_25px_rgba(0,0,0,0.05)] border-t border-slate-100">
        {/* Segmented Control */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => {
              setActiveSubTab("services");
              setSearchQuery("");
            }}
            className={`flex-1 py-2 text-center rounded-xl border text-xs font-bold transition-all cursor-pointer
              ${
                activeSubTab === "services"
                  ? "border-[#1a7bc2] bg-blue-50/50 text-[#1a7bc2] shadow-sm"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
          >
            {language === "pt" ? "Serviços" : language === "en" ? "Services" : "Servicios"}
          </button>
          <button
            onClick={() => {
              setActiveSubTab("clients");
              setSearchQuery("");
            }}
            className={`flex-1 py-2 text-center rounded-xl border text-xs font-bold transition-all cursor-pointer
              ${
                activeSubTab === "clients"
                  ? "border-[#1a7bc2] bg-blue-50/50 text-[#1a7bc2] shadow-sm"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
          >
            {language === "pt" ? "Clientes" : language === "en" ? "Customers" : "Clientes"}
          </button>
        </div>

        {/* Search Input */}
        <div className="relative shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeSubTab === "services"
                ? language === "pt"
                  ? "Placa, nome ou telefone..."
                  : language === "en"
                    ? "Plate, name or phone..."
                    : "Matrícula, nombre o teléfono..."
                : language === "pt"
                  ? "Nome, placa ou telefone..."
                  : language === "en"
                    ? "Name, plate or phone..."
                    : "Nombre, matrícula o teléfono..."
            }
            className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors pr-10 shadow-sm"
          />
          <Search
            size={14}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        {/* Dynamic List */}
        {activeSubTab === "services" ? (
          <div className="flex flex-col gap-3 flex-grow overflow-y-auto no-scrollbar pb-4">
            <div className="flex justify-between items-center text-xs text-slate-400 font-bold px-1 shrink-0">
              <span className="flex items-center gap-1">
                <Calendar size={12} />{" "}
                <span className="rotate-0">
                  {language === "pt" ? "Sex., 19 de Junho" : language === "en" ? "Fri, June 19" : "Vie, 19 de Junio"}
                </span>
              </span>
              <span>
                {filteredServices.length}{" "}
                {filteredServices.length === 1
                  ? language === "pt"
                    ? "carro"
                    : language === "en"
                      ? "car"
                      : "coche"
                  : language === "pt"
                    ? "carros"
                    : language === "en"
                      ? "cars"
                      : "coches"}
              </span>
            </div>

            {filteredServices.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-3 border border-slate-200/60 shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-extrabold bg-[#22c55e]/10 text-[#22c55e] px-2 py-0.5 rounded-lg uppercase tracking-wide">
                      {t.hero.tabCompleted}
                    </span>
                    <span className="text-xs font-black bg-blue-50 text-[#1a7bc2] border border-blue-100 px-2.5 py-0.5 rounded-md tracking-wider">
                      {item.plate}
                    </span>
                  </div>
                  <span className="text-xs font-black text-slate-800">
                    {language === "pt" ? "R$ " : "$ "}{language === "pt" ? item.price : item.price.replace(",", ".")}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-500 font-bold border-t border-slate-50 pt-1.5">
                  <div className="flex flex-col">
                    <span className="text-slate-700 font-extrabold">
                      {item.model}
                    </span>
                    <span className="text-slate-400">
                      {item.client} • {item.phone}
                    </span>
                  </div>
                  <div className="flex flex-col items-end text-[11px]">
                    <span className="text-slate-400">{item.time}</span>
                    <span className="text-[#10b981] font-black">
                      {item.payment === "Dinheiro" ? (language === "pt" ? "Dinheiro" : language === "en" ? "Cash" : "Efectivo") : item.payment}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2 flex-grow overflow-y-auto no-scrollbar pb-4">
            {filteredClients.map((client, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-3 border border-slate-200/60 shadow-sm flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm">
                    {client.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-extrabold text-slate-800">
                      {client.name}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {client.phone}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-lg text-slate-500 uppercase">
                  {client.plate}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
