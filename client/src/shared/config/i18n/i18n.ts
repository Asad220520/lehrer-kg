import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  // --- АНГЛИЙСКИЙ (English) ---
  en: {
    translation: {
      // Страница входа (Home)
      welcome: "Welcome back to Lehrer KG",
      guest: "Continue as Guest",
      login_google: "Sign in with Google",
      or: "or",
      // Сайдбар (Sidebar)
      sidebar: {
        dashboard: "Dashboard",
        users: "Users",
        quizzes: "Quizzes",
        settings: "Settings",
        logout: "Logout",
      },

      // Страница пользователей (Users Page)
      users_page: {
        title: "Users",
        loading: "Loading users...",
        table: {
          user: "User",
          email: "Email",
          role: "Role",
          date: "Joined Date",
          actions: "Actions",
        },
      },

      // Личный кабинет ученика (User Dashboard)
      user_dashboard: {
        hello: "Hello, {{name}}!",
        subtitle: "This is your personal dashboard.",
        my_results: "My Results",
        empty_results: "No results yet...",
        available_tests: "Available Tests",
        coming_soon: "Tests will appear here soon.",
      },

      // Общие (General)
      common: {
        error: "Something went wrong",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
      },
    },
  },

  // --- РУССКИЙ (Russian) ---
  ru: {
    translation: {
      // Страница входа
      welcome: "Добро пожаловать в Lehrer KG",
      guest: "Войти как Гость",
      login_google: "Войти через Google",
      or: "или",

      // Сайдбар
      sidebar: {
        dashboard: "Главная",
        users: "Пользователи",
        quizzes: "Тесты",
        settings: "Настройки",
        logout: "Выход",
      },

      // Страница пользователей
      users_page: {
        title: "Пользователи",
        loading: "Загрузка списка...",
        table: {
          user: "Пользователь",
          email: "Email",
          role: "Роль",
          date: "Дата регистрации",
          actions: "Действия",
        },
      },

      // Личный кабинет ученика
      user_dashboard: {
        hello: "Привет, {{name}}!",
        subtitle: "Это твой личный кабинет.",
        my_results: "Мои результаты",
        empty_results: "Пока пусто...",
        available_tests: "Доступные тесты",
        coming_soon: "Скоро здесь появятся тесты.",
      },

      // Общие
      common: {
        error: "Что-то пошло не так",
        save: "Сохранить",
        cancel: "Отмена",
        delete: "Удалить",
      },
    },
  },
};

i18n
  .use(LanguageDetector) // Авто-определение языка (браузер -> localStorage)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru", // Если язык не определился — будет русский
    interpolation: {
      escapeValue: false, // React сам экранирует XSS
    },
  });

export default i18n;
