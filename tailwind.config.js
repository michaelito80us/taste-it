/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        tst: {
          bg: 'whitesmoke',
        },
        pri: '#413A55',
        sec: '#749A8D',
        ter: '#C94277',
      },
      fontFamily: {
        tst: ['var(--font-raleway)', ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
