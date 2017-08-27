const readline = require('readline')
const marked = require('marked')
const {loadFront} = require('yaml-front-matter')
const {highlight, highlightAuto} = require('highlight.js')

const getMeta = require('./get-meta')


const {stdin, stdout} = process

// Markdown parsing configuration
const mdOpts = {
  gfm: true,
  table: true,
  breaks: true,
  highlight(code, lang) {
    return lang ? highlight(lang, code).value : highlightAuto(code).value
  },
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