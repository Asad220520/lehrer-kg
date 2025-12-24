import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        {/* Копирайт */}
        <div>
          &copy; {year}{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            Lehrer KG
          </span>
          . {t("footer.rights")}
        </div>

        {/* Ссылки */}
        <div className="flex gap-6">
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {t("footer.privacy")}
          </a>
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {t("footer.terms")}
          </a>
        </div>
      </div>
    </footer>
  );
};
