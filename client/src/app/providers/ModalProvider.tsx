import { useTranslation } from "react-i18next";
import { useModalStore } from "@/shared/model/modalStore";
import { BaseModal } from "@/shared/ui/Modal/BaseModal";
import { Button } from "@/shared/ui/Button/Button";
import { useUserStore } from "@/entities/user/model/store";
import { useState } from "react";
import { $api } from "@/shared/api/api";

export const ModalProvider = () => {
  const { type, props, closeModal } = useModalStore();
  const { t } = useTranslation();
  const { user, fetchUser, logout } = useUserStore(); // Достаем методы

  // --- ЛОГИКА РЕДАКТИРОВАНИЯ ПРОФИЛЯ ---
  const [formData, setFormData] = useState({ name: "", avatar: "" });

  // Когда открывается модалка редактирования — заполняем форму текущими данными
  const handleEditInit = () => {
    if (type === "EDIT_PROFILE" && user) {
      setFormData({ name: user.name, avatar: user.avatar || "" });
    }
  };

  const handleSaveProfile = async () => {
    try {
      await $api.put("/users/me", formData); // Отправляем на сервер
      await fetchUser(); // Обновляем данные на фронте
      closeModal();
    } catch (e) {
      alert("Ошибка при сохранении");
    }
  };

  // -------------------------------------

  if (!type) return null;

  return (
    <>
      {/* 1. МОДАЛКА ВЫХОДА */}
      <BaseModal
        isOpen={type === "CONFIRM_LOGOUT"}
        onClose={closeModal}
        title={t("common.confirm_logout_title") || "Выход из системы"}
      >
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {t("common.confirm_logout_desc") || "Вы действительно хотите выйти?"}
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={closeModal}>
            {t("common.cancel")}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              logout();
              closeModal();
            }}
          >
            {t("sidebar.logout")}
          </Button>
        </div>
      </BaseModal>

      {/* 2. МОДАЛКА РЕДАКТИРОВАНИЯ ПРОФИЛЯ */}
      <BaseModal
        isOpen={type === "EDIT_PROFILE"}
        onClose={closeModal}
        title={t("profile.edit_title") || "Редактировать профиль"}
      >
        <div className="space-y-4" onLoad={handleEditInit}>
          {/* Костыль с onLoad, лучше useEffect внутри отдельного компонента, но для простоты здесь так */}
          {/* В идеале вынести EditForm в отдельный файл */}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("profile.name") || "Имя"}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              // Хак: инициализация при первом рендере, если пусто
              placeholder={user?.name}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Avatar URL
            </label>
            <input
              type="text"
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
              placeholder="https://..."
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Button variant="ghost" onClick={closeModal}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSaveProfile}>{t("common.save")}</Button>
          </div>
        </div>
      </BaseModal>
    </>
  );
};
