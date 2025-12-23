import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { MainLayout } from "@/app/layouts/MainLayout";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { AuthGuard } from "./AuthGuard";
import { RoleGuard } from "./RoleGuard"; // Импортируем Guard

import Home from "@/pages/public/Home";
import Dashboard from "@/pages/admin/Dashboard";
import UsersPage from "@/pages/admin/UsersPage";
import UserDashboard from "@/pages/user/UserDashboard"; // Наш новый файл

const router = createBrowserRouter([
  // 1. ЛОГИН (Публичный)
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Home /> }],
  },

  // 2. ЗАЩИЩЕННЫЕ МАРШРУТЫ (Нужен вход)
  {
    element: <AuthGuard />,
    children: [
      // А) Маршрут для ОБЫЧНЫХ ЮЗЕРОВ (корень /)
      {
        path: "/",
        element: <UserDashboard />,
      },

      // Б) Маршрут ТОЛЬКО ДЛЯ АДМИНОВ
      {
        element: <RoleGuard roles={["admin"]} />, // <--- ГЛАВНАЯ ЗАЩИТА ТУТ
        children: [
          {
            element: <MainLayout />, // Админский лейаут с сайдбаром
            children: [
              { path: "/admin", element: <Dashboard /> },
              { path: "/admin/users", element: <UsersPage /> },
              // Другие админские страницы...
            ],
          },
        ],
      },
    ],
  },

  // 404
  { path: "*", element: <div>404 Not Found</div> },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
