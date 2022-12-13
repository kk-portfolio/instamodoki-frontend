// const defaultTheme = require('tailwindcss/defaultTheme');

// module.exports = {
//   mode: 'jit',
//   purge: ['./src/**/*.{js,jsx,ts,tsx}', '.index.html'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Inter var', ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [require('@tailwindcss/typography')],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
