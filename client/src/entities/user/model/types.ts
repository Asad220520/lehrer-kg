export interface User {
  _id: string; // Исправили id на _id (как в MongoDB)
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  avatar?: string;
  createdAt?: string;
}

export interface UserState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean; // <--- ДОБАВИЛИ (Ошибка RoleGuard исчезнет)

  login: (user: User, token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
  loginAsGuest: () => void;
  fetchUser: () => Promise<void>;
}
