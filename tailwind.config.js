/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 👈 REQUIRED for manual dark mode toggle
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
