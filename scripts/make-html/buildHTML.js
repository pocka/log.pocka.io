const path = require('path')

const pug = require('pug')

const template = path.resolve(__dirname, '../../src/html/index.pug')
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
exports.buildHTML = post => {
  return renderer.render({ post })
}
