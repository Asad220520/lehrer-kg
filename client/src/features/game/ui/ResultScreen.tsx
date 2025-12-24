import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Trophy, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/shared/ui/Button/Button";

interface ResultScreenProps {
  score: number;
  total: number;
  onRetry: () => void;
}

export const ResultScreen = ({ score, total, onRetry }: ResultScreenProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-fadeIn">
      <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6 text-yellow-500 animate-bounce">
        <Trophy size={48} />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {percentage > 50 ? "Отличная работа! 🎉" : "Можно лучше! 💪"}
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Ты набрал{" "}
        <span className="font-bold text-gray-900 dark:text-white">{score}</span>{" "}
        из {total} баллов
      </p>

      <div className="w-full max-w-xs space-y-3">
        <Button fullWidth onClick={onRetry} size="lg">
          <RefreshCcw size={20} className="mr-2" />
          Играть снова
        </Button>
        <Button variant="outline" fullWidth onClick={() => navigate("/")}>
          <Home size={20} className="mr-2" />В меню
        </Button>
      </div>
    </div>
  );
};
