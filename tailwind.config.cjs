/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        black: {
          light: "#3C393F",
          medium: "#120F13",
          dark: "#0B090C",
        },
        gray: {
          dark: "#333",
        },
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      screens: {
        xs: "320px",
        sm: "425px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
};
