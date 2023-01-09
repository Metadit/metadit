/** @type {DefaultColors} */
const colors = require("tailwindcss/colors")
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.orange["600"],
                content: colors.zinc["500"],
                contentBg: "#181818",
                darkContent: "#151515",
            },
        },
    },
    plugins: [],
}
