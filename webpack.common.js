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
    ...glob.sync('./src/skins/**/js/index.js', { dotRelative: true }).reduce((acc, path) => {
        let entry = path.replace('./src/skins/', '../../skins/')
        entry = entry.replace('/js/index.js', '/assets/index')
        acc[entry] = path
        return acc
    }, {})
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/assets/js'),
    chunkFilename: '[name].[chunkhash:8].js',
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
        exclude: /build/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: { url: false }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /build/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
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
            filename: '[name][ext]',
            emit: false
          }
      },
      {
          test: /\.source\.[a-z]{2,4}$/,
          exclude: /node_modules|build/,
          type: 'asset/source',
          generator: {
            filename: '../[name][ext]',
            emit: false
          }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: path => path.chunk.name.indexOf('/js/') !== -1 ?
        path.chunk.name.replace('/js/', '/css/') + '.css' :
        '../css/[name].css',
      chunkFilename: path => path.chunk.name && path.chunk.name.indexOf('/js/') !== -1 ?
        path.chunk.name.replace('/js/', '/css/') + '.css' :
        '../css/[name].[chunkhash:8].css'
    })
  ]
}