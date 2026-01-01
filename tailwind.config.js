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
          green: '#2e8b57'
        }
      }
    },
  },
  plugins: [],
}