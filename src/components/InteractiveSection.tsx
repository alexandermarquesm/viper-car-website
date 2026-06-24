import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Car,
  Plus,
  Search,
  Camera,
  BarChart3,
  TrendingDown,
  MessageCircle,
  Check,
} from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";
import { useLanguage } from "../contexts/LanguageContext";

// Modular simulator screens
import { PhoneHomeScreen } from "./simulator/PhoneHomeScreen";
import { SimulatedQueueScreen } from "./simulator/SimulatedQueueScreen";
import { SimulatedRegisterScreen } from "./simulator/SimulatedRegisterScreen";
import { SimulatedScanScreen } from "./simulator/SimulatedScanScreen";
import { SimulatedDashboardScreen } from "./simulator/SimulatedDashboardScreen";
import { SimulatedHistoryScreen } from "./simulator/SimulatedHistoryScreen";
import { SimulatedExpensesScreen } from "./simulator/SimulatedExpensesScreen";

type TabType = "patio" | "novo_cadastro" | "history" | "caixa" | "agenda" | "expenses";

export function InteractiveSection() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("patio");
  const [phoneScreen, setPhoneScreen] = useState<
    | "home"
    | "patio"
    | "caixa"
    | "caixa_camera"
    | "agenda"
    | "novo_cadastro"
    | "history"
    | "expenses"
  >("home");

  useEffect(() => {
    if (phoneScreen !== "home" && phoneScreen !== "caixa_camera") {
      setActiveTab(phoneScreen as TabType);
    }
  }, [phoneScreen]);

  const localize = (str: string) => {
    switch (str) {
      // action
      case "Aviso Enviado": return t.hero.actionSent;
      case "Na Fila": return t.hero.inQueue;
      case "Em Andamento": return t.hero.inProgressComplete;
      case "Adicionado Manual": return language === "pt" ? "Adicionado Manual" : (language === "en" ? "Manually Added" : "Agregado Manualmente");
      // actionSub
      case "WhatsApp": return t.hero.actionSub || "WhatsApp";
      case "Aguardando Vaga": return t.hero.waitingSpot;
      case "Box 2": return "Box 2";
      case "Veículo Pronto": return t.hero.carReady;
      case "Via App": return language === "pt" ? "Via App" : "Via App";
      default: return str;
    }
  };

  const [servicesList, setServicesList] = useState([
    {
      id: 1,
      model: "AUDI A3 SEDAN",
      plate: "ABC1D23",
      name: "CARLOS SILVA",
      price: "85,00",
      time: "08:00",
      order: "#1",
      status: "pending",
      action: "Aviso Enviado",
      actionSub: "WhatsApp",
    },
    {
      id: 2,
      model: "HONDA CIVIC G10",
      plate: "XYZ9A87",
      name: "MARCOS SOUSA",
      price: "60,00",
      time: "08:50",
      order: "#2",
      status: "pending",
      action: "Na Fila",
      actionSub: "Aguardando Vaga",
    },
    {
      id: 3,
      model: "BMW X5 (PRETO)",
      plate: "MNO3C45",
      name: "RODRIGO SANTOS",
      price: "120,00",
      time: "09:40",
      order: "#3",
      status: "pending",
      action: "Em Andamento",
      actionSub: "Box 2",
    },
    {
      id: 4,
      model: "VOLVO XC60",
      plate: "KJH4E56",
      name: "LUCAS OLIVEIRA",
      price: "90,00",
      time: "10:15",
      order: "#4",
      status: "pending",
      action: "Aviso Enviado",
      actionSub: "Veículo Pronto",
    },
  ]);

  const [floatingNotification, setFloatingNotification] = useState<{
    title: string;
    subtitle: string;
    type: "whatsapp" | "complete" | "info";
  } | null>(null);

  const showToast = (msg: string) => {
    let notif: {
      title: string;
      subtitle: string;
      type: "whatsapp" | "complete" | "info";
    };
    if (
      msg.includes("Notificação enviada") ||
      msg.includes("Notification sent") ||
      msg.includes("Notificación enviada")
    ) {
      const name =
        msg.match(/para (.+)!/)?.[1] ||
        msg.match(/to (.+)!/)?.[1] ||
        msg.match(/a (.+)!/)?.[1] ||
        "Cliente";
      notif = {
        title: t.interactive.simQueueAlertSent || "Aviso Enviado",
        subtitle: `WhatsApp • ${name}`,
        type: "whatsapp",
      };
    } else if (
      msg.includes("concluído") ||
      msg.includes("Concluído") ||
      msg.includes("completed") ||
      msg.includes("Completed") ||
      msg.includes("completado") ||
      msg.includes("Completado")
    ) {
      notif = {
        title: t.hero.completeTitle || "Serviço Concluído",
        subtitle:
          language === "pt"
            ? "Veículo Liberado"
            : language === "en"
              ? "Vehicle Released"
              : "Vehículo Liberado",
        type: "complete",
      };
    } else {
      notif = {
        title:
          language === "pt"
            ? "Notificação"
            : language === "en"
              ? "Notification"
              : "Notificación",
        subtitle: msg,
        type: "info",
      };
    }
    setFloatingNotification(notif);
    setTimeout(() => {
      setFloatingNotification(null);
    }, 3500);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const pendingServices = servicesList.filter((s) => s.status === "pending");
    if (pendingServices.length === 0) {
      const timer = setTimeout(() => {
        setServicesList([
          {
            id: 1,
            model: "AUDI A3 SEDAN",
            plate: "ABC1D23",
            name: "CARLOS SILVA",
            price: "85,00",
            time: "08:00",
            order: "#1",
            status: "pending",
            action: "Aviso Enviado",
            actionSub: "WhatsApp",
          },
          {
            id: 2,
            model: "HONDA CIVIC G10",
            plate: "XYZ9A87",
            name: "MARCOS SOUSA",
            price: "60,00",
            time: "08:50",
            order: "#2",
            status: "pending",
            action: "Na Fila",
            actionSub: "Aguardando Vaga",
          },
          {
            id: 3,
            model: "BMW X5 (PRETO)",
            plate: "MNO3C45",
            name: "RODRIGO SANTOS",
            price: "120,00",
            time: "09:40",
            order: "#3",
            status: "pending",
            action: "Em Andamento",
            actionSub: "Box 2",
          },
          {
            id: 4,
            model: "VOLVO XC60",
            plate: "KJH4E56",
            name: "LUCAS OLIVEIRA",
            price: "90,00",
            time: "10:15",
            order: "#4",
            status: "pending",
            action: "Aviso Enviado",
            actionSub: "Veículo Pronto",
          },
        ]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [servicesList]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setPhoneScreen(tab);
    if (isMobile) {
      const phoneElement = document.getElementById("phone-mockup-container");
      if (phoneElement) {
        phoneElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <section
      id="preview"
      className="py-32 text-text-primary overflow-x-clip relative z-10 border-t border-card-border transition-colors duration-300"
    >
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            {t.interactive.badge}
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {t.interactive.title}
          </h2>
          <p className="text-lg text-text-secondary">
            {t.interactive.subtitle}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-stretch">
          <div className="lg:col-span-5 mb-12 lg:mb-0 lg:h-full lg:flex lg:flex-col lg:justify-between space-y-4 lg:space-y-0">
            <TabButton
              active={activeTab === "patio" && phoneScreen !== "home"}
              onClick={() => handleTabClick("patio")}
              title={t.interactive.tabQueue}
              desc={t.interactive.tabQueueDesc}
              icon={<Car size={20} />}
              color="emerald"
            />
            <TabButton
              active={activeTab === "novo_cadastro" && phoneScreen !== "home"}
              onClick={() => handleTabClick("novo_cadastro")}
              title={t.interactive.tabRegister}
              desc={t.interactive.tabRegisterDesc}
              icon={<Plus size={20} />}
              color="blue"
            />
            <TabButton
              active={activeTab === "history" && phoneScreen !== "home"}
              onClick={() => handleTabClick("history")}
              title={t.interactive.tabHistory}
              desc={t.interactive.tabHistoryDesc}
              icon={<Search size={20} />}
              color="slate"
            />
            <TabButton
              active={activeTab === "caixa" && phoneScreen !== "home"}
              onClick={() => handleTabClick("caixa")}
              title={t.interactive.tabScanTitle}
              desc={t.interactive.tabScanTitleDesc}
              icon={<Camera size={20} />}
              color="pink"
            />
            <TabButton
              active={activeTab === "agenda" && phoneScreen !== "home"}
              onClick={() => handleTabClick("agenda")}
              title={t.interactive.tabDashboardTitle}
              desc={t.interactive.tabDashboardTitleDesc}
              icon={<BarChart3 size={20} />}
              color="indigo"
            />
            <TabButton
              active={activeTab === "expenses" && phoneScreen !== "home"}
              onClick={() => handleTabClick("expenses")}
              title={t.interactive.tabExpenses}
              desc={t.interactive.tabExpensesDesc}
              icon={<TrendingDown size={20} />}
              color="rose"
            />
          </div>

          <div id="phone-mockup-container" className="lg:col-span-7 flex justify-center items-center relative">
            <div className="absolute w-full h-[120%] bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 blur-[100px] -z-10 rounded-full" />
            <div className="relative">
              <PhoneMockup className="border-slate-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phoneScreen}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="h-full flex flex-col relative"
                  >
                    {phoneScreen === "home" && (
                      <PhoneHomeScreen
                        onNavigate={setPhoneScreen}
                        showToast={showToast}
                      />
                    )}
                    {phoneScreen === "patio" && (
                      <SimulatedQueueScreen
                        servicesList={servicesList}
                        setServicesList={setServicesList}
                        onNavigate={setPhoneScreen}
                        showToast={showToast}
                      />
                    )}
                    {phoneScreen === "novo_cadastro" && (
                      <SimulatedRegisterScreen
                        servicesList={servicesList}
                        setServicesList={setServicesList}
                        onNavigate={setPhoneScreen}
                        showToast={showToast}
                        setActiveTab={setActiveTab}
                      />
                    )}
                    {(phoneScreen === "caixa" ||
                      phoneScreen === "caixa_camera") && (
                      <SimulatedScanScreen
                        phoneScreen={phoneScreen}
                        setPhoneScreen={setPhoneScreen}
                        servicesList={servicesList}
                        setServicesList={setServicesList}
                        onNavigate={setPhoneScreen}
                        showToast={showToast}
                        setActiveTab={setActiveTab}
                      />
                    )}
                    {phoneScreen === "agenda" && (
                      <SimulatedDashboardScreen
                        onNavigate={setPhoneScreen}
                        showToast={showToast}
                      />
                    )}
                    {phoneScreen === "history" && (
                      <SimulatedHistoryScreen
                        onNavigate={setPhoneScreen}
                        showToast={showToast}
                      />
                    )}
                    {phoneScreen === "expenses" && (
                      <SimulatedExpensesScreen
                        onNavigate={setPhoneScreen}
                        showToast={showToast}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </PhoneMockup>

              {/* Floating notification bubble OUTSIDE the phone */}
              <AnimatePresence>
                {floatingNotification &&
                  floatingNotification.type !== "complete" && (
                    <motion.div
                      key="floating-notif-right"
                      className={`absolute z-50 bg-white border border-slate-200/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] p-3.5 rounded-2xl flex items-center gap-3 min-w-[240px] max-w-[90vw]
                        ${isMobile 
                          ? "top-0 left-1/2" 
                          : "-right-20 sm:-right-28 top-[12%]"
                        }`}
                      initial={isMobile ? { opacity: 0, y: 10, x: "-50%", scale: 0.9 } : { opacity: 0, y: 30, x: 20, scale: 0.8 }}
                      animate={isMobile ? { opacity: 1, y: -38, x: "-50%", scale: 1 } : { opacity: 1, y: 0, x: 0, scale: 1 }}
                      exit={isMobile ? { opacity: 0, y: -100, x: "-50%", scale: 0.95, transition: { duration: 1.2, ease: "easeOut" } } : { opacity: 0, scale: 0.8, y: -20, x: 10 }}
                      transition={isMobile ? { type: "spring", bounce: 0.2, duration: 0.8 } : { type: "spring", bounce: 0.6, duration: 1 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${
                          floatingNotification.type === "whatsapp"
                            ? "bg-gradient-to-br from-green-400 to-[#25D366] text-white shadow-green-500/30"
                            : "bg-gradient-to-br from-cyan-400 to-cyan-500 text-white shadow-cyan-500/30"
                        }`}
                      >
                        {floatingNotification.type === "whatsapp" && (
                          <MessageCircle size={22} className="fill-current" />
                        )}
                        {floatingNotification.type === "info" && (
                          <Check size={22} />
                        )}
                      </motion.div>
                      <div className="pr-3">
                        <p className="text-sm font-black text-slate-800 tracking-tight">
                          {floatingNotification.title}
                        </p>
                        <p className="text-[11px] text-slate-500 font-semibold tracking-wide">
                          {floatingNotification.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  )}
                {floatingNotification &&
                  floatingNotification.type === "complete" && (
                    <motion.div
                      key="floating-notif-left"
                      className={`absolute z-50 bg-white border border-slate-200/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] p-3.5 rounded-2xl flex items-center gap-3.5 min-w-[240px] max-w-[90vw]
                        ${isMobile
                          ? "top-0 left-1/2"
                          : "-left-24 sm:-left-32 bottom-[28%]"
                        }`}
                      initial={isMobile ? { opacity: 0, y: 10, x: "-50%", scale: 0.9 } : { opacity: 0, y: 30, x: -20, scale: 0.8 }}
                      animate={isMobile ? { opacity: 1, y: -38, x: "-50%", scale: 1 } : { opacity: 1, y: 0, x: 0, scale: 1 }}
                      exit={isMobile ? { opacity: 0, y: -100, x: "-50%", scale: 0.95, transition: { duration: 1.2, ease: "easeOut" } } : { opacity: 0, scale: 0.8, y: -20, x: -10 }}
                      transition={isMobile ? { type: "spring", bounce: 0.2, duration: 0.8 } : { type: "spring", bounce: 0.6, duration: 1, delay: 0.15 }}
                    >
                      <motion.div
                        animate={{ rotate: [-8, 8, -8] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-[#1875D3] flex items-center justify-center border border-blue-200 shadow-inner"
                      >
                        <Car size={24} />
                      </motion.div>
                      <div className="pr-3">
                        <p className="text-[10px] uppercase font-black text-[#1875D3] tracking-widest mb-0.5">
                          {floatingNotification.title}
                        </p>
                        <p className="text-[13px] font-bold text-slate-800 leading-tight">
                          {floatingNotification.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  title,
  desc,
  icon,
  onClick,
  color,
}: {
  active: boolean;
  title: string;
  desc: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: "cyan" | "pink" | "indigo" | "emerald" | "blue" | "slate" | "rose";
}) {
  const colorMap = {
    cyan:    { activeBg: "bg-cyan-500",    activeShadow: "shadow-cyan-500/25",    iconBg: "bg-cyan-500/15 dark:bg-cyan-500/20",    iconText: "text-cyan-600 dark:text-cyan-400",    accentBorder: "border-l-cyan-500",    tintBg: "bg-cyan-500/5"    },
    pink:    { activeBg: "bg-pink-500",    activeShadow: "shadow-pink-500/25",    iconBg: "bg-pink-500/15 dark:bg-pink-500/20",    iconText: "text-pink-600 dark:text-pink-400",    accentBorder: "border-l-pink-500",    tintBg: "bg-pink-500/5"    },
    indigo:  { activeBg: "bg-indigo-500",  activeShadow: "shadow-indigo-500/25",  iconBg: "bg-indigo-500/15 dark:bg-indigo-500/20",  iconText: "text-indigo-600 dark:text-indigo-400",  accentBorder: "border-l-indigo-500",  tintBg: "bg-indigo-500/5"  },
    emerald: { activeBg: "bg-emerald-500", activeShadow: "shadow-emerald-500/25", iconBg: "bg-emerald-500/15 dark:bg-emerald-500/20", iconText: "text-emerald-600 dark:text-emerald-400", accentBorder: "border-l-emerald-500", tintBg: "bg-emerald-500/5" },
    blue:    { activeBg: "bg-blue-500",    activeShadow: "shadow-blue-500/25",    iconBg: "bg-blue-500/15 dark:bg-blue-500/20",    iconText: "text-blue-600 dark:text-blue-400",    accentBorder: "border-l-blue-500",    tintBg: "bg-blue-500/5"    },
    slate:   { activeBg: "bg-slate-500",   activeShadow: "shadow-slate-500/20",   iconBg: "bg-slate-500/15 dark:bg-slate-500/20",   iconText: "text-slate-600 dark:text-slate-400",    accentBorder: "border-l-slate-500",   tintBg: "bg-slate-500/5"   },
    rose:    { activeBg: "bg-rose-500",    activeShadow: "shadow-rose-500/25",    iconBg: "bg-rose-500/15 dark:bg-rose-500/20",    iconText: "text-rose-600 dark:text-rose-400",    accentBorder: "border-l-rose-500",    tintBg: "bg-rose-500/5"    },
  };
  const c = colorMap[color];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden relative group border-l-[3px] ${
        active
          ? `bg-card-bg border border-card-border ${c.accentBorder} shadow-lg backdrop-blur-xl ${c.tintBg}`
          : `bg-transparent border border-transparent border-l-transparent hover:bg-card-bg/60 hover:border-card-border/60`
      }`}
    >
      {/* Subtle glow on active */}
      {active && (
        <div className={`absolute top-0 right-0 w-32 h-full ${c.activeBg}/10 blur-2xl rounded-full pointer-events-none`} />
      )}

      <div className="flex items-start gap-4 py-5 px-4 relative z-10">
        {/* Icon */}
        <div
          className={`p-3 rounded-xl flex-shrink-0 transition-all duration-300 ${
            active
              ? `${c.activeBg} text-white shadow-lg ${c.activeShadow}`
              : `${c.iconBg} ${c.iconText} group-hover:scale-105`
          }`}
        >
          {icon}
        </div>

        <div className="pt-0.5 flex-1 min-w-0">
          <h3
            className={`text-base font-bold mb-1 tracking-tight transition-colors duration-300 ${
              active ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
            }`}
          >
            {title}
          </h3>
          <p className={`text-xs leading-relaxed transition-colors duration-300 ${
            active ? "text-text-secondary" : "text-text-muted"
          }`}>
            {desc}
          </p>
        </div>
      </div>
    </button>
  );
}
