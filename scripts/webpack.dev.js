const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './example/App.tsx',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    port: 9000,
    compress: true,
    hot: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: 'example/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
