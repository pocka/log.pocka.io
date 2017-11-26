const readline = require('readline')
const marked = require('marked')
const {loadFront} = require('yaml-front-matter')

const mdOpts = require('./common/markedOptions')
const getMeta = require('./get-meta')


const {stdin, stdout} = process

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
