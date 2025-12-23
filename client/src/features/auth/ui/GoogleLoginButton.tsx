import { API_URL } from "@/shared/api/api";
import { LogIn } from "lucide-react"; // npm i lucide-react

export const GoogleLoginButton = () => {
  const handleLogin = () => {
    // Редирект на эндпоинт нашего сервера
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-3 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-50 transition-all border border-gray-200"
    >
      <LogIn className="w-5 h-5 text-blue-600" />
      <span>Войти через Google</span>
    </button>
  );
};
