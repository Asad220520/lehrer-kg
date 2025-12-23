/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // <--- ОБЯЗАТЕЛЬНО: меняем 'media' на 'class'
  theme: {
    extend: {},
  },
  plugins: [],
};
