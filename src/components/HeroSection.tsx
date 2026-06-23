import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Smartphone,
  ArrowLeft,
  Car,
  User,
  MessageCircle,
  Clock,
  Check,
} from "lucide-react";
import { PhoneMockup, PhoneStatusBar } from "./PhoneMockup";
import { useLanguage } from "../contexts/LanguageContext";

const MOCK_SERVICES = [
  {
    model: "AUDI A3 SEDAN",
    plate: "ABC1D23",
    name: "CARLOS SILVA",
    price: "85,00",
    time: "08:00",
    order: "#1",
    action: "Aviso Enviado",
    actionSub: "WhatsApp",
    icon: MessageCircle,
    iconColor: "from-green-400 to-[#25D366]",
    iconBg: "shadow-green-500/30",
    completeTitle: "Serviço Concluído",
    completeSub: "Lavagem Completa",
  },
  {
    model: "HONDA CIVIC G10",
    plate: "XYZ9A87",
    name: "MARCOS SOUSA",
    price: "60,00",
    time: "08:50",
    order: "#2",
    action: "Na Fila",
    actionSub: "Aguardando Vaga",
    icon: Clock,
    iconColor: "from-amber-400 to-amber-500",
    iconBg: "shadow-amber-500/30",
    completeTitle: "Aguardando",
    completeSub: "Lavagem Simples",
  },
  {
    model: "BMW X5 (PRETO)",
    plate: "MNO3C45",
    name: "RODRIGO SANTOS",
    price: "120,00",
    time: "09:40",
    order: "#3",
    action: "Em Progresso",
    actionSub: "Box 2",
    icon: Car,
    iconColor: "from-blue-400 to-blue-500",
    iconBg: "shadow-blue-500/30",
    completeTitle: "Em Andamento",
    completeSub: "Polimento",
  },
  {
    model: "VOLVO XC60",
    plate: "KJH4E56",
    name: "LUCAS OLIVEIRA",
    price: "90,00",
    time: "10:15",
    order: "#4",
    action: "Aviso Enviado",
    actionSub: "Veículo Pronto",
    icon: MessageCircle,
    iconColor: "from-green-400 to-[#25D366]",
    iconBg: "shadow-green-500/30",
    completeTitle: "Serviço Concluído",
    completeSub: "Higienização",
  },
];

export function HeroSection({ onSignUp }: { onSignUp: () => void }) {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_SERVICES.length);
    }, 7000); // 7 seconds interval for calm scrolling
    return () => clearInterval(timer);
  }, []);

  const activeService = MOCK_SERVICES[currentIndex];
  const activeIcon = activeService.icon;

  const localize = (str: string) => {
    switch (str) {
      // action
      case "Aviso Enviado": return t.hero.actionSent;
      case "Na Fila": return t.hero.inQueue;
      case "Em Progresso": return t.hero.inProgress;
      // actionSub
      case "WhatsApp": return t.hero.actionSub || "WhatsApp";
      case "Aguardando Vaga": return t.hero.waitingSpot;
      case "Box 2": return "Box 2";
      case "Veículo Pronto": return t.hero.carReady;
      // completeTitle
      case "Serviço Concluído": return t.hero.completeTitle;
      case "Aguardando": return t.hero.waiting;
      case "Em Andamento": return t.hero.inProgressComplete;
      // completeSub
      case "Lavagem Completa": return t.hero.completeWash;
      case "Lavagem Simples": return t.hero.simpleWash;
      case "Polimento": return t.hero.polishing;
      case "Higienização": return t.hero.sanitization;
      default: return str;
    }
  };

  return (
    <section className="relative overflow-hidden z-10 pt-12 pb-24 lg:pt-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-16 lg:mb-0 max-w-2xl perspective-[1000px]">
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6"
              >
                <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
                {t.hero.badge}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
              >
                {t.hero.title1} <br /> {t.hero.title2}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  {t.hero.title3}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl text-text-secondary mb-8 leading-relaxed max-w-xl"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 items-center"
              >
                <button
                  onClick={onSignUp}
                  className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/30 cursor-pointer active:scale-95 duration-200 text-center animate-none"
                >
                  {t.hero.cta} <ArrowRight size={18} />
                </button>
                <a
                  href="https://github.com/alexandermarquesm/vip-car-website/releases/download/v2.0.6/viper-car-2.0.6.apk"
                  download
                  className="w-full sm:w-auto bg-card-bg hover:bg-slate-200 dark:hover:bg-slate-900 border border-card-border hover:border-cyan-500/50 text-text-primary px-8 py-2.5 rounded-full text-base font-medium flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 group cursor-pointer active:scale-95"
                >
                  <Smartphone
                    size={22}
                    className="text-cyan-400 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="flex flex-col items-start text-left leading-tight">
                    <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">
                      {t.hero.platform}
                    </span>
                    <span className="text-sm font-bold flex items-center gap-1.5">
                      {t.hero.download}{" "}
                      <span className="text-[10px] font-normal text-text-muted bg-card-bg border border-card-border px-1.5 py-0.5 rounded group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                        v2.0.6
                      </span>
                    </span>
                  </div>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-10 flex items-center gap-4 text-sm text-text-secondary"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-slate-800 border-2 border-bg overflow-hidden"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=1e293b`}
                        alt="User"
                      />
                    </div>
                  ))}
                </div>
                <p>
                  {t.hero.social}{" "}
                  <strong className="text-text-primary">{t.hero.socialBold}</strong>
                </p>
              </motion.div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[340px] lg:max-w-none lg:w-[400px] select-none pointer-events-none">
            {/* Decorative background blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-400/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex justify-center pb-10">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
                className="relative"
              >
                <div className="gpu-layer relative animate-float-phone">
                  <PhoneMockup className="border-slate-900 ring-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                    <HeroAppAnimation currentIndex={currentIndex} />
                  </PhoneMockup>

                  {/* Floating Element 1: Dynamic notification */}
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={"action-" + activeService.plate}
                      className="absolute -right-20 sm:-right-28 top-[16%] bg-white border border-slate-200/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] p-3.5 rounded-2xl flex items-center gap-3 z-50 min-w-[200px]"
                      initial={{ opacity: 0, y: 30, x: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20, x: 10 }}
                      transition={{ type: "spring", bounce: 0.6, duration: 1 }}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${activeService.iconColor} text-white flex items-center justify-center shadow-lg ${activeService.iconBg} animate-pulse-scale`}
                      >
                        {React.createElement(activeIcon, {
                          size: 22,
                          className: "fill-current",
                        })}
                      </div>
                      <div className="pr-3">
                        <p className="text-sm font-black text-slate-800 tracking-tight">
                          {localize(activeService.action)}
                        </p>
                        <p className="text-[11px] text-slate-500 font-semibold tracking-wide">
                          {localize(activeService.actionSub)}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Floating Element 2: Completed Service */}
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={"complete-" + activeService.plate}
                      className="absolute -left-24 sm:-left-32 bottom-[28%] bg-white border border-slate-200/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] p-3.5 rounded-2xl flex items-center gap-3.5 z-50 min-w-[200px]"
                      initial={{ opacity: 0, y: 30, x: -20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20, x: -10 }}
                      transition={{
                        type: "spring",
                        bounce: 0.6,
                        duration: 1,
                        delay: 0.15,
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-[#1875D3] flex items-center justify-center border border-blue-200 shadow-inner animate-wiggle-rotate-delayed"
                      >
                        <Car size={24} />
                      </div>
                      <div className="pr-3">
                        <p className="text-[10px] uppercase font-black text-[#1875D3] tracking-widest mb-0.5">
                          {localize(activeService.completeTitle)}
                        </p>
                        <p className="text-[13px] font-bold text-slate-800 leading-tight">
                          {localize(activeService.completeSub)}
                        </p>
                        <p className="text-[11px] font-medium text-slate-500">
                          {t.hero.value}: {language === "pt" ? "R$ " : "$ "}{language === "pt" ? activeService.price : activeService.price.replace(",", ".")}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroAppAnimation({ currentIndex }: { currentIndex: number }) {
  const { language, t } = useLanguage();
  const l = MOCK_SERVICES.length;
  const visibleItems = [
    MOCK_SERVICES[currentIndex % l],
    MOCK_SERVICES[(currentIndex - 1 + l) % l],
    MOCK_SERVICES[(currentIndex - 2 + l) % l],
    MOCK_SERVICES[(currentIndex - 3 + l) % l],
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#1a7bc2] overflow-hidden text-slate-800 relative select-none">
      <PhoneStatusBar dark={false} />
      {/* Header Blue */}
      <div className="bg-[#1a7bc2] pt-8 pb-6 px-5 relative z-0 shrink-0">
        <div className="flex items-center gap-4 text-white">
          <ArrowLeft size={20} />
          <h2 className="text-lg font-bold tracking-wide">{t.hero.queueTitle}</h2>
        </div>
      </div>

      {/* Main Content Area - overlaps header */}
      <div className="flex-grow bg-[#f4f5f7] rounded-t-3xl rounded-b-[2.25rem] -mt-5 p-4 overflow-hidden relative z-10 flex flex-col gap-4 w-full">
        {/* Tabs */}
        <div className="flex gap-2 mb-1 px-1 justify-center z-20 relative">
          <div className="w-[140px] py-1.5 text-center rounded-lg border border-blue-200 bg-blue-50/20 shadow-sm flex items-center justify-center">
            <span className="text-[#1875D3] font-bold text-xs tracking-wide">
              {t.hero.tabPending}
            </span>
          </div>
          <div className="w-[140px] py-1.5 text-center rounded-lg border border-slate-200 bg-white shadow-sm flex items-center justify-center">
            <span className="text-slate-500 font-medium text-xs tracking-wide">
              {t.hero.tabCompleted}
            </span>
          </div>
        </div>

        {/* List Items Container with Mask for smooth fade at bottom */}
        <div
          className="relative flex-1 -mx-4 px-4 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 80%, transparent 100%)",
          }}
        >
          <div className="flex flex-col gap-4 relative w-full pt-1">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleItems.map((item, i) => {
                const isActive = i === 0;
                return (
                  <motion.div
                    key={item.plate}
                    layout="position"
                    initial={{ opacity: 0, y: -40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: isActive ? 1.02 : 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.9 }}
                    transition={{ duration: 1.2, type: "spring", bounce: 0.2 }}
                    className={`bg-white rounded-[1.25rem] p-4 shadow-[0_2px_15px_rgba(0,0,0,0.06)] border relative z-10 flex flex-col gap-4 transition-colors origin-top
                    ${isActive ? "border-blue-300 ring-2 ring-blue-500/10 shadow-lg" : "border-slate-100"} 
                    ${i > 2 ? "opacity-40 blur-[1px]" : ""}`}
                    style={{ zIndex: 10 - i }}
                  >
                    {/* Top Row: Car, Plate, Order */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Car
                          size={16}
                          className={
                            isActive ? "text-blue-500" : "text-[#1875D3]"
                          }
                        />
                        <span className="font-extrabold text-slate-900 text-[13px] tracking-tight">
                          {item.model}
                        </span>
                        <span
                          className={`${isActive ? "bg-blue-100 border-blue-200" : "bg-blue-50 border-blue-100"} text-[#1875D3] text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider border flex-shrink-0`}
                        >
                          {item.plate}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded flex-shrink-0">
                        {item.order}
                      </span>
                    </div>

                    {/* Middle Row: User, WhatsApp Button */}
                    <div className="flex justify-between items-center pl-1">
                      <div className="flex items-center gap-2">
                        <div className="text-slate-400">
                          <User size={14} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                          {item.name}
                        </span>
                      </div>
                      <button
                        className={`${isActive ? "bg-[#25D366] text-white hover:bg-green-500 shadow-md shadow-green-500/20" : "border border-[#25D366]/40 text-[#25D366] bg-transparent hover:bg-[#25D366]/5"} flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors`}
                      >
                        <MessageCircle
                          size={12}
                          className={isActive ? "fill-current" : ""}
                        />
                        <span className="text-[10px] font-bold">{t.hero.btnNotify}</span>
                      </button>
                    </div>

                    {/* Bottom Row: Time, Price, Check Button */}
                    <div className="flex justify-between items-center mt-1 pl-1">
                      <div className="flex items-center gap-1 bg-green-50/80 text-green-600 px-2 py-0.5 rounded-full border border-green-100">
                        <Clock size={12} />
                        <span className="text-[11px] font-bold">
                          {item.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className="text-xl font-black text-slate-900 tracking-[-0.02em] whitespace-nowrap">
                          {language === "pt" ? "R$ " : "$ "}{language === "pt" ? item.price : item.price.replace(",", ".")}
                        </span>
                        <button
                          className={`w-10 h-10 aspect-square flex-shrink-0 ${isActive ? "bg-[#22c55e] hover:bg-[#16a34a] shadow-[0_4px_12px_rgba(34,197,94,0.35)]" : "bg-slate-200 hover:bg-slate-300"} rounded-full flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95`}
                        >
                          <Check
                            size={20}
                            strokeWidth={3}
                            className={isActive ? "" : "text-slate-400"}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
