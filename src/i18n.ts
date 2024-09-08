import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enTranslation from "./locales/en/translation.json";
import plTranslation from "./locales/pl/translation.json";

// Initialize i18next
i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: enTranslation },
      pl: { translation: plTranslation },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if the current language does not have a translation
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
