const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: path.resolve(__dirname, '../'),
    filename: 'index.js',
    library: ['qier-moving-notify'],
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  context: path.resolve(__dirname, '..'),
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
        umd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
        umd: 'react-dom',
      },
    },
  ],
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBar({
      name: 'qier-moving-notify',
      // react 蓝
      color: '#1890ff',
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
});
