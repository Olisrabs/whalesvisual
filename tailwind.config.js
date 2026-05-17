/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37", // Gold
        background: "#ffffff",
        surface: "#f9f9f9",
        accentText: "#000000",
        mutedText: "#555555",
        border: "#e5e5e5",
        ctaHover: "#b5952f", // Darker Gold
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
