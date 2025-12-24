import { useTranslation } from "react-i18next";
import { Lock, Globe, Folder, PlayCircle } from "lucide-react";
import { Button } from "@/shared/ui/Button/Button";

interface FolderCardProps {
  title: string;
  author: string;
  gamesCount: number;
  isPrivate: boolean;
  gradient: string; // Градиент фона (напр. from-blue-500 to-cyan-500)
  onClick: () => void;
}

export const FolderCard = ({
  title,
  author,
  gamesCount,
  isPrivate,
  gradient,
  onClick,
}: FolderCardProps) => {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* 1. Обложка папки */}
      <div
        className={`h-24 bg-gradient-to-r ${gradient} relative p-4 flex justify-between items-start`}
      >
        {/* Иконка типа (Приват/Публик) */}
        <div className="bg-black/20 backdrop-blur-md p-1.5 rounded-lg text-white">
          {isPrivate ? <Lock size={14} /> : <Globe size={14} />}
        </div>

        {/* Декор иконка папки */}
        <Folder className="text-white/20 absolute -bottom-4 -right-4 w-24 h-24 rotate-12" />
      </div>

      {/* 2. Информация */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg truncate mb-1">
          {title}
        </h3>

        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              by {author}
            </p>
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-md inline-block">
              {t("dashboard.games_count", { count: gamesCount })}
            </p>
          </div>

          {/* Кнопка запуска */}
          <Button
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <PlayCircle
              size={24}
              className="text-blue-600 dark:text-blue-400"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
