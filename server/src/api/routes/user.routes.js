const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// Получить профиль (Для всех авторизованных)
router.get("/me", authMiddleware, userController.getMe);

// Получить ВСЕХ юзеров (ТОЛЬКО ДЛЯ ADMIN)
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  userController.getAllUsers
);

module.exports = router;
