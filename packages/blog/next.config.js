const path = require('path')

const withTs = require('@zeit/next-typescript')
const withAnalyze = require('@zeit/next-bundle-analyzer')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins(
  [
    withTs,
    [
      withAnalyze,
      {
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(
          process.env.BUNDLE_ANALYZE
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: 'static',
            reportFilename: '../server.html'
          },
          browser: {
            analyzerMode: 'static',
            reportFilename: './client.html'
          }
        }
      }
    ]
  ],
  {
    webpack(config, options) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '~': path.resolve(__dirname, './src')
      }

      return config
    }
  }
)
