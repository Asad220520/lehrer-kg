import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  BookOpen,
  Globe,
} from "lucide-react";
import { useUserStore } from "@/entities/user/model/store";
import { ThemeSwitcher } from "@/features/theme/ThemeSwitcher";
import { Button } from "@/shared/ui/Button/Button";
import clsx from "clsx";

export const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const { logout, user } = useUserStore();

  const toggleLang = () => {
    const newLang = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(newLang);
  };

  const baseItems = [
    { icon: LayoutDashboard, label: t("sidebar.dashboard"), path: "/admin" },
    { icon: BookOpen, label: t("sidebar.quizzes"), path: "/admin/quizzes" },
  ];

  const adminItems = [
    { icon: Users, label: t("sidebar.users"), path: "/admin/users" },
    { icon: Settings, label: t("sidebar.settings"), path: "/admin/settings" },
  ];

  const navItems =
    user?.role === "admin" ? [...baseItems, ...adminItems] : baseItems;

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen fixed left-0 top-0 z-20 transition-colors duration-300">
      {/* Логотип */}
      <div className="h-16 flex items-center px-8 border-b border-gray-100 dark:border-gray-800">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Lehrer KG
        </span>
      </div>

      {/* Меню Навигации */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              )
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Нижняя панель: Настройки и Выход */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
        {/* Блок переключателей (в одну строку) */}
        <div className="flex items-center justify-between px-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg py-2">
          {/* Переключатель Темы */}
          <ThemeSwitcher />

          <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>

          {/* Переключатель Языка */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLang}
            className="text-xs font-bold"
            title="Сменить язык"
          >
            <Globe size={16} className="mr-2" />
            {i18n.language.toUpperCase()}
          </Button>
        </div>

        {/* Кнопка Выхода */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all font-medium"
        >
          <LogOut size={20} />
          {t("sidebar.logout")}
        </button>
      </div>
    </aside>
  );
};
