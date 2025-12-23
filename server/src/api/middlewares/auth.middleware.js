const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // 1. Достаем токен из заголовка Authorization: Bearer <token>
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Нет токена, авторизация запрещена" });
  }

  try {
    // 2. Расшифровываем
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Кладем ID юзера в запрос
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Токен невалиден" });
  }
};
