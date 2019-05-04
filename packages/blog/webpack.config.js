const path = require('path')

const ImageminPlugin = require('imagemin-webpack-plugin').default

const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin')
const StyleExtHtmlPlugin = require('style-ext-html-webpack-plugin')

const pkg = require('./package.json')

const paths = ['/', '/posts/', '/about/', '/tags/']

module.exports = {
  entry: {
    index: './src/index.ts',
    components: './src/bootstrap/components.ts',
    misc: './src/bootstrap/misc.ts'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        exclude: [/\/node_modules\//, /\.html$/, /\.json$/],
        oneOf: [
          {
            test: /\.(m?js|ts)$/,
            use: [
              { loader: 'babel-loader', options: pkg.babel },
              'uglify-template-string-loader'
            ]
          },
          {
            test: /\.pcss$/,
            resourceQuery: /critical/,
            use: [
              { loader: MiniCssExtractPlugin.loader },
              'css-loader',
              'postcss-loader'
            ]
          },
          {
            test: /\.pcss$/,
            resourceQuery: /inline/,
            use: ['raw-loader', 'postcss-loader']
          },
          {
            test: /\.pcss$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { modules: true } },
              'postcss-loader'
            ]
          },
          {
            test: /\.svg$/,
            use: ['svg-inline-loader?idPrefix&removeSVGTagAttrs=false']
          },
          {
            test: /README\.md$/,
            loader: 'raw-loader'
          },
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-source-map',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.mjs', '.ts', '.pcss']
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new ImageminPlugin({
      optipng: {
        optimazationLevel: 5
      },
      svgo: {
        plugins: [
          { cleanupAttrs: true },
          { inlineStyles: true },
          { removeXMLProcInst: true },
          { removeComments: true },
          { removeMetadata: true },
          { removeTitle: true },
          { removeDesc: true },
          { removeUselessDefs: true },
          { removeXMLNS: true },
          { removeEditorNSData: true },
          { removeEmptyAttrs: true },
          { removeEmptyContainers: true },
          { minifyStyles: true },
          { convertPathData: true },
          { convertTransform: true },
          { removeUnknownsAndDefaults: true },
          { cleanupIDs: true },
          { moveElemsAttrsToGroup: true },
          { collapseGroups: true },
          {
            removeAttrs: {
              attrs: ['data-.*', 'class']
            }
          }
        ]
      }
    }),
    new MiniCssExtractPlugin(),
    ...paths.map(
      p =>
        new HtmlPlugin({
          template:
            process.env.NODE_ENV === 'production'
              ? `!prerender-loader?${JSON.stringify({
                  string: true,
                  documentUrl: 'http://localhost' + p
                })}!./src/index.html`
              : './src/index.html',
          filename: path.resolve(__dirname, `./dist${p}/index.html`),
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          },
          inject: 'head'
        })
    ),
    new StyleExtHtmlPlugin(),
    new ScriptExtHtmlPlugin({
      defaultAttribute: 'async',
      defer: /index\..*\.js/
    })
  ]
}
