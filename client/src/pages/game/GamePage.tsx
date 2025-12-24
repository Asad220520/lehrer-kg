import { useState } from "react";
import { useParams } from "react-router-dom";
import { GameLayout } from "./GameLayout";
import { ResultScreen } from "@/features/game/ui/ResultScreen";
import { QuizEngine } from "@/features/game/engines/QuizEngine";

// --- ВРЕМЕННЫЕ ДАННЫЕ (Потом заменим на API) ---
const MOCK_QUESTIONS = [
  {
    id: "1",
    text: "Столица Франции?",
    options: ["Берлин", "Лондон", "Париж", "Мадрид"],
    correct: 2,
  },
  {
    id: "2",
    text: "2 + 2 * 2 = ?",
    options: ["6", "8", "4", "10"],
    correct: 0,
  },
  {
    id: "3",
    text: "Самая большая планета?",
    options: ["Земля", "Марс", "Юпитер", "Сатурн"],
    correct: 2,
  },
];

const GamePage = () => {
  const { id } = useParams(); // ID игры из URL (пока не используем)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = MOCK_QUESTIONS[currentIndex];

  const handleAnswer = (selectedIndex: number) => {
    // 1. Проверяем ответ
    if (selectedIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    // 2. Ждем немного или сразу переключаем (тут можно добавить анимацию)
    if (currentIndex + 1 < MOCK_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleTimeUp = () => {
    setIsFinished(true);
  };

  // Если игра закончена - показываем результат
  if (isFinished) {
    return (
      <ResultScreen
        score={score}
        total={MOCK_QUESTIONS.length}
        onRetry={() => {
          setScore(0);
          setCurrentIndex(0);
          setIsFinished(false);
        }}
      />
    );
  }

  // Иначе показываем игру
  return (
    <GameLayout
      currentStep={currentIndex}
      totalSteps={MOCK_QUESTIONS.length}
      timeLimit={30} // 30 секунд на всю игру (для теста)
      onTimeUp={handleTimeUp}
    >
      <QuizEngine question={currentQuestion} onAnswer={handleAnswer} />
    </GameLayout>
  );
};

export default GamePage;
