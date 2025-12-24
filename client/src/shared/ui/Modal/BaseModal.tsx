import { useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
}: BaseModalProps) => {
  // Блокируем скролл страницы, когда модалка открыта
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Используем Portal, чтобы модалка была поверх ВСЕГО (даже поверх z-index: 50)
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Затемнение фона */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Само окно */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all border border-gray-100 dark:border-gray-700">
        {/* Шапка */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Контент */}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};
