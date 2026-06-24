import React, { useState } from "react";
import { motion } from "motion/react";
import { Camera, ArrowLeft } from "lucide-react";
import { PhoneStatusBar } from "../PhoneMockup";
import { useLanguage } from "../../contexts/LanguageContext";

interface SimulatedScanScreenProps {
  onNavigate: (screen: any) => void;
  phoneScreen: string;
  setPhoneScreen: React.Dispatch<React.SetStateAction<any>>;
  servicesList: any[];
  setServicesList: React.Dispatch<React.SetStateAction<any[]>>;
  showToast: (msg: string) => void;
  setActiveTab: React.Dispatch<React.SetStateAction<any>>;
}

export function SimulatedScanScreen({
  onNavigate,
  phoneScreen,
  setPhoneScreen,
  servicesList,
  setServicesList,
  showToast,
  setActiveTab,
}: SimulatedScanScreenProps) {
  const { language, t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);

  const handleCapture = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const newService = {
        id: Date.now(),
        model: "TESLA MODEL S",
        plate: "TSL1A23",
        name: "GABRIEL RAMOS",
        price: "150,00",
        time: "11:00",
        order: `#${servicesList.length + 1}`,
        status: "pending",
        action: "Escaneado via IA",
        actionSub: "Tabela Processada",
      };
      setServicesList((prev) => [newService, ...prev]);
      showToast(t.interactive.simScanSuccess);
      setPhoneScreen("patio");
      setActiveTab("patio");
    }, 1800);
  };

  if (phoneScreen === "caixa_camera") {
    return (
      <div className="flex flex-col h-full w-full bg-[#000] overflow-hidden text-white rounded-b-[2.25rem] relative text-left">
        <PhoneStatusBar dark={false} />

        {/* Overlay Camera Header */}
        <div className="absolute top-8 left-4 z-20">
          <button
            onClick={() => setPhoneScreen("caixa")}
            className="p-1.5 bg-black/40 rounded-full hover:bg-black/60 cursor-pointer border border-transparent"
            aria-label="Voltar"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Viewfinder Area */}
        <div className="flex-grow flex items-center justify-center p-6 relative bg-[#0F172A] mt-14 mb-16 select-none pointer-events-none">
          <div className="w-full aspect-[4/3] border-2 border-white/20 rounded-2xl relative overflow-hidden flex items-center justify-center bg-slate-900/50">
            {/* Camera corners */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></div>

            {/* Laser scan line */}
            <motion.div
              animate={{ y: [-40, 100, -40] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[2px] bg-[#10b981] shadow-[0_0_8px_#10b981]"
            />

            {/* Paper Sheet Preview */}
            <div className="w-[85%] h-[75%] border border-dashed border-white/10 rounded bg-white/5 p-3 flex flex-col gap-1.5 justify-center opacity-40 scale-95">
              <div className="h-2 w-16 bg-white/40 rounded"></div>
              <div className="h-1 w-full bg-white/20 rounded"></div>
              <div className="h-1 w-[90%] bg-white/20 rounded"></div>
              <div className="h-1.5 w-12 bg-white/30 rounded mt-1"></div>
            </div>

            {isScanning && (
              <div className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-4">
                <div className="w-7 h-7 border-3 border-[#3B82F6] border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest">
                  {language === "pt" ? "Processando Folha..." : language === "en" ? "Processing Sheet..." : "Procesando Hoja..."}
                </p>
                <p className="text-[11px] text-[#94A3B8] mt-1">
                  {language === "pt"
                    ? "Convertendo imagem física em serviços digitais..."
                    : language === "en"
                      ? "Converting physical image into digital services..."
                      : "Convertiendo imagen física en servicios digitales..."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Button Area */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-black/80 flex items-center justify-center px-6 border-t border-white/5">
          <button
            onClick={handleCapture}
            disabled={isScanning}
            className="w-full py-3 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-slate-700 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-colors shadow-lg shadow-blue-500/20 active:scale-95 cursor-pointer border border-transparent"
          >
            📸 {t.interactive.simScanBtn}
          </button>
        </div>
      </div>
    );
  }

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
          <h2 className="text-lg font-bold tracking-wide">{t.interactive.tabScanTitle}</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#f8fafc] rounded-t-[2rem] -mt-5 p-5 flex flex-col items-center pt-6 gap-6 pb-8 overflow-y-auto no-scrollbar relative z-10 shadow-[0_-10px_25px_rgba(0,0,0,0.05)] border-t border-slate-100">
        <div className="text-center shrink-0">
          <h2 className="text-base font-extrabold text-slate-800 mb-2 leading-tight">
            {language === "pt" ? "De onde vem a tabela?" : language === "en" ? "Where is the sheet from?" : "¿De dónde viene la hoja?"}
          </h2>
          <p className="text-slate-500 text-xs leading-relaxed px-4">
            {language === "pt"
              ? "Escolha uma opção para enviar a folha de serviços antiga para a IA converter."
              : language === "en"
                ? "Choose an option to send the old service sheet for AI conversion."
                : "Elija una opción para enviar la hoja de servicios antigua para la conversión de IA."}
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 px-1 shrink-0">
          <button
            onClick={() => setPhoneScreen("caixa_camera")}
            className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-md shadow-slate-200/50 border border-slate-200/60 hover:scale-[1.02] active:scale-95 transition-transform group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Camera size={22} className="text-[#1a7bc2]" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">
              {language === "pt" ? "Câmera" : language === "en" ? "Camera" : "Cámara"}
            </h3>
            <p className="text-slate-500 text-xs">
              {language === "pt" ? "Tirar uma foto física na hora." : language === "en" ? "Take a physical photo on the spot." : "Tomar una foto física al instante."}
            </p>
          </button>

          <button
            onClick={() => {
              showToast(
                language === "pt"
                  ? "Buscando imagem na galeria..."
                  : language === "en"
                    ? "Searching image in gallery..."
                    : "Buscando imagen en la galería..."
              );
              setTimeout(() => {
                handleCapture();
              }, 1000);
            }}
            className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-md shadow-slate-200/50 border border-slate-200/60 hover:scale-[1.02] active:scale-95 transition-transform group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#eb4547]"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">
              {language === "pt" ? "Galeria" : language === "en" ? "Gallery" : "Galería"}
            </h3>
            <p className="text-slate-500 text-xs">
              {language === "pt" ? "Selecionar um arquivo salvo." : language === "en" ? "Select a saved file." : "Seleccionar un archivo guardado."}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
