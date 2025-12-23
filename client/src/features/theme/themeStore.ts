import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  // 1. Читаем из localStorage или ставим system
  theme: (localStorage.getItem("theme") as Theme) || "system",

  setTheme: (newTheme) => {
    // 2. Логика работы с HTML тегом
    const root = window.document.documentElement;
    root.classList.remove("light", "dark"); // Сносим старые классы

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      localStorage.removeItem("theme");
    } else {
      root.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
    }

    // 3. Обновляем состояние в React
    set({ theme: newTheme });
  },
}));

// 4. Слушатель системной темы (чтобы работало авто-переключение)
if (typeof window !== "undefined") {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");
      }
    });
}
