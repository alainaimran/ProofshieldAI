/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b", // Deep dark background
        foreground: "#fafafa",
        primary: {
          DEFAULT: "#8b5cf6", // Vibrant purple
          hover: "#7c3aed",
        },
        surface: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.1)",
        },
        danger: "#ef4444",
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
