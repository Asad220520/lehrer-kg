require("dotenv").config(); // Чтение .env
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Сначала подключаемся к БД, потом запускаем сервер
const start = async () => {
  try {
    // await connectDB(); // Раскомментируй, когда добавишь строку подключения в .env
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
