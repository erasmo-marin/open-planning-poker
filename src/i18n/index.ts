import i18n from "i18next";
import en from "./en/translations.json";
import es from "./es/translations.json";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const withDefaultNamespace = (translation: object) => ({ translation });

const init = async () => {
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: withDefaultNamespace(en),
        es: withDefaultNamespace(es),
      },
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
      debug: true,
    });
  console.log(i18n.resolvedLanguage, i18n.t("Copied!"));
};

init();
