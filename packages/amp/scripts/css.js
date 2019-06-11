const path = require('path')

const fs = require('fs').promises

const postcss = require('postcss')
const cssnano = require('cssnano')
const postcssAmp = require('postcss-amp')
const uncss = require('postcss-uncss')

const siteCss = path.resolve(__dirname, '../src/style.css')
const hljsCss = require.resolve('highlight.js/styles/monokai-sublime.css')

exports.build = async () => {
  const files = await Promise.all([
    fs.readFile(siteCss, { encoding: 'utf-8' }),
    fs.readFile(hljsCss, { encoding: 'utf-8' })
  ]).catch(err => console.error(err))

  const styles = files.join('').replace(/[\r\n]/g, '')

  return (await postcss([
    cssnano({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    }),
    postcssAmp
  ]).process(styles)).css
}

exports.minify = async (css, html) => {
  return (await postcss([uncss({ html })]).process(css)).css
}
