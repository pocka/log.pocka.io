const readline = require('readline')
const marked = require('marked')
const {loadFront} = require('yaml-front-matter')
const {highlight, highlightAuto} = require('highlight.js')

const getMeta = require('./get-meta')


const {stdin, stdout} = process

// Modify markup building process
let mdRenderer = new marked.Renderer()
mdRenderer.heading = (text, level) => `<h${level + 1}>${text}</h${level + 1}>`
mdRenderer.link = (href, title, text) => href.match(/^(https?:\/\/|\/\/)/)
  ? `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`
  : `<a href="${href}" title="${title || ''}" data-vue-router-link>${text}</a>`

// Markdown parsing configuration
const mdOpts = {
  gfm: true,
  table: true,
  breaks: true,
  highlight(code, lang) {
    return lang ? highlight(lang, code).value : highlightAuto(code).value
  },
  renderer: mdRenderer,
}

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
})

rl.on('line', file => {
  const meta = getMeta(file)

  const postData = Object.assign({}, meta, {
    __content: marked(meta.__content, mdOpts),
  })

  stdout.write(JSON.stringify(postData))

  rl.close()
})
