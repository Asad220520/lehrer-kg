import { useEffect } from "react"; // <-- Добавь
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "@/entities/user/model/store";

export const AuthGuard = () => {
  const { isAuth, user, fetchUser } = useUserStore(); // Достаем user и fetchUser
  const location = useLocation();

  useEffect(() => {
    // Если мы авторизованы, но данных юзера нет — загружаем их
    if (isAuth && !user) {
      fetchUser();
    }
  }, [isAuth, user, fetchUser]);

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
