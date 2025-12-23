import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/entities/user/model/store";

interface RoleGuardProps {
  roles: string[];
}

export const RoleGuard = ({ roles }: RoleGuardProps) => {
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);

  // Пока грузимся — ничего не делаем (или показываем спиннер)
  if (isLoading) return <div className="p-10">Проверка прав...</div>;

  // Если юзер загрузился, но роль не подходит
  if (user && !roles.includes(user.role)) {
    // Если это User, кидаем его в Личный кабинет (/)
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
