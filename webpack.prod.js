const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: false, // 'source-map'
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js'
    }
  }
})
