import { Play } from "lucide-react";

interface GameCardProps {
  title: string;
  icon: React.ElementType; // Компонент иконки (Lucide)
  color: string; // Класс цвета (напр. bg-red-500)
  onClick: () => void;
}

export const GameCard = ({
  title,
  icon: Icon,
  color,
  onClick,
}: GameCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center min-w-[140px] h-[160px] rounded-2xl p-4 transition-all hover:-translate-y-1 hover:shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      {/* Цветной фон сверху (декор) */}
      <div
        className={`absolute top-0 inset-x-0 h-1/2 opacity-10 ${color} transition-opacity group-hover:opacity-20`}
      />

      {/* Иконка в круге */}
      <div
        className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-white mb-3 shadow-md ${color}`}
      >
        <Icon size={28} />
      </div>

      <span className="relative z-10 font-semibold text-gray-800 dark:text-gray-100 text-center text-sm leading-tight">
        {title}
      </span>

      {/* Кнопка Play появляется при наведении */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] rounded-2xl">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-xl scale-0 group-hover:scale-100 transition-transform duration-300">
          <Play size={20} fill="currentColor" />
        </div>
      </div>
    </button>
  );
};
