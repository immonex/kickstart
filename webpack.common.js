const glob = require('glob')
const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    ...{
        frontend: './src/js/frontend.js',
        backend: './src/js/backend.js'
    },
    ...glob.sync('./src/skins/**/js/src/index.js', { dotRelative: true }).reduce((acc, path) => {
        let entry = path.replace('./src/skins/', '../../skins/')
        entry = entry.replace('/js/src/index.js', '/js/index')
        acc[entry] = path
        return acc
    }, {})
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/assets/js')
  },
  resolve: {
    fallback: {
      'fs': false,
      'buffer': false,
      'http': false,
      'https': false,
      'url': false
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules|build/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules|build/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules|build/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
          test: /\.(woff(2)?|ttf|eot)$/,
          exclude: /node_modules|build/,
          type: 'asset/resource',
          generator: {
              filename: '[name][ext]'
          },
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: path => path.chunk.name.indexOf('/js/') !== -1 ?
        path.chunk.name.replace('/js/', '/css/') + '.css' :
        '../css/[name].css'
    })
  ]
}
