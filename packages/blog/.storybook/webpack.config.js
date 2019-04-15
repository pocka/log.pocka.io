const path = require('path')

const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    loader: 'babel-loader',
    options: require('../package.json').babel
  })

  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.alias['~'] = path.resolve(__dirname, '../src')

  config.plugins.push(new ForkTsCheckerPlugin())

  return config
}
