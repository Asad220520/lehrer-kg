module.exports = function (roles = []) {
  return function (req, res, next) {
    // --- ОТЛАДКА ---
    console.log("🔐 [RoleGuard] Проверка прав доступа");
    console.log("   --> Требуемые роли:", roles);
    console.log(
      "   --> Роль пользователя (из токена):",
      req.user ? req.user.role : "НЕТ ЮЗЕРА"
    );

    if (!req.user) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    if (!roles.includes(req.user.role)) {
      console.log("⛔ [RoleGuard] Отказ в доступе!");
      return res.status(403).json({ message: "Доступ запрещен (Нужен админ)" });
    }

    console.log("✅ [RoleGuard] Доступ разрешен");
    next();
  };
};
