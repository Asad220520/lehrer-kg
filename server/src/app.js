const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

// Подключаем конфигурацию Passport
require("./config/passport");

const app = express();

// --- 1. CORS (Самый первый! Оставляем только один правильный блок) ---
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Локалка
      "https://lehrer-kg.vercel.app", // Продакшен
      process.env.CLIENT_URL, // Из .env
    ].filter(Boolean), // Удаляет пустые значения, если .env не загрузился
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// --- 2. Базовые Middlewares ---
app.use(express.json());
app.use(morgan("dev"));

// --- 3. Инициализация Passport ---
app.use(passport.initialize());

// --- 4. Тестовый роут ---
app.get("/", (req, res) => {
  res.send("Lehrer KG API is running...");
});

// --- 5. Основные Роуты API ---
app.use("/api/v1/auth", require("./api/routes/auth.routes"));
app.use("/api/v1/users", require("./api/routes/user.routes"));

module.exports = app;
