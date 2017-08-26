const marked = require('marked')
const {loadFront} = require('yaml-front-matter')
const {highlight} = require('highlight.js')

const {stdin, stdout} = process


/**
 * Custom error (Just overriding toString).
 */
class CmdError extends Error {
  toString() {
    return `[md2json.js] ${this.message}`
  }
}

// Markdown parsing configuration
marked.setOptions({
  gfm: true,
  table: true,
  breaks: true,
  highlight(code, lang) {
    return highlight(lang, code).value
  },
})

let input = ''

stdin.on('data', chunk => {
  input += chunk
})

stdin.on('end', () => {
  const frontMatter = loadFront(input)

  const result = Object.assign({}, frontMatter, {
    __content: marked(frontMatter.__content),
  })

  stdout.write(JSON.stringify(result))
})
