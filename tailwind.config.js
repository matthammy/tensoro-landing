/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'midnight': {
          900: '#0a0e27',
          800: '#0f1433',
        },
        'electric-cyan': '#00d9ff',
      },
    },
  },
  plugins: [],
}
