const { merge } = require('webpack-merge')
const dotenv = require('dotenv').config()
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new BrowserSyncPlugin({
      proxy: process.env.BROWSERSYNC_PROXY_URL,
      files: [
        'src/**/*.php',
        'src/css/*.css',
        'src/skins/**/*.php',
        'src/skins/**/*.css',
        '!src/vendor'
      ]
    })
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
})
