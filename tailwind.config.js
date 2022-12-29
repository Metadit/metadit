/** @type {DefaultColors} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.sky["600"],
        content: colors.zinc["500"],
        contentBg: "#181818",
        darkContent: "#151515",
      },
    },
  },
  plugins: [],
};
