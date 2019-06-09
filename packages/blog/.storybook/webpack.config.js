const path = require('path')

const project = require('../webpack.config').client

module.exports = ({ config }) => {
  config.module.rules = project.module.rules

  return config
}
