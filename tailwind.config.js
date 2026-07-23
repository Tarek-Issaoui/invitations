/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "emerald-deep": "#0f1715",
        gold: "#d4af37",
        "gold-light": "#e8d48b",
        "gold-dark": "#b8962e",
        ivory: "#faf8f0",
        "ivory-warm": "#f5f0e1",
      },
      fontFamily: {
        amiri: ['"Amiri"', "serif"],
        aref: ['"Aref Ruqaa"', "serif"],
        cairo: ['"Cairo"', "sans-serif"],
      },
    },
  },
  plugins: [],
}
