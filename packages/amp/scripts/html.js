const fs = require('fs')
const path = require('path')

const cheerio = require('cheerio')
const sizeOf = require('image-size')

const { minify } = require('./css')

const template = path.resolve(__dirname, '../src/template.pug')
const imagesDir = path.resolve(__dirname, '../../../images')
const imagesDist = path.resolve(__dirname, '../dist/images')

/**
 * Lazy pug renderer
 */
const pug = {
  /** @private */
  _renderer: null,
  get render() {
    if (!pug._renderer) {
      pug._renderer = require('pug').compileFile(template)
    }

    return pug._renderer
  }
}

exports.build = async (post, css) => {
  const html = pug.render({
    post,
    gaTrackingId: process.env.GA_TRACKING_ID
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
    img.attr('src', `./images/${filename}`)
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

  const minifiedCss = await minify(css, $.html())

  $('head').append(`<style amp-custom>${minifiedCss}</style>`)

  return $.html()
}

const getSizeOf = image => {
  const imagePath = path.resolve(imagesDir, image.replace(/^\//, './'))

  return sizeOf(imagePath)
}

const copyImage = filename => {
  const srcPath = path.resolve(imagesDir, filename)

  const destPath = path.resolve(imagesDist, filename)

  fs.copyFile(srcPath, destPath, () => void 0)
}
