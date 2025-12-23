import { create } from "zustand";
import { $api } from "@/shared/api/api";

interface User {
  _id: string;
  name: string;
  role: "admin" | "user" | "guest"; // <--- Добавили 'guest'
  avatar?: string;
}

interface UserState {
  isAuth: boolean;
  user: User | null;
  isLoading: boolean;
  setToken: (token: string) => void;
  loginAsGuest: () => void; // <--- Новый метод
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  isAuth: !!localStorage.getItem("token"),
  user: null,
  isLoading: false,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ isAuth: true });
  },

  // Вход как гость (без токена, просто меняем стейт)
  loginAsGuest: () => {
    set({
      isAuth: true,
      user: {
        _id: "guest",
        name: "Гость",
        role: "guest",
        avatar: "",
      },
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isAuth: false, user: null });
  },

  fetchUser: async () => {
    // Если мы в режиме гостя - не делаем запрос на сервер
    if (useUserStore.getState().user?.role === "guest") return;

    set({ isLoading: true });
    try {
      const { data } = await $api.get<User>("/users/me");
      set({ user: data, isAuth: true });
    } catch (error) {
      set({ isAuth: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
