import { useUserStore } from "@/entities/user/model/store";
import { LogOut } from "lucide-react";

const UserDashboard = () => {
  const { user, logout } = useUserStore();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Шапка */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Привет, {user?.name}! 👋
            </h1>
            <p className="text-gray-500">Это твой личный кабинет.</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition"
          >
            <LogOut size={20} /> Выйти
          </button>
        </div>

        {/* Контент пользователя */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Мои результаты</h3>
            <p className="text-gray-400">Пока пусто...</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Доступные тесты</h3>
            <p className="text-gray-400">Скоро здесь появятся тесты.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
