require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    // 1. Подключаемся к MongoDB (Теперь это работает!)
    await connectDB();

    // 2. Запускаем сервер
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.log("Database connection error:");
    console.error(e);
    process.exit(1);
  }
};

start();
