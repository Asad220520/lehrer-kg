import { Bell, Search } from "lucide-react";
import { useUserStore } from "@/entities/user/model/store"; // Импорт стора

export const Header = () => {
  const user = useUserStore((state) => state.user); // Достаем юзера

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 right-0 left-64 z-10 px-8 flex items-center justify-between">
      {/* Поиск (без изменений) */}
      <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg w-96">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Поиск..."
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      {/* Правая часть */}
      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-gray-700 transition">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden md:block">
            {/* РЕАЛЬНОЕ ИМЯ */}
            <p className="text-sm font-semibold text-gray-800">
              {user?.name || "Загрузка..."}
            </p>
            <p className="text-xs text-gray-500 uppercase">
              {user?.role || "User"}
            </p>
          </div>

          {/* РЕАЛЬНАЯ АВАТАРКА */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white">
                {user?.name?.[0] || "U"}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
