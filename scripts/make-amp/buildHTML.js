const path = require('path')

const cheerio = require('cheerio')
const sizeOf = require('image-size')
const pug = require('pug')

const template = path.resolve(__dirname, '../../src/amp/template.pug')
const publicDir = path.resolve(__dirname, '../../public/')

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
    post, css
  })

  const $ = cheerio.load(html)

  $('img').each((_, el) => {
    el.tagName = 'amp-img'

    const img = $(el)
    img.attr('layout', 'responsive')

    const size = getSizeOf(img.attr('src'))

    img.attr('width', size.width)
    img.attr('height', size.height)
  })

  $('.youtube').each((_, el) => {
    const iframe = $(el).find('iframe')

    const width = iframe.attr('width')
    const height = iframe.attr('height')
    const src = iframe.attr('src')

    const videoId = src.split(/[\/]/).reverse()[0]

    $(el).replaceWith(
      $(`<amp-youtube layout="responsive" data-videoid="${videoId}" width="${width}" height="${height}"></amp-youtube>`)
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
  const imagePath = path.resolve(publicDir, image.replace(/^\//, './'))

  return sizeOf(imagePath)
}
