import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      sidebar: {
        dashboard: "Dashboard",
        users: "Users",
        quizzes: "Quizzes",
        settings: "Settings",
        logout: "Logout",
      },
    },
  },
  ru: {
    translation: {
      sidebar: {
        dashboard: "Главная",
        users: "Пользователи",
        quizzes: "Тесты",
        settings: "Настройки",
        logout: "Выход",
      },
    },
  },
};

i18n
  .use(LanguageDetector) // Авто-определение языка браузера
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru", // Язык по умолчанию
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
