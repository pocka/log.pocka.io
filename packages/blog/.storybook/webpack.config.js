const path = require('path')

const project = require('../webpack.config')

module.exports = ({ config }) => {
  config.module.rules = project.module.rules

  config.resolve.extensions.push('.ts')

  config.resolve.alias['~'] = path.resolve(__dirname, '../src')

  // Workaround for SB core-js issue (#6204)
  delete config.resolve.alias['core-js']

  config.resolve.extensions = project.resolve.extensions

  return config
}
