const path = require('path')

const withTs = require('@zeit/next-typescript')

module.exports = withTs({
  webpack(config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, './src')
    }

    return config
  }
})
