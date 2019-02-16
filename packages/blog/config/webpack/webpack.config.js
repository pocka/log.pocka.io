const path = require('path')

const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const StyleExtHtmlPlugin = require('style-ext-html-webpack-plugin')

const sass = require('sass')

const pkg = require('../../package.json')

const sassLoaderOptions = {
  implementation: sass
}

const paths = [
  { path: '/' },
  { path: '/about/' },
  { path: '/posts/' },
  ...require('@log.pocka.io/posts').map(post => ({
    path: `/posts/${post.name}/`,
    lastMod: post.updatedAt
  }))
]

module.exports = {
  entry: {
    'main.defer': path.resolve(__dirname, '../../src/main.ts')
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(m?js|ts)$/,
        exclude: /\/node_modules\//,
        use: [
          {
            loader: 'babel-loader',
            options: pkg.babel
          },
          'uglify-template-string-loader'
        ]
      },
      {
        test: /\.scss$/,
        oneOf: [
          {
            resourceQuery: /inject/,
            use: [
              { loader: MiniCssExtractPlugin.loader },
              'css-loader',
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: sassLoaderOptions
              }
            ]
          },
          {
            use: [
              'raw-loader',
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: sassLoaderOptions
              }
            ]
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: '../../dist'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-source-map',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../../src')
    },
    extensions: ['.js', '.mjs', '.ts']
  },
  plugins: [
    new SitemapPlugin(process.env.HOST_NAME || 'https://log.pocka.io', paths),
    new MiniCssExtractPlugin(),
    ...paths
      .map(p => p.path)
      .map(
        p =>
          new HtmlPlugin({
            template:
              process.env.NODE_ENV === 'production'
                ? `!!prerender-loader?${JSON.stringify({
                    string: true,
                    documentUrl: 'http://localhost' + p
                  })}!./src/index.html`
                : './src/index.html',
            filename: path.resolve(__dirname, `../../dist${p}/index.html`),
            minify: {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true
            },
            inject: 'head'
          })
      ),
    new StyleExtHtmlPlugin(),
    new ScriptExtHtmlPlugin({
      defaultAttribute: 'async',
      defer: /\.defer\..+\.js$/
    }),
    new ForkTsCheckerPlugin()
  ]
}
