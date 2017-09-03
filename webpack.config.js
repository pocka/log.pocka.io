const webpack = require('webpack')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/public`,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postLoaders: {
            js: 'babel-loader?presets=es2015',
          }
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?presets=es2015',
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: 'sass-loader',
      },
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: 'public',
  },
  performance: {
    hints: false,
  },
  devtool: process.NODE_ENV === 'development' ? '#eval-source-map' : false,
}
