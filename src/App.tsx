/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Menu, X, LogOut, Sun, Moon, Globe, Check } from "lucide-react";
import { useLanguage } from "./contexts/LanguageContext";

// Subcomponents
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { InteractiveSection } from "./components/InteractiveSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { PricingSection } from "./components/PricingSection";
import { BottomCTA } from "./components/BottomCTA";
import { Footer } from "./components/Footer";
const LoginModal = React.lazy(() => import("./components/LoginModal").then(m => ({ default: m.LoginModal })));
const ProfileModal = React.lazy(() => import("./components/ProfileModal").then(m => ({ default: m.ProfileModal })));

const LANGUAGES = [
  { code: "pt" as const, label: "Português", flag: "🇧🇷" },
  { code: "en" as const, label: "English",   flag: "🇺🇸" },
  { code: "es" as const, label: "Español",   flag: "🇪🇸" },
];

export default function App() {
  const { scrollYProgress } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginModalMode, setLoginModalMode] = useState<"login" | "register">("login");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vipercar_theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark"; // Default to dark theme
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("vipercar_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("vipercar_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("vipercar_user");
      }
    }
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const logout = () => {
    localStorage.removeItem("vipercar_token");
    localStorage.removeItem("vipercar_user");
    setUser(null);
  };

  const handleSignUp = () => {
    if (user) {
      window.open("https://viper-car-app.vercel.app", "_blank");
    } else {
      setLoginModalMode("register");
      setIsLoginOpen(true);
    }
  };

  const apiUrl =
    import.meta.env.VITE_API_URL || "https://viper-car-api.vercel.app";

  const handleSubscribe = async (plan: "basic" | "pro") => {
    if (!user) {
      setLoginModalMode("login");
      setIsLoginOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem("vipercar_token");
      const response = await fetch(`${apiUrl}/subscriptions/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Falha ao iniciar checkout.");
      }

      if (data.url) {
        if (data.url.startsWith("https://checkout.stripe.com/")) {
          window.open(data.url, "_blank");
        } else {
          throw new Error("URL de pagamento inválida ou não segura.");
        }
      }
    } catch (err: any) {
      alert(err.message || "Erro ao conectar com o gateway de pagamento.");
    }
  };

  const handleManageSubscription = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem("vipercar_token");
      const response = await fetch(`${apiUrl}/subscriptions/portal`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "Falha ao carregar portal de gerenciamento.",
        );
      }

      if (data.url) {
        if (data.url.startsWith("https://billing.stripe.com/")) {
          window.open(data.url, "_blank");
        } else {
          throw new Error("URL do portal de cobrança inválida ou não segura.");
        }
      }
    } catch (err: any) {
      alert(err.message || "Erro ao conectar com o portal de gerenciamento.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-white bg-bg text-text-primary relative transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Ambient Mesh Gradients */}
      <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] bg-glow-indigo rounded-full blur-[120px] pointer-events-none z-0 animate-glow-1"></div>
      <div className="fixed top-[20%] right-[10%] w-[300px] h-[300px] bg-glow-purple rounded-full blur-[100px] pointer-events-none z-0 animate-glow-2"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-glow-cyan rounded-full blur-[120px] pointer-events-none z-0 animate-glow-3"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        isMenuOpen
          ? "bg-bg border-nav-border"
          : "bg-nav-bg backdrop-blur-md border-nav-border"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img
                src="/full_logo.png"
                alt="Viper Car Logo"
                width={140}
                height={36}
                className="h-8 sm:h-9 w-auto object-contain dark:invert-0 invert"
              />
            </div>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a
                href="#features"
                className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors tracking-wide"
              >
                {t.nav.features}
              </a>
              <a
                href="#preview"
                className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors tracking-wide"
              >
                {t.nav.preview}
              </a>
              <a
                href="#pricing"
                className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors tracking-wide"
              >
                {t.nav.pricing}
              </a>

              {/* Theme Switcher Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-card-bg hover:bg-slate-200 dark:hover:bg-white/10 text-text-secondary hover:text-text-primary transition-all border border-card-border cursor-pointer flex items-center justify-center shrink-0"
                title={theme === "dark" ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
                aria-label={theme === "dark" ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
              >
                {theme === "dark" ? (
                  <Sun size={18} className="text-amber-400" />
                ) : (
                  <Moon size={18} className="text-indigo-600" />
                )}
              </button>

              {/* Language Selector Dropdown */}
              <div className="relative shrink-0" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen((v) => !v)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border cursor-pointer text-xs font-bold ${
                    isLangOpen
                      ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
                      : "bg-card-bg border-card-border text-text-secondary hover:bg-slate-200 dark:hover:bg-white/10 hover:text-text-primary"
                  }`}
                  aria-label="Select language"
                >
                  <Globe size={13} />
                  <span className="text-base leading-none">
                    {LANGUAGES.find((l) => l.code === language)?.flag}
                  </span>
                  <span className="uppercase tracking-wide">{language}</span>
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-44 rounded-2xl bg-modal-bg border border-modal-border shadow-2xl z-[100] p-1.5 flex flex-col gap-0.5 origin-top-right"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer w-full group ${
                            language === lang.code
                              ? "bg-cyan-500/10 text-cyan-400"
                              : "text-text-secondary hover:bg-slate-100 dark:hover:bg-white/5 hover:text-text-primary"
                          }`}
                        >
                          <span className="text-xl leading-none w-6 text-center">{lang.flag}</span>
                          <span className="flex-1">{lang.label}</span>
                          {language === lang.code && (
                            <Check size={14} className="text-cyan-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {user ? (
                <div className="flex items-center gap-4 shrink-0">
                  <button
                    onClick={() => setIsProfileOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-card-bg rounded-full border border-card-border hover:border-card-hover-border hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-text-primary">
                      {user.name.split(" ")[0]}
                    </span>
                  </button>
                  <button
                    onClick={logout}
                    className="p-2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    title={t.profile.btnLogout}
                    aria-label={t.profile.btnLogout}
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4 shrink-0">
                  <button
                    onClick={() => {
                      setLoginModalMode("login");
                      setIsLoginOpen(true);
                    }}
                    className="px-6 py-2.5 bg-card-bg/60 backdrop-blur-md border border-card-border rounded-full hover:bg-card-bg transition-all text-sm font-medium text-text-primary shadow-xl cursor-pointer"
                  >
                    {t.nav.login}
                  </button>
                  <button
                    onClick={() => {
                      setLoginModalMode("register");
                      setIsLoginOpen(true);
                    }}
                    className="bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-cyan-500/30 text-center cursor-pointer"
                  >
                    {t.nav.signUp}
                  </button>
                </div>
              )}
            </div>

            <button
              className="md:hidden text-text-secondary hover:text-text-primary cursor-pointer animate-none"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsMobileLangOpen(false);
              }}
              aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-x-0 bottom-0 top-16 md:hidden bg-bg border-b border-nav-border overflow-y-auto no-scrollbar transition-colors duration-300 z-40"
            >
              <div className="px-4 pt-4 pb-12 flex flex-col gap-4">
                <a
                  href="#features"
                  className="text-base font-semibold text-text-primary px-4 py-2 rounded-lg hover:bg-card-bg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.nav.features}
                </a>
                <a
                  href="#preview"
                  className="text-base font-semibold text-text-primary px-4 py-2 rounded-lg hover:bg-card-bg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.nav.preview}
                </a>
                <a
                  href="#pricing"
                  className="text-base font-semibold text-text-primary px-4 py-2 rounded-lg hover:bg-card-bg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.nav.pricing}
                </a>
                <div className="h-px bg-card-border my-2"></div>

                {/* Mobile Theme Switcher */}
                <div className="flex justify-between items-center px-4 py-2">
                  <span className="text-sm font-semibold text-text-secondary">{t.nav.theme}</span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-4 py-2 bg-card-bg rounded-full border border-card-border hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer text-text-primary"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun size={16} className="text-amber-400" />
                        <span className="text-xs font-semibold">Light</span>
                      </>
                    ) : (
                      <>
                        <Moon size={16} className="text-indigo-600" />
                        <span className="text-xs font-semibold">Dark</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Mobile Language Switcher */}
                <div className="flex flex-col gap-1 px-4 py-2">
                  <span className="text-sm font-semibold text-text-secondary mb-1">{t.nav.lang}</span>
                  <button
                    type="button"
                    onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                    className="flex items-center justify-between w-full px-4 py-2.5 bg-card-bg border border-card-border rounded-xl font-semibold text-sm text-text-primary cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{LANGUAGES.find((l) => l.code === language)?.flag}</span>
                      <span>{LANGUAGES.find((l) => l.code === language)?.label}</span>
                    </div>
                    <Globe size={16} className={`text-text-muted transition-transform duration-300 ${isMobileLangOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isMobileLangOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-1 mt-1 pl-2 border-l border-card-border"
                      >
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setIsMobileLangOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold transition-all cursor-pointer text-sm ${
                              language === lang.code
                                ? "bg-cyan-500/10 text-cyan-400"
                                : "text-text-secondary hover:text-text-primary"
                            }`}
                          >
                            <span className="text-lg">{lang.flag}</span>
                            <span className="flex-1 text-left">{lang.label}</span>
                            {language === lang.code && <Check size={14} className="text-cyan-400" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="h-px bg-card-border my-2"></div>

                {user ? (
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => {
                        setIsProfileOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 bg-card-bg rounded-xl border border-card-border"
                    >
                      <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-sm font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-text-primary">
                          {user.name}
                        </span>
                        <span className="text-[10px] text-text-muted uppercase tracking-widest">
                          {user.tenant?.name || "Viper Car"}
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-center py-3 bg-red-500/10 border border-red-500/20 rounded-xl font-bold text-red-400 cursor-pointer"
                    >
                      {t.profile.btnLogout}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                     <button
                      onClick={() => {
                        setLoginModalMode("login");
                        setIsLoginOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-center py-3 bg-card-bg border border-card-border rounded-xl font-bold text-text-primary cursor-pointer"
                    >
                      {t.nav.login}
                    </button>
                    <button
                      onClick={() => {
                        setLoginModalMode("register");
                        setIsLoginOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-center py-3 bg-cyan-500 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/20 cursor-pointer"
                    >
                      {t.nav.signUp}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-16">
        <HeroSection onSignUp={handleSignUp} />
        <FeaturesSection />
        <InteractiveSection />
        <BenefitsSection />
        <PricingSection
          user={user}
          onSubscribe={handleSubscribe}
          onManageSubscription={handleManageSubscription}
        />
        <BottomCTA onSignUp={handleSignUp} />
      </main>

      <Footer />

      <React.Suspense fallback={null}>
        <AnimatePresence>
          {isLoginOpen && (
            <LoginModal
              initialMode={loginModalMode}
              onClose={() => setIsLoginOpen(false)}
              onLoginSuccess={(userData) => {
                setUser(userData);
                setIsLoginOpen(false);
              }}
            />
          )}
          {isProfileOpen && user && (
            <ProfileModal
              user={user}
              onClose={() => setIsProfileOpen(false)}
              onLogout={() => {
                logout();
                setIsProfileOpen(false);
              }}
              onManageSubscription={handleManageSubscription}
              onSubscribe={handleSubscribe}
            />
          )}
        </AnimatePresence>
      </React.Suspense>
    </div>
  );
}
