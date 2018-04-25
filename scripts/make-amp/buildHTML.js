const fs = require('fs')
const path = require('path')

const cheerio = require('cheerio')
const sizeOf = require('image-size')
const pug = require('pug')

const template = path.resolve(__dirname, '../../src/amp/template.pug')
const imagesDir = path.resolve(__dirname, '../../src/assets/images/')
const ampImagesDir = path.resolve(__dirname, '../../src/static/amp/images/')

/**
 * Lazy pug renderer
 */
const renderer = {
  _renderer: null,
  get render() {
    if (!renderer._renderer) {
      renderer._renderer = pug.compileFile(template)
    }

    return renderer._renderer
  }
}

/**
 * @param {object} post
 * @returns {string} HTML
 */
exports.buildPlainHTML = post => {
  return renderer.render({
    post,
    nojs: true // uncss実行時にJSを評価させない(速度目的)
  })
}

/**
 * @param {object} post
 * @param {string} css
 * @returns {string} HTML
 */
exports.buildHTML = (post, css) => {
  const html = renderer.render({
    post,
    css
  })

  const $ = cheerio.load(html)

  $('img').each((_, el) => {
    el.tagName = 'amp-img'

    const img = $(el)
    img.attr('layout', 'responsive')

    const filename = path.basename(img.attr('src'))

    const size = getSizeOf(filename)

    copyImage(filename)

    img.attr('width', size.width)
    img.attr('height', size.height)
    img.attr('src', `/amp/images/${filename}`)
  })

  $('.youtube').each((_, el) => {
    const iframe = $(el).find('iframe')

    const width = iframe.attr('width')
    const height = iframe.attr('height')
    const src = iframe.attr('src')

    const videoId = src.split(/[\/]/).reverse()[0]

    $(el).replaceWith(
      $(
        `<amp-youtube layout="responsive" data-videoid="${videoId}" width="${width}" height="${height}"></amp-youtube>`
      )
    )
  })

  if ($('amp-youtube').length === 0) {
    $('script[custom-element="amp-youtube"]').remove()
  }

  $('iframe').each((_, el) => {
    console.warn(`Dropping iframe: ${$(el).html()}`)

    $(el).remove()
  })

  return $.html()
}

const getSizeOf = image => {
  const imagePath = path.resolve(imagesDir, image.replace(/^\//, './'))

  return sizeOf(imagePath)
}

const copyImage = filename => {
  const srcPath = path.resolve(imagesDir, filename)

  const destPath = path.resolve(ampImagesDir, filename)

  fs.copyFile(srcPath, destPath, () => void 0)
}
