"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en, type Dictionary } from "./dictionaries/en";
import { es } from "./dictionaries/es";

type Language = "EN" | "ES";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "EN",
  setLang: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("EN");

  useEffect(() => {
    const saved = localStorage.getItem("dkgrfx_lang") as Language | null;
    if (saved && (saved === "EN" || saved === "ES")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("dkgrfx_lang", newLang);
  };

  const t = lang === "ES" ? es : en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
