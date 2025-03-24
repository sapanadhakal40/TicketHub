/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nav: 'var(--nav-bg)',
        'page-bg': 'var(--page-bg)',
        card: 'var(--card-bg)',
        'card-hover': 'var(--card-hover-bg)',
        'default-text': 'var(--text-color)',
        'default-border': 'var(--border-color)',
      },

  
    },
  },
  plugins: [],
}
