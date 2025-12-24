import { Bell, Search, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/entities/user/model/store";
import { ThemeSwitcher } from "@/features/theme/ThemeSwitcher";
import { Button } from "@/shared/ui/Button/Button";

export const Header = () => {
  const { user } = useUserStore();
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 fixed top-0 right-0 left-64 z-10 px-8 flex items-center justify-between transition-colors duration-300">
      {/* Поиск */}
      <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg w-96 transition-colors">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder={t("common.search") || "Поиск..."} // Добавь "search": "Поиск..." в i18n
          className="bg-transparent border-none outline-none text-sm w-full text-gray-700 dark:text-gray-200 placeholder-gray-400"
        />
      </div>

      {/* Правая часть */}
      <div className="flex items-center gap-4">
        {/* Переключатели (Тема + Язык) */}
        <div className="flex items-center gap-2 mr-2">
          <ThemeSwitcher />
          <Button variant="ghost" size="sm" onClick={toggleLang}>
            <Globe size={18} />
            <span className="ml-2 text-xs font-bold">
              {i18n.language.toUpperCase()}
            </span>
          </Button>
        </div>

        {/* Уведомления */}
        <button className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
        </button>

        {/* Профиль Админа */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200 dark:border-gray-700">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
              {user?.role || "Administrator"}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
            <img
              src={
                user?.avatar ||
                `https://ui-avatars.com/api/?name=${
                  user?.name || "A"
                }&background=random`
              }
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
