/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#1E1E1E',
          secondary: '#2D2D2D',
          tertiary : '#3c3c3c'
        },
        text: {
          primary: '#E4E4E4',
          secondary: '#B0B0B0',
          placeholder: '#6E6E6E',
          Coral : '#ff7f7f     '
        },
        accent: {
          primary: '#3B82F6',
          secondary: '#10B981',
          error: '#EF4444',
        },
        border: {
          primary: '#3F3F3F',
        },
      },
    },
  },
  plugins: [],
}

