/**
 * @Author: Echo
 * @Date:   2017-06-26T17:16:32+08:00
 * @Last modified by:   Echo
 * @Last modified time: 2017-06-26T18:59:15+08:00
 */

var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js']
  },
  output: {
    path: './dist',
    filename: 'js/[name].js' // [name]按原输入名打包
  },
  externals: { // 引入外部依赖
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    new ExtractTextPlugin('css/[name].css')
  ]
}

module.exports = config
