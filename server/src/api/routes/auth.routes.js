const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// 1. Инициация входа (перенаправляет на Google)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2. Callback от Google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    // Юзер успешно авторизован, генерируем JWT
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // РЕДИРЕКТ НА ФРОНТ С ТОКЕНОМ
    // В продакшене лучше использовать httpOnly cookie, но для старта query param подойдет
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    res.redirect(`${clientUrl}/login?token=${token}`);
  }
);

module.exports = router;
