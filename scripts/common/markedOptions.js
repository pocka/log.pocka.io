const {highlight, highlightAuto} = require('highlight.js')
const marked = require('marked')

let mdRenderer = new marked.Renderer()
mdRenderer.heading = (text, level) => `<h${level + 1}>${text}</h${level + 1}>`
mdRenderer.link = (href, title, text) => href.match(/^(https?:\/\/|\/\/)/)
  ? `<a href="${href}" title="${title || ''}" target="_blank" rel="noopener">${text}</a>`
  : `<a href="${href}" title="${title || ''}" data-vue-router-link>${text}</a>`

module.exports = {
  gfm: true,
  table: true,
  breaks: true,
  highlight(code, lang) {
    return lang ? highlight(lang, code).value : highlightAuto(code).value
  },
  renderer: mdRenderer
}
