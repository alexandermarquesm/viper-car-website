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
  ChevronRight,
  Calendar,
  ArrowLeft,
  FileText,
  ClipboardList,
  User,
  Clock,
} from "lucide-react";
import { PhoneMockup, PhoneStatusBar } from "./PhoneMockup";
import { useLanguage } from "../contexts/LanguageContext";

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

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setPhoneScreen(tab);
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

          <div className="lg:col-span-7 flex justify-center items-center relative">
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
                      className="absolute -right-20 sm:-right-28 top-[12%] bg-white border border-slate-200/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] p-3.5 rounded-2xl flex items-center gap-3 z-50 min-w-[200px]"
                      initial={{ opacity: 0, y: 30, x: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20, x: 10 }}
                      transition={{ type: "spring", bounce: 0.6, duration: 1 }}
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
    slate:   { activeBg: "bg-slate-500",   activeShadow: "shadow-slate-500/20",   iconBg: "bg-slate-500/15 dark:bg-slate-500/20",   iconText: "text-slate-600 dark:text-slate-400",   accentBorder: "border-l-slate-500",   tintBg: "bg-slate-500/5"   },
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

function MenuCard({
  title,
  desc,
  icon,
  colorBg,
  onClick,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  colorBg: string;
  onClick: () => void;
}) {
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

function PhoneHomeScreen({
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

function SimulatedRegisterScreen({
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

function SimulatedHistoryScreen({
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

function SimulatedExpensesScreen({
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
          >
            <ChevronRight size={16} className="rotate-180" />
          </button>
          <span className="font-extrabold text-slate-800 uppercase tracking-wider">
            {getMonthName()}
          </span>
          <button
            onClick={() => setMonthOffset((p) => p + 1)}
            className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 border border-transparent"
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
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}

function SimulatedQueueScreen({
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
                          className={`w-10 h-10 aspect-square flex-shrink-0 ${isFirst ? "bg-[#22c55e] hover:bg-[#16a34a] shadow-[0_4px_12px_rgba(34,197,94,0.35)]" : "bg-slate-200 hover:bg-slate-300"} rounded-full flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95 cursor-pointer`}
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

  function SimulatedScanScreen({
  onNavigate,
  phoneScreen,
  setPhoneScreen,
  servicesList,
  setServicesList,
  showToast,
  setActiveTab,
}: {
  onNavigate: (screen: any) => void;
  phoneScreen: string;
  setPhoneScreen: React.Dispatch<React.SetStateAction<any>>;
  servicesList: any[];
  setServicesList: React.Dispatch<React.SetStateAction<any[]>>;
  showToast: (msg: string) => void;
  setActiveTab: React.Dispatch<React.SetStateAction<any>>;
}) {
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

function SimulatedDashboardScreen({
  onNavigate,
  showToast,
}: {
  onNavigate: (screen: any) => void;
  showToast: (msg: string) => void;
}) {
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
