import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, BookOpen, Trophy, User, History } from "lucide-react";
import clsx from "clsx";

export const BottomNavigation = () => {
  const { t } = useTranslation();

  const navItems = [
    { icon: Home, label: t("user_nav.home"), path: "/" },
    { icon: BookOpen, label: t("user_nav.tests"), path: "/tests" },
    { icon: Trophy, label: t("user_nav.leaderboard"), path: "/leaderboard" },
    { icon: User, label: t("user_nav.profile"), path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 md:hidden transition-colors duration-300">
      <div className="grid h-full grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "inline-flex flex-col items-center justify-center px-5 group transition-colors",
                isActive
                  ? "text-blue-600 dark:text-blue-500"
                  : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
              )
            }
          >
            {({ isActive }) => (
              <>
                {/* Иконка с анимацией при нажатии */}
                <item.icon
                  size={24}
                  className={clsx(
                    "mb-1 transition-transform duration-200",
                    isActive ? "scale-110" : "scale-100"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="text-[10px]">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
