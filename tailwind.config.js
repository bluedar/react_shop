/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        logoFont: ["Spectral", "serif"],
      },
      colors: {
        brand: "#FFB9C9",
      },
    },
  },
  plugins: [],
};
