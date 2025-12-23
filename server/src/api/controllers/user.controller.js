const User = require("../../data/models/User");

// Получить профиль текущего пользователя
exports.getMe = async (req, res) => {
  try {
    // req.user.id берется из middleware (passport или jwt check)
    // Но так как мы используем JWT вручную, нам нужно middleware для проверки токена.
    // Пока предположим, что мы его напишем в следующем шаге.

    const user = await User.findById(req.user.id).select("-password"); // Не возвращаем пароль

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 }); // Сортируем: новые сверху
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};