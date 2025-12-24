import { useTranslation } from "react-i18next";
import { useUserStore } from "@/entities/user/model/store";
import { useModalStore } from "@/shared/model/modalStore"; // <--- 1. Импорт стора модалок
import {
  Mail,
  Calendar,
  Shield,
  LogOut,
  UserCircle,
  Trophy,
  Target,
  Edit, // <--- 2. Импорт иконки редактирования
} from "lucide-react";
import { Button } from "@/shared/ui/Button/Button";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user, logout } = useUserStore();
  const { openModal } = useModalStore(); // <--- 3. Достаем функцию открытия

  // Если это Гость — показываем заглушку
  if (!user || user.role === "guest") {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <UserCircle size={80} className="text-gray-300 dark:text-gray-600" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {t("profile.guest_title")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          {t("profile.guest_desc")}
        </p>
        <Button onClick={logout}>На главную страницу входа</Button>
      </div>
    );
  }

  // Форматируем дату регистрации
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t("profile.title")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ЛЕВАЯ КОЛОНКА: Карточка Личности */}
        <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center">
          <div className="relative mb-4 group">
            <img
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${user.name}&background=random&size=128`
              }
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-50 dark:border-blue-900/30 shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <span
              className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800"
              title="Online"
            ></span>

            {/* Кнопка быстрого редактирования на аватарке (опционально) */}
            <button
              onClick={() => openModal("EDIT_PROFILE")}
              className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
            >
              <Edit size={24} />
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h2>

          {/* Бейдж роли */}
          <span
            className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-sm font-medium ${
              user.role === "admin"
                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            }`}
          >
            <Shield size={14} />
            {user.role === "admin" ? t("profile.admin") : t("profile.student")}
          </span>

          {/* 4. КНОПКА РЕДАКТИРОВАНИЯ */}
          <div className="mt-4 w-full px-4">
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              onClick={() => openModal("EDIT_PROFILE")}
            >
              <Edit size={16} className="mr-2" />
              Редактировать
            </Button>
          </div>

          <div className="mt-6 w-full border-t border-gray-100 dark:border-gray-700 pt-6">
            <Button
              variant="outline"
              fullWidth
              // 5. ТЕПЕРЬ ВЫЗЫВАЕМ МОДАЛКУ, А НЕ СРАЗУ ВЫХОДИМ
              onClick={() => openModal("CONFIRM_LOGOUT")}
              className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20"
            >
              <LogOut size={18} className="mr-2" />
              {t("sidebar.logout")}
            </Button>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: Подробная информация и Статистика */}
        <div className="md:col-span-2 space-y-6">
          {/* Блок 1: Личная информация */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("profile.personal_info")}
              </h3>
              <button
                onClick={() => openModal("EDIT_PROFILE")}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Изменить
              </button>
            </div>

            <div className="space-y-4">
              <InfoItem
                icon={Mail}
                label={t("profile.email")}
                value={user.email}
              />
              <InfoItem
                icon={Calendar}
                label={t("profile.joined")}
                value={joinedDate}
              />
              <InfoItem
                icon={Shield}
                label={t("profile.role")}
                value={user.role.toUpperCase()}
              />
            </div>
          </div>

          {/* Блок 2: Быстрая статистика */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Trophy size={20} className="text-yellow-500" />
              {t("profile.stats.title")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={Target}
                label={t("profile.stats.tests_passed")}
                value="0"
              />
              <StatCard
                icon={Trophy}
                label={t("profile.stats.avg_score")}
                value="-%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Вспомогательные компоненты ---

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50">
    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 shadow-sm">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-medium text-gray-900 dark:text-white break-all">
        {value}
      </p>
    </div>
  </div>
);

const StatCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 flex items-center gap-3 transition-transform hover:scale-105">
    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
      <Icon size={24} />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  </div>
);

export default ProfilePage;
