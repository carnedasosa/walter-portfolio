"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "it" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: any) => string;
  tArr: (key: any) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("it");

  const t = (obj: any) => {
    if (!obj) return "";
    return obj[lang] || obj["it"] || "";
  };

  const tArr = (obj: any) => {
    if (!obj) return [];
    return obj[lang] || obj["it"] || [];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tArr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
