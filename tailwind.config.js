/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sochi: {
          blue: '#0077be',
          sand: '#f4e4bc',
          dark: '#1a1a1a'
        }
      }
    },
  },
  plugins: [],
}