import clsx from "clsx";

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface QuizEngineProps {
  question: Question;
  onAnswer: (index: number) => void;
  isSubmitting?: boolean; // Блокировать ли кнопки
}

export const QuizEngine = ({
  question,
  onAnswer,
  isSubmitting,
}: QuizEngineProps) => {
  // Цвета для кнопок (как в Kahoot)
  const colors = [
    "bg-red-500 hover:bg-red-600 border-red-700",
    "bg-blue-500 hover:bg-blue-600 border-blue-700",
    "bg-yellow-500 hover:bg-yellow-600 border-yellow-700",
    "bg-green-500 hover:bg-green-600 border-green-700",
  ];

  return (
    <div className="w-full flex flex-col h-full justify-between py-4">
      {/* БЛОК ВОПРОСА */}
      <div className="flex-1 flex items-center justify-center mb-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center border border-gray-100 dark:border-gray-700 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white leading-tight">
            {question.text}
          </h2>
        </div>
      </div>

      {/* БЛОК ОТВЕТОВ (Сетка 2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64 md:h-48">
        {question.options.map((option, index) => (
          <button
            key={index}
            disabled={isSubmitting}
            onClick={() => onAnswer(index)}
            className={clsx(
              "relative text-white font-bold text-lg md:text-xl rounded-xl shadow-md transition-transform active:scale-95 border-b-4",
              colors[index % 4], // Цикличные цвета
              isSubmitting && "opacity-70 cursor-not-allowed"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
