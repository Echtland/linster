var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname + "/_js",
  entry: "./entry",
  output: {
    path: __dirname + "/js",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.BannerPlugin("---\n---\n\n", { raw: true }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.css', 'config.js'],
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|_vendor)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, "./node_modules/foundation-sites/scss/")]
  }
}
