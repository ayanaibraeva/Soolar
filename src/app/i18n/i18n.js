import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ruTranslations from "../../locales/ru.json";
import enTranslations from "../../locales/en.json";

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        lng: "ru",
        fallbackLng: "ru",
        resources: {
            ru: {
                translation: ruTranslations,
            },
            en: {
                translation: enTranslations,
            },
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;