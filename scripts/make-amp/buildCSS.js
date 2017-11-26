const path = require('path')

const fs = require('mz/fs')

const postcss = require('postcss')
const cssnano = require('cssnano')
const postcssAMP = require('postcss-amp')
const uncss = require('postcss-uncss')

const cssPath = path.resolve(__dirname, '../../src/amp/style.css')
const bulmaCSS = path.resolve(__dirname, '../../node_modules/bulma/css/bulma.css')
const hljsCSS = path.resolve(__dirname, '../../node_modules/highlight.js/styles/monokai-sublime.css')

/**
 * @returns {Promise<string>} CSS content
 */
exports.buildCSS = async () => {
  const cssFiles = await Promise.all([
    fs.readFile(hljsCSS),
    fs.readFile(bulmaCSS),
    fs.readFile(cssPath)
  ])

  const css = cssFiles.join('').replace(/[\r\n]/g, '')

  return (await postcss([
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true
        }
      }]
    }),
    postcssAMP
  ]).process(css)).css
}

/**
 * @param {string} css Source css content
 * @param {string} html HTML content
 * @returns {Promise<string>} CSS content
 */
exports.removeUnusedCSS = async (css, html) => {
  return (await postcss([
    uncss({
      html,
      ignore: [/^amp-|[\s>+~]amp-/]
    })
  ]).process(css)).css
}
