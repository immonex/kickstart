const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: false, // 'source-map'
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
      new CssMinimizerPlugin()
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js'
    }
  }
})