import { Outlet } from "react-router-dom";
import { UserHeader } from "@/widgets/Header/UserHeader";
import { UserSidebar } from "@/widgets/Sidebar/UserSidebar";
import { BottomNavigation } from "@/widgets/Navigation/BottomNavigation"; // <--- Импорт

export const UserLayout = () => {
  // Нам больше не нужно состояние для открытия сайдбара на мобилке,
  // так как на мобилке теперь BottomNav!

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Шапка */}
      <UserHeader />

      <div className="flex flex-1 pt-0">
        {/* Сайдбар (ВИДЕН ТОЛЬКО НА PC, скрыт на mobile через CSS внутри компонента) */}
        <UserSidebar />

        {/* Основной контент */}
        <main className="flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8 w-full">
          {/* pb-24 добавлено для мобилок, чтобы контент не ушел под нижнее меню */}
          <Outlet />
        </main>
      </div>

      {/* Нижняя навигация (ВИДНА ТОЛЬКО НА MOBILE) */}
      <BottomNavigation />
    </div>
  );
};
