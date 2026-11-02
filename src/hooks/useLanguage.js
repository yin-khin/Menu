import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import km from "../locales/km";
import en from "../locales/en";

const LOCALES = { km, en };
export const LANGUAGES = ["km", "en"];
const STORAGE_KEY = "pailin-language";

const readStoredLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(saved) ? saved : "km";
  } catch {
    return "km";
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable: ignore */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  /** Picks the current-language value from a { km, en } object. */
  const pick = useCallback(
    (obj) => (obj ? (obj[lang] ?? obj.en ?? "") : ""),
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, t: LOCALES[lang], pick }),
    [lang, pick],
  );

  return createElement(LanguageContext.Provider, { value }, children);
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
