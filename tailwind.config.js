/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/preline/preline.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E16A54',
          dark: '#ad5040',
        },
        secondary: {
          DEFAULT: '#7C444F',
          dark: '#3b2126'
        },
        neutral: {
          light: '#fffafa',
          DEFAULT: '#FFF1F1',
          dark: '#d9cccc',
        },
        danger: {
          DEFAULT: '#dd3c3c',
          dark: '#b21f1f',
        },
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    require('@tailwindcss/forms'),
  ],
}