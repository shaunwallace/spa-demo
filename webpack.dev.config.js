const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  devtool: 'eval-cheap-module-source-map',
  stats: {
    colors: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: false,
    children: false, // listing all children is very noisy in AOT and hides warnings/errors
    modules: false,
    reasons: false,
    warnings: true,
    assets: false, // listing all assets is very noisy when using assets directories
    version: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: path.resolve(__dirname, 'client', 'src', 'index.ejs')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});
