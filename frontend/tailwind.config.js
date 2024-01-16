/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        oswald: ["oswald", "sans-serif"],
      },
    },
    backgroundImage: {
      parallax: 'url("../assets/banner.jpg")',
    },
  },
  darkMode: "class",
  plugins: [],
};
