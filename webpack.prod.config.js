const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => ({
  devtool: 'source-map',
  performance: {
    hints: 'warning'
  },
  output: {
    filename: 'scripts/[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'client', 'src', 'dist'),
    chunkFilename: 'scripts/[name].bundle.js'
  },
  stats: {
    colors: true,
    chunkModules: false,
    errors: true,
    warnings: true,
    performance: true,
    timings: true,
    children: false,
    modules: false,
    excludeAssets: /\.map/,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                minimize: {
                  preset: ['default', {
                    discardComments: {
                      removeAll: true
                    }
                  }]
                }
              }
            },
            'sass-loader',
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: path.resolve(__dirname, 'client', 'src', 'index.ejs')
    }),
    new ExtractTextPlugin({
      allChunks: true,
      ignoreOrder: true,
      filename: '[name].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module =>
        module.context && module.context.indexOf('node_modules') !== -1,
    }),
    // CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest', // But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: {
        filename: 'out.js',
        url: 'out.js.map',
      },
      parallel: {
        cache: true,
        workers: 2,
      },
      uglifyOptions: {
        compress: {
          dead_code: true,
          drop_debugger: true,
          loops: true,
          unused: true,
          drop_console: true,
          evaluate: true,
          conditionals: true,
        },
        warnings: false,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: 'data/testdata.json',
        to: 'data',
        context: path.resolve(__dirname, 'client', 'src')
      },
    ], { copyUnmodified: true }),
  ]
});
