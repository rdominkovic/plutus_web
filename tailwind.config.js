module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './instructions/**/*.{js,ts,jsx,tsx,md}'
  ],
  theme: {
    extend: {
      colors: {
        'main-black': 'rgba(0,0,0,1)',
        'main-white': '#f8f7f4',
        'palatinate-blue': 'rgb(88,47,205)',
        'accent-green': '#c3fb5e',
      },
      fontFamily: {
        sans: ['var(--font-telegraf)', 'sans-serif'],
        mono: ['var(--font-fraktion)', 'monospace'],
      },
      borderRadius: {
        'pill': '9999px',
      },
    },
  },
  plugins: [],
}; 