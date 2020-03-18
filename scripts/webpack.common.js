const path = require('path');

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, '../tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
              importLoaders: 0,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
