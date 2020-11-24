const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: colors.gray[700],
          dark: '#ffffff',
        },
        primary: {
          DEFAULT: '#1fb6ff',
          dark: '#ffffff',
        },
        highlight: {
          DEFAULT: colors.red[700],
          dark: colors.violet[800],
        },
        'highlight-background': {
          DEFAULT: colors.yellow[400],
          dark: '#1fb6ff',
        }
      }
    }
  }
}
