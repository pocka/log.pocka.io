const { highlight, highlightAuto } = require('highlight.js')
const marked = require('marked')

const mdRenderer = new marked.Renderer()

mdRenderer.heading = (text, level, raw, slugger) => {
  const id = slugger.slug(text)
  const lv = level + 1

  return (
    `<h${lv} id="${id}">` +
    `<a href="#${id}" data-hash-link>#</a>` +
    `<span>${text}</span>` +
    `</h${lv}>`
  )
}
mdRenderer.link = (href, title, text) =>
  href.match(/^(https?:\/\/|\/\/)/)
    ? `<a href="${href}" title="${title ||
        ''}" target="_blank" rel="noopener">${text}</a>`
    : `<a href="${href}" title="${title ||
        ''}" data-vue-router-link>${text}</a>`

const options = {
  gfm: true,
  table: true,
  breaks: true,
  highlight(code, lang) {
    return lang ? highlight(lang, code).value : highlightAuto(code).value
  },
  renderer: mdRenderer
}

module.exports = md => {
  return marked(md, options)
}
