const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const twUtilCss = require('./src/styles/twUtilCss')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  important: false,
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        stone: colors.stone,
        slate: colors.slate,
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents, e, config  }) => {
      addUtilities(twUtilCss);
    }),
  ],
}