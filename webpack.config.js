var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
  entry: [
    './src/assets/less/style.less',
    './src/main.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: "bundle.js"
  },
  debug: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?$!expose-loader?jQuery'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style?minimize", "css!autoprefixer!less")
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'file?hash=sha512&digest=hex&name=img/[hash].[ext]'
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new ExtractTextPlugin("[name].css", {allChunks: true})
    /*
    new webpack.optimize.UglifyJsPlugin({
       compressor: { warnings: false }
   })
   */
  ]
}
