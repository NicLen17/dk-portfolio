"use client";

import { useState, useEffect } from "react";

export function LanguageToggle() {
  const [lang, setLang] = useState<"EN" | "ES">("EN");

  useEffect(() => {
    const saved = localStorage.getItem("dkgrfx_lang") as "EN" | "ES" | null;
    if (saved) setLang(saved);
  }, []);

  const toggleLang = (selected: "EN" | "ES") => {
    setLang(selected);
    localStorage.setItem("dkgrfx_lang", selected);
  };

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1 text-[11px] font-mono tracking-widest">
      <button
        onClick={() => toggleLang("EN")}
        className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
          lang === "EN" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-neutral-600">|</span>
      <button
        onClick={() => toggleLang("ES")}
        className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
          lang === "ES" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}
