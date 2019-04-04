const projectConfig = require('../webpack/webpack.config')

module.exports = ({ config }) => {
  config.module.rules = projectConfig.module.rules
  config.resolve = projectConfig.resolve

  return config
}
