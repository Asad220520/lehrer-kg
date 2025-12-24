import { useTranslation } from "react-i18next";
import { Flag, Calculator, Music, Plus } from "lucide-react";
import { GameCard } from "@/entities/game/ui/GameCard";
import { FolderCard } from "@/entities/folder/ui/FolderCard";
import { Button } from "@/shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";

// Временные данные для демонстрации
const QUICK_GAMES = [
  { id: 1, title: "Угадай Флаг", icon: Flag, color: "bg-red-500" },
  { id: 2, title: "Математика", icon: Calculator, color: "bg-blue-500" },
  { id: 3, title: "Мелодия", icon: Music, color: "bg-purple-500" },
  { id: 4, title: "Сложение", icon: Plus, color: "bg-green-500" },
];

const POPULAR_FOLDERS = [
  {
    id: 1,
    title: "География 8 класс",
    author: "Mr. Smith",
    count: 12,
    isPrivate: false,
    grad: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "История Мира",
    author: "HistoryChannel",
    count: 45,
    isPrivate: false,
    grad: "from-orange-500 to-red-500",
  },
  {
    id: 3,
    title: "Английские слова",
    author: "Elena Teach",
    count: 100,
    isPrivate: true,
    grad: "from-purple-500 to-pink-500",
  },
];

const UserDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Хук
  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* 1. Блок Приветствия */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t("dashboard.quick_start")} 🚀
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Выбирай мини-игру и начинай прямо сейчас
        </p>

        {/* Скролл-контейнер для игр */}
        <div className="mt-6 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {QUICK_GAMES.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              icon={game.icon}
              color={game.color}
              onClick={() => navigate(`/play/${game.id}`)}
            />
          ))}
        </div>
      </div>

      {/* 2. Популярные папки */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("dashboard.popular_folders")} 🔥
          </h2>
          <Button variant="ghost" size="sm">
            Показать все
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_FOLDERS.map((folder) => (
            <FolderCard
              key={folder.id}
              title={folder.title}
              author={folder.author}
              gamesCount={folder.count}
              isPrivate={folder.isPrivate}
              gradient={folder.grad}
              onClick={() => alert(`Открыть папку: ${folder.title}`)}
            />
          ))}
        </div>
      </div>

      {/* 3. Мои папки (Заглушка с кнопкой создания) */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t("dashboard.my_folders")} 📂
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Кнопка создания новой папки */}
          <button className="h-40 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <span className="font-medium">{t("dashboard.create_folder")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
