const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // Логгер запросов (нужно установить npm i morgan)

const app = express();

// --- Middlewares ---
app.use(express.json()); // Чтение JSON
app.use(cors()); // Разрешить запросы с фронта
app.use(morgan("dev")); // Логи в консоль

// --- Routes (заглушка для проверки) ---
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Сюда будем подключать роуты api
// app.use('/api/v1/auth', authRoutes);

module.exports = app;
