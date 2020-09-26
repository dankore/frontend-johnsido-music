module.exports = {
  purge: {
    mode: 'all',
    content: ['./app/**/*.js', './app/**/*.jsx'],
  },
  theme: {
    extend: {
      spacing: {
        '72': '18.75rem',
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
