"use client";

import { LangKey } from "@/types/lang.type";
import { translations, TranslationsKey } from "@/lib/translations";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type LanguageContextType = {
  lang: LangKey;
  setLang: (lang: LangKey) => void;
  t: (key: TranslationsKey) => string;
  toggleLang: () => void;
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  lang: "ge", // Default language
  setLang: () => {},
  t: (key: TranslationsKey) => key, // Returns the key if translation is not found
  toggleLang: () => {},
});

// Language Provider Component
export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [lang, setLangState] = useState<LangKey>("ge");
  const [loading, setLoading] = useState(true);

  // Update language in router and localStorage
  const setLang = useCallback((newLang: LangKey) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLang);
    }
  }, []);

  const toggleLang = useCallback(() => {
    const availableLangs: LangKey[] = ["ge", "en"];
    const nextLangIndex = (availableLangs.indexOf(lang) + 1) % availableLangs.length;
    setLang(availableLangs[nextLangIndex]);
  }, [lang, setLang]);

  // Translation function
  const t = useCallback(
    (key: TranslationsKey) => translations[key]?.[lang] || translations[key]?.["ge"] || key,
    [lang]
  );

  useEffect(() => {
    const storedLang =
      typeof window !== "undefined" ? (localStorage.getItem("language") as LangKey) : null;
    if (storedLang) {
      setLangState(storedLang);
    }
    setLoading(false);
  }, []);

  const contextValue = useMemo(
    () => ({ lang, setLang, t, toggleLang }),
    [lang, setLang, t, toggleLang]
  );

  if (loading) return null;

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

// Custom hook for using language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
