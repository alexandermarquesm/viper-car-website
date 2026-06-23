import React, { createContext, useContext, useState, useEffect } from "react";
import { pt } from "../locales/pt";
import { en } from "../locales/en";
import { es } from "../locales/es";

export type Language = "pt" | "en" | "es";

const translations = { pt, en, es };

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof pt;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vipercar_lang");
      if (saved === "pt" || saved === "en" || saved === "es") {
        return saved;
      }
      // Detect browser language if no preference is stored
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "es") return "es";
      if (browserLang === "en") return "en";
    }
    return "pt"; // Default to Portuguese
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("vipercar_lang", lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
