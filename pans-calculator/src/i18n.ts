// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(LanguageDetector) // auto‐detect language
  .use(Backend) // load translations via HTTP
  .use(initReactI18next) // hook into React
  .init({
    lng: "he",
    fallbackLng: "he",
    supportedLngs: ["he", "en", "es", "ar-IL", "pt-BR"],
    debug: process.env.NODE_ENV === "development",

    backend: {
      // where to find your JSON files (in public/)
      loadPath: "/locales/{{lng}}/translation.json",
    },

    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
