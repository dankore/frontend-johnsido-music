const PurgeCss = require('@fullhuman/postcss-purgecss');
const PurgeOptions = {
  // SPECIFY PATH THAT CONTAINS CSS
  content: ['./app/**/*.html', './app/**/*.js'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
};
const DEV = process.env.npm_lifecycle_event !== 'build';

module.exports = {
  plugins: [
    //
    require('tailwindcss'),
    require('autoprefixer'),
    DEV ? false : PurgeCss(PurgeOptions),
    //
  ].filter(Boolean),
};
