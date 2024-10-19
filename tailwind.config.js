/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        indigo: {
          100: "#E0E7FF",
          200: "#C7D2FE",
          500: "#6366F1",
          600: "#4F46E5",
          800: "#3730A3",
        },
        purple: {
          100: "#EDE9FE",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
