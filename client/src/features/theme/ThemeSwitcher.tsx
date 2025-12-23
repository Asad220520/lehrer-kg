import { Monitor, Moon, Sun } from "lucide-react";
import { useThemeStore } from "./themeStore";
import { Button } from "@/shared/ui/Button/Button";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore();

  const handleToggle = () => {
    // Циклическое переключение: Light -> Dark -> System -> Light
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={20} />; // Солнце
      case "dark":
        return <Moon size={20} />; // Луна
      case "system":
        return <Monitor size={20} />; // Монитор
      default:
        return <Sun size={20} />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      title={`Тема: ${theme}`}
    >
      {getIcon()}
    </Button>
  );
};
