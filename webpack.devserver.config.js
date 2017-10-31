const webpack = require('webpack');
const path = require('path');

module.exports = () => ({
  devServer: {
    contentBase: path.join(__dirname, 'client', 'src'),
    historyApiFallback: true,
    open: true,
    clientLogLevel: 'warning',
    watchContentBase: true,
    quiet: false,
    compress: true,
    port: 9001,
    host: '0.0.0.0',
    hot: true,
    inline: true,
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/' // remove base path
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
