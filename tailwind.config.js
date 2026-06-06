/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",   // ✅ ADD THIS
    "./pages/**/*.{js,ts,jsx,tsx}",        // ✅ ADD THIS (optional but safe)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}