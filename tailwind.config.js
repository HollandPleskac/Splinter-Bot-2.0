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
        topbar: '70px',
        dashContent: 'calc(100vh - 85px)'
      },
      backgroundColor: {
        modal: 'rgba(0,0,0,0.2)'
      },
      fontSize: {
        landingPageTitle: '2.5rem'
      }
    }

  },
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
      borderColor: ['group-focus'],
    },
  },
  plugins: [],
}
