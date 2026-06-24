import React, { useState, useEffect } from "react";
import { ArrowLeft, Clock, Search } from "lucide-react";
import { PhoneStatusBar } from "../PhoneMockup";
import { useLanguage } from "../../contexts/LanguageContext";

export function SimulatedRegisterScreen({
  servicesList,
  setServicesList,
  onNavigate,
  showToast,
  setActiveTab,
}: {
  servicesList: any[];
  setServicesList: React.Dispatch<React.SetStateAction<any[]>>;
  onNavigate: (screen: any) => void;
  showToast: (msg: string) => void;
  setActiveTab: React.Dispatch<React.SetStateAction<any>>;
}) {
  const { language, t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<"service" | "client">(
    "service",
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [plate, setPlate] = useState("");
  const [car, setCar] = useState("");
  const [price, setPrice] = useState("50,00");
  const [time, setTime] = useState("05:54");

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientPlate, setClientPlate] = useState("");
  const [clientCar, setClientCar] = useState("");

  useEffect(() => {
    const now = new Date();
    const hrs = now.getHours().toString().padStart(2, "0");
    const mins = now.getMinutes().toString().padStart(2, "0");
    setTime(`${hrs}:${mins}`);
  }, []);

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !car || !plate) {
      showToast(
        language === "pt"
          ? "Preencha os campos obrigatórios!"
          : language === "en"
            ? "Please fill in required fields!"
            : "¡Complete los campos obligatorios!"
      );
      return;
    }

    const newService = {
      id: Date.now(),
      model: car.toUpperCase(),
      plate: plate.toUpperCase(),
      name: name.toUpperCase(),
      price: price || "50,00",
      time: time || "10:00",
      order: `#${servicesList.length + 1}`,
      status: "pending",
      action: "Adicionado Manual",
      actionSub: "Via App",
    };

    setServicesList((prev) => [newService, ...prev]);
    showToast(t.interactive.simRegSuccess);
    onNavigate("patio");
    setActiveTab("patio");
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      showToast(
        language === "pt"
          ? "Preencha os campos obrigatórios!"
          : language === "en"
            ? "Please fill in required fields!"
            : "¡Complete los campos obligatorios!"
      );
      return;
    }
    showToast(t.interactive.simRegSuccess);
    onNavigate("history");
  };

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
            {activeSubTab === "service"
              ? language === "pt"
                ? "Novo Serviço"
                : language === "en"
                  ? "New Service"
                  : "Nuevo Servicio"
              : language === "pt"
                ? "Novo Cliente"
                : language === "en"
                  ? "New Customer"
                  : "Nuevo Cliente"}
          </h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow bg-[#f8fafc] rounded-t-[2rem] -mt-5 p-4 pt-6 flex flex-col gap-4 overflow-y-auto no-scrollbar relative z-10 shadow-[0_-10px_25px_rgba(0,0,0,0.05)] border-t border-slate-100">
        {/* Segmented Control */}
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveSubTab("service")}
            className={`flex-1 py-2 text-center rounded-xl border text-xs font-bold transition-all cursor-pointer
              ${
                activeSubTab === "service"
                  ? "border-[#1a7bc2] bg-blue-50/50 text-[#1a7bc2] shadow-sm"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
          >
            {language === "pt" ? "Serviço" : language === "en" ? "Service" : "Servicio"}
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("client")}
            className={`flex-1 py-2 text-center rounded-xl border text-xs font-bold transition-all cursor-pointer
              ${
                activeSubTab === "client"
                  ? "border-[#1a7bc2] bg-blue-50/50 text-[#1a7bc2] shadow-sm"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
          >
            {language === "pt" ? "Cliente" : language === "en" ? "Customer" : "Cliente"}
          </button>
        </div>

        {activeSubTab === "service" ? (
          <form
            onSubmit={handleServiceSubmit}
            className="flex flex-col gap-3 flex-grow pb-4 text-xs font-bold text-slate-700"
          >
            {/* Nome do Cliente */}
            <div className="flex flex-col">
              <label className="mb-1">{t.interactive.simRegClientName}</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.interactive.simRegPlaceholderClient}
                  className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors pr-10"
                />
              </div>
            </div>

            {/* Telefone */}
            <div className="flex flex-col">
              <label className="mb-1">
                {language === "pt" ? "Telefone" : language === "en" ? "Phone" : "Teléfono"}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.interactive.simRegPlaceholderPhone}
                className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            {/* Carro & Placa */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className="mb-1">
                  {language === "pt" ? "Carro" : language === "en" ? "Car" : "Coche"}
                </label>
                <input
                  type="text"
                  value={car}
                  onChange={(e) => setCar(e.target.value)}
                  placeholder={t.interactive.simRegPlaceholderModel}
                  className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1">{t.interactive.simRegPlate}</label>
                <input
                  type="text"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  placeholder={t.interactive.simRegPlaceholderPlate}
                  className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
            </div>

            {/* Preço & Entrega */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className="mb-1">
                  {language === "pt" ? "Preço" : language === "en" ? "Price" : "Precio"}
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="50,00"
                  className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1">
                  {language === "pt" ? "Entrega" : language === "en" ? "Delivery" : "Entrega"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="05:54"
                    className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors pr-10"
                  />
                  <Clock
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-3 py-3.5 bg-[#1a7bc2] hover:bg-blue-600 text-white font-bold rounded-2xl text-xs tracking-wider transition-all shadow-md shadow-blue-500/10 active:scale-[0.98] cursor-pointer text-center border border-transparent"
            >
              {language === "pt" ? "Cadastrar Serviço" : language === "en" ? "Register Service" : "Registrar Servicio"}
            </button>

            {/* Footnote */}
            <div className="text-center text-[10px] text-slate-500 font-semibold italic mt-2">
              {language === "pt" ? "Lavou, tá novo! 🚗✨" : language === "en" ? "Washed and clean! 🚗✨" : "¡Lavado y limpio! 🚗✨"}
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleClientSubmit}
            className="flex flex-col gap-3 flex-grow pb-4 text-xs font-bold text-slate-700"
          >
            {/* Nome do Cliente */}
            <div className="flex flex-col">
              <label className="mb-1">{t.interactive.simRegClientName}</label>
              <div className="relative">
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={t.interactive.simRegPlaceholderClient}
                  className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors pr-10"
                />
                <Search
                  size={16}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            {/* Telefone */}
            <div className="flex flex-col">
              <label className="mb-1">
                {language === "pt" ? "Telefone" : language === "en" ? "Phone" : "Teléfono"}
              </label>
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder={t.interactive.simRegPlaceholderPhone}
                className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            {/* Placa & Carro (Opcionais) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className="mb-1">
                  {language === "pt" ? "Placa (Opcional)" : language === "en" ? "Plate (Optional)" : "Matrícula (Opcional)"}
                </label>
                <input
                  type="text"
                  value={clientPlate}
                  onChange={(e) => setClientPlate(e.target.value)}
                  placeholder={t.interactive.simRegPlaceholderPlate}
                  className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1">
                  {language === "pt" ? "Carro (Opcional)" : language === "en" ? "Car (Optional)" : "Coche (Opcional)"}
                </label>
                <input
                  type="text"
                  value={clientCar}
                  onChange={(e) => setClientCar(e.target.value)}
                  placeholder={t.interactive.simRegPlaceholderModel}
                  className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3.5 bg-[#1a7bc2] hover:bg-blue-600 text-white font-bold rounded-2xl text-xs tracking-wider transition-all shadow-md shadow-blue-500/10 active:scale-[0.98] cursor-pointer text-center border border-transparent"
            >
              {language === "pt" ? "Cadastrar Cliente" : language === "en" ? "Register Customer" : "Registrar Cliente"}
            </button>

            {/* Footnote */}
            <div className="text-center text-[10px] text-slate-500 font-semibold italic mt-2">
              {language === "pt" ? "Lavou, tá novo! 🚗✨" : language === "en" ? "Washed and clean! 🚗✨" : "¡Lavado y limpio! 🚗✨"}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
