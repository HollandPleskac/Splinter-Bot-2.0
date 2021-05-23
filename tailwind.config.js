const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  purge: [],
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      'sans': ['nunito', ...defaultTheme.fontFamily.sans],
      'serif': [...defaultTheme.fontFamily.serif],
      'mono': [...defaultTheme.fontFamily.mono]
    },
    extend: {
      height: {
        topbar: '85px',
        dashContent: 'calc(100vh - 85px)'
      }
    }

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
