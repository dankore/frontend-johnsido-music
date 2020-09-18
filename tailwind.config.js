module.exports = {
  purge: {
    mode: 'all',
    content: ['./app/**/*.js', './app/**/*.jsx'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
