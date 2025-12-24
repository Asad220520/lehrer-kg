import { LogOut, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/entities/user/model/store";
import { ThemeSwitcher } from "@/features/theme/ThemeSwitcher";
import { Button } from "@/shared/ui/Button/Button";
import { useModalStore } from "@/shared/model/modalStore"; // <--- 1. Импортируем модалки

export const UserHeader = () => {
  const { user } = useUserStore(); // logout убрали отсюда, он в модалке
  const { openModal } = useModalStore(); // <--- 2. Хук открытия
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-4 md:px-8 justify-between transition-colors duration-300">
      {/* Лого */}
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Lehrer KG
        </span>
      </div>

      {/* Настройки */}
      <div className="flex items-center gap-2 md:gap-4">
        <ThemeSwitcher />

        <Button variant="ghost" size="sm" onClick={toggleLang}>
          <Globe size={18} className="md:mr-2" />
          <span className="hidden md:inline">
            {i18n.language.toUpperCase()}
          </span>
        </Button>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

        <div className="flex items-center gap-3">
          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${
                user?.name || "G"
              }&background=random`
            }
            alt="Avatar"
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
          />

          {/* 3. Кнопка теперь открывает модалку */}
          <button
            onClick={() => openModal("CONFIRM_LOGOUT")}
            className="text-gray-500 hover:text-red-500 dark:hover:text-red-400 p-1 transition"
            title={t("sidebar.logout")}
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};
