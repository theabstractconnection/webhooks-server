const {
  addBabelPlugin,
  addDecoratorsLegacy,
  addPostcssPlugins,
  disableEsLint,
  override,
  overrideDevServer,
  watchAll,
} = require('customize-cra')

const webpack = require('webpack')

module.exports = {
  webpack: override(
    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),

    // disable eslint in webpack
    disableEsLint(),
    addBabelPlugin([
      'tailwind-components',
      {
        config: './src/tailwind.config.js',
        format: 'auto',
      },
    ]),
    addPostcssPlugins([
      require('postcss-import')({
        plugins: [require('stylelint')],
      }),
      require('tailwindcss')('./src/tailwind.config.js'),
      require('postcss-preset-env')({
        autoprefixer: { grid: true },
        features: {
          'nesting-rules': true,
        },
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
      }),
    ])
  ),
  devServer: overrideDevServer(watchAll()),
}
