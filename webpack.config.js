const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const developmentConfig = require('./webpack.dev.config.js');
const devServerConfig = require('./webpack.devserver.config');

function mergeConfigs(config) {
  return merge.smartStrategy({
    entry: 'append',
    output: 'replace',
    plugins: 'append',
    'module.rules': 'append',
  })({
    stats: 'normal',
    context: path.resolve(__dirname, 'client', 'src'),
    target: 'web',
    output: {
      filename: 'scripts/[name].bundle.js',
      path: path.resolve(__dirname, 'client', 'src', 'dist'),
      chunkFilename: 'scripts/[name].bundle.js'
    },
    entry: {
      main: ['./index.js']
    },
    resolve: {
      modules: [
        'node_modules'
      ],
      extensions: ['*', '.js', '.jsx', '.json'],
      alias: {
        Containers: path.resolve(__dirname, 'client', 'src', 'containers'),
        Reducers: path.resolve(__dirname, 'client', 'src', 'reducers'),
        Stores: path.resolve(__dirname, 'client', 'src', 'stores'),
        Components: path.resolve(__dirname, 'client', 'src', 'components'),
        Config: path.resolve(__dirname, 'client', 'src', 'config'),
        Actions: path.resolve(__dirname, 'client', 'src', 'actions'),
        Utils: path.resolve(__dirname, 'client', 'src', 'utils')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          // Use the include field to only apply the loader modules that
          // actually need to be transformed by it
          include: [
            path.resolve(__dirname, 'client', 'src')
          ],
          use: ['babel-loader']
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100000,
                name: './fonts/[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(gif|jpg|jpe?g|png)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: './img/[name].[ext]?[hash]',
              limit: 100000
            }
          }]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['client/src/dist'])
    ]
  }, config);
}

function getEnvironmentalConfig(env) {
  if (!env || env.development || env.test) {
    return developmentConfig();
  } else if (env.production) {
    return productionConfig();
  }

  return merge(developmentConfig(), devServerConfig());
}

function getEnvironment(env) {
  if (!env || env.development) {
    return 'development';
  } else if (env.production) {
    return 'production';
  } else if (env.test) {
    return 'test';
  }

  return 'development';
}

module.exports = env => mergeConfigs(getEnvironmentalConfig(env));
