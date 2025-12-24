import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { MainLayout } from "@/app/layouts/MainLayout"; // Админский лейаут
import { UserLayout } from "@/app/layouts/UserLayout"; // <--- НАШ НОВЫЙ ЛЕЙАУТ

import { AuthGuard } from "./AuthGuard";
import { RoleGuard } from "./RoleGuard";

import Home from "@/pages/public/Home";
import Dashboard from "@/pages/admin/Dashboard"; // Админский
import UsersPage from "@/pages/admin/UsersPage"; // Админский
import UserDashboard from "@/pages/user/UserDashboard"; // Юзерский Dashboard
import ProfilePage from "@/pages/user/ProfilePage";
import GamePage from "@/pages/game/GamePage";

const router = createBrowserRouter([
  // 1. Публичные
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Home /> }],
  },

  // 2. ЗАЩИЩЕННЫЕ
  {
    element: <AuthGuard />,
    children: [
      // А) ЗОНА USER (Ученики)
      {
        path: "/",
        element: <UserLayout />, // <--- Обернули в новый Layout
        children: [
          { index: true, element: <UserDashboard /> },
          { path: "tests", element: <div>Тут будут тесты</div> },
          { path: "history", element: <div>Тут история</div> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
      {
        path: "/play/:id", // Например /play/123
        element: <GamePage />,
      },
      // Б) ЗОНА ADMIN (Учитель)
      {
        path: "/admin",
        element: <RoleGuard roles={["admin"]} />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "users", element: <UsersPage /> },
            ],
          },
        ],
      },
    ],
  },

  { path: "*", element: <div>404 Not Found</div> },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
