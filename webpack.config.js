const webpack = require('webpack')
const BabelWebpackPlugin = require('babel-webpack-plugin')

module.exports = {
  entry: ['whatwg-fetch', './src/index.js'],
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
            js: 'babel-loader?presets=es2015', // If omit this, UglifyJS in production build would fail.
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
  plugins: process.env.NODE_ENV === 'production'
    ? [new BabelWebpackPlugin({
      test: /\.js$/,
      presets: ['es2015'],
      sourceMaps: false,
      compact: false,
    })]
    : [],
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
