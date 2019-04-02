const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const PATHS = require('./PATHS');
require('dotenv').config();

const production = merge(
  {
    plugins: [parts.extractLess],
  },
  parts.buildSetup('production'),
  parts.setMode('production'),
  parts.sourceMaps('source-map'),
  parts.styleLoader({
    use: parts.extractLess.extract({
      use: [
        {
          loader: 'css-loader',
          options: { minimize: true },
        },
        {
          loader: 'less-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: PATHS.POSTCSS,
            },
          },
        },
      ],
      fallback: 'style-loader',
    }),
  }),
);

module.exports = production;
