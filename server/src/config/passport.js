const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../data/models/User"); // <--- ВАЖНО: Проверь путь к модели!
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        // --- ЧИТ-КОД: АВТО-АДМИНКА ---
        // ЗАМЕНИ НА СВОЙ EMAIL
        const MY_EMAIL = "tvoi.email@gmail.com";

        if (profile.emails && profile.emails[0].value === MY_EMAIL) {
          console.log("👑 Входит Создатель! Выдаем права Admin.");
          if (user && user.role !== "admin") {
            user.role = "admin";
            await user.save();
          }
        }
        // -----------------------------

        if (!user) {
          // Определяем роль при создании
          const email = profile.emails ? profile.emails[0].value : "";
          const isAdmin = email === MY_EMAIL;

          user = await User.create({
            googleId: profile.id,
            email: email,
            name: profile.displayName,
            avatar: profile.photos ? profile.photos[0].value : "",
            role: isAdmin ? "admin" : "user",
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Passport Error:", error); // Логируем ошибку, если есть
        return done(error, null);
      }
    }
  )
);
