const webpack = require('webpack')

const babelOptions = {
  presets: [['env', {
    targets: {
      browsers: 'last 2 versions'
    },
    modules: false
  }]]
}

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
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
          loaders: {
            js: {
              loader: 'babel-loader',
              options: babelOptions
            }
          }
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        }
      }
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
