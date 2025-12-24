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
      user_nav: {
        home: "Home",
        tests: "All Tests",
        history: "My History",
        profile: "Profile",
        leaderboard: "Leaderboard",
      },
      footer: {
        rights: "All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
      profile: {
        title: "My Profile",
        personal_info: "Personal Information",
        email: "Email Address",
        role: "Account Role",
        joined: "Joined Date",
        student: "Student",
        admin: "Administrator",
        guest_title: "Guest Account",
        guest_desc:
          "Please register to save your progress and access your profile.",
        stats: {
          title: "Quick Stats",
          tests_passed: "Tests Passed",
          avg_score: "Average Score",
        },
      },
      dashboard: {
        quick_start: "Quick Start",
        popular_folders: "Popular Collections",
        my_folders: "My Folders",
        create_folder: "Create Folder",
        private: "Private",
        public: "Public",
        games_count: "{{count}} games",
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
      user_nav: {
        home: "Главная",
        tests: "Все тесты",
        history: "История",
        profile: "Профиль",
        leaderboard: "Рейтинг",
      },
      footer: {
        rights: "Все права защищены.",
        privacy: "Политика конфиденциальности",
        terms: "Условия использования",
      },
      profile: {
        title: "Мой Профиль",
        personal_info: "Личная информация",
        email: "Email адрес",
        role: "Роль аккаунта",
        joined: "Дата регистрации",
        student: "Студент",
        admin: "Администратор",
        guest_title: "Гостевой аккаунт",
        guest_desc:
          "Зарегистрируйтесь, чтобы сохранять прогресс и получить доступ к профилю.",
        stats: {
          title: "Статистика",
          tests_passed: "Тестов пройдено",
          avg_score: "Средний балл",
        },
      },
      dashboard: {
        quick_start: "Быстрый старт",
        popular_folders: "Популярные подборки",
        my_folders: "Мои папки",
        create_folder: "Создать папку",
        private: "Приватная",
        public: "Публичная",
        games_count: "{{count}} игр",
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
