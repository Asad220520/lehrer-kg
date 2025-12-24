import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, BookOpen, Trophy, Clock, User } from "lucide-react";
import clsx from "clsx";

export const UserSidebar = () => {
  const { t } = useTranslation();

  const navItems = [
    { icon: Home, label: t("user_nav.home"), path: "/" },
    { icon: BookOpen, label: t("user_nav.tests"), path: "/tests" },
    { icon: Clock, label: t("user_nav.history"), path: "/history" },
    { icon: Trophy, label: t("user_nav.leaderboard"), path: "/leaderboard" },
    { icon: User, label: t("user_nav.profile"), path: "/profile" },
  ];

  return (
    // hidden md:block — скрывает сайдбар на телефонах, показывает на планшетах/ПК
    <aside className="hidden md:block fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-30 pt-20 transition-colors duration-300">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              )
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
