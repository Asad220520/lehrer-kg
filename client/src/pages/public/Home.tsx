import { useEffect } from "react";
import { useTranslation } from "react-i18next"; // Хук перевода
import { useNavigate, Navigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "@/entities/user/model/store";
import { useThemeStore } from "@/features/theme/themeStore";
import { Button } from "@/shared/ui/Button/Button"; // Наша новая кнопка
import { GoogleLoginButton } from "@/features/auth/ui/GoogleLoginButton";
import { Moon, Sun, Globe } from "lucide-react";

const Home = () => {
  const { t, i18n } = useTranslation();
  const { toggleTheme, theme } = useThemeStore();
  const { isAuth, loginAsGuest, setToken, user } = useUserStore();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Логика токена (как и раньше)
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setToken(token);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "admin") navigate("/admin", { replace: true });
        else navigate("/", { replace: true });
      } catch (e) {
        navigate("/", { replace: true });
      }
    }
  }, [searchParams, setToken, navigate]);

  // Редиректы если уже вошел
  if (isAuth && user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  // Смена языка
  const toggleLang = () => {
    const newLang = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Верхняя панель (Настройки) */}
      <div className="absolute top-6 right-6 flex gap-3">
        <Button variant="ghost" size="sm" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
        <Button variant="ghost" size="sm" onClick={toggleLang}>
          <Globe size={20} className="mr-2" />
          {i18n.language.toUpperCase()}
        </Button>
      </div>

      {/* Карточка входа */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Lehrer KG
          </h1>
          <p className="text-gray-500 dark:text-gray-400">{t("welcome")}</p>
        </div>

        <div className="space-y-4">
          {/* Google Button внутри контейнера */}
          <div className="flex justify-center">
            <GoogleLoginButton />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">
                Or
              </span>
            </div>
          </div>

          <Button variant="outline" fullWidth onClick={loginAsGuest}>
            {t("guest")}
          </Button>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-400">
        © 2025 Lehrer KG Enterprise. All rights reserved.
      </p>
    </div>
  );
};

export default Home;
