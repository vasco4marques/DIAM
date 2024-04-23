/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "pink": "var(--pink)",
        "blue": "var(--blue)",
        "ice-blue": "var(--ice-blue)",
        "blue-grey": "var(--blue-grey)",
        "pink-purple": "var(--pink-purple)"
      }
    },
  },
  plugins: [],
}

