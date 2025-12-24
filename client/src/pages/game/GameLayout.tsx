import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Clock } from "lucide-react";

interface GameLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  timeLimit?: number; // В секундах (если 0 - безлимит)
  onTimeUp: () => void;
}

export const GameLayout = ({
  children,
  currentStep,
  totalSteps,
  timeLimit = 0,
  onTimeUp,
}: GameLayoutProps) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  // Логика Таймера
  useEffect(() => {
    if (timeLimit === 0) return;
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, timeLimit, onTimeUp]);

  // Форматирование времени (01:30)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      {/* ВЕРХНЯЯ ПАНЕЛЬ */}
      <div className="h-16 px-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm relative z-10">
        {/* Кнопка Выхода */}
        <button
          onClick={() => navigate("/")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500"
        >
          <X size={24} />
        </button>

        {/* Таймер (по центру) */}
        {timeLimit > 0 && (
          <div
            className={`flex items-center gap-2 font-mono text-xl font-bold ${
              timeLeft < 10
                ? "text-red-500 animate-pulse"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            <Clock size={20} />
            {formatTime(timeLeft)}
          </div>
        )}

        {/* Счетчик вопросов */}
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {currentStep + 1} / {totalSteps}
        </div>

        {/* Прогресс бар (абсолютно снизу хедера) */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ИГРОВАЯ ЗОНА (Центр) */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-3xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};
