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
      colors: {
        jsBrown1: '#987631',
        jsBlue1: '#2c308a',
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
