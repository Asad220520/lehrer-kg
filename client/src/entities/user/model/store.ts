import { create } from "zustand";
import { $api } from "@/shared/api/api";
// ОШИБКА БЫЛА ТУТ: добавляем "type" перед фигурными скобками или внутри
import type { User, UserState } from "./types";

export const useUserStore = create<UserState>((set, get) => ({
  isAuth: !!localStorage.getItem("token"),
  user: null,
  isLoading: false, // Теперь это поле легально

  login: (user: User, token: string) => {
    localStorage.setItem("token", token);
    set({ user, isAuth: true });
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ isAuth: true });
  },

  loginAsGuest: () => {
    const guestUser: User = {
      _id: "guest", // Теперь это легально (совпадает с types.ts)
      name: "Гость",
      email: "guest@lehrer.kg",
      role: "guest",
      avatar: "",
      createdAt: new Date().toISOString(),
    };
    set({ isAuth: true, user: guestUser });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isAuth: false, user: null });
  },

  fetchUser: async () => {
    if (get().user?.role === "guest") return;

    set({ isLoading: true }); // Ошибки не будет
    try {
      const { data } = await $api.get<User>("/users/me");
      set({ user: data, isAuth: true });
    } catch (error) {
      console.error("Auth Error:", error);
      localStorage.removeItem("token");
      set({ isAuth: false, user: null });
    } finally {
      set({ isLoading: false }); // Ошибки не будет
    }
  },
}));
