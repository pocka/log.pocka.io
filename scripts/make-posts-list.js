const readline = require('readline')
const removeMarkdown = require('remove-markdown')

const getMeta = require('./get-meta')


const {stdin, stdout} = process

const SUMMARY_LENGTH = 50

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
})

let files = []

rl.on('line', line => {
  files.push(line)
})

rl.on('close', () => {
  const posts = files.map(file => {
    const meta = getMeta(file)

    const plainContent = removeMarkdown(meta.__content).replace(/\n/g, ' ')

    const summary = (plainContent.length > SUMMARY_LENGTH)
      ? plainContent.slice(0, SUMMARY_LENGTH) + '...'
      : plainContent

    return Object.assign({}, meta, {
      __content: undefined,
      summary,
    })
  })

  const tags = posts
    .map(post => post.tags || [])
    .reduce((a, b) => a.concat(b), [])
    .filter((value, index, self) => self.indexOf(value) === index)

  const list = {
    posts, tags,
  }

  stdout.write(JSON.stringify(list) + '\n')
})
