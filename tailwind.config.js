const twUtilCss = require('./src/styles/twUtilCss')

module.exports = {
  mode: 'jit',
  dark: false,
  purge: [
    // Your CSS will rebuild any time *any* file in `src` changes
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        electric: '#db00ff',
        ribbon: '#0047ff',
      },
    },
  },
  plugins: [
    function({ addUtilities, addComponents, e, prefix, config }) {

      addUtilities(twUtilCss);

    }
  ],
}