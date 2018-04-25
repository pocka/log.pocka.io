const path = require('path')
const readline = require('readline')

const fs = require('mz/fs')

const moment = require('moment')

const { buildCSS, removeUnusedCSS } = require('./buildCSS')
const { buildPlainHTML, buildHTML } = require('./buildHTML')

const destDir = path.resolve(__dirname, '../../src/static/amp')

const { stdin, stdout } = process

const rl = readline.createInterface({
  input: stdin,
  output: stdout
})

let posts = []

rl.on('line', line => {
  posts.push(line)
})

rl.on('close', async () => {
  const css = await buildCSS()

  await Promise.all(
    posts.map(async line => {
      const json = JSON.parse(line)

      const post = Object.assign({}, json, {
        createdAt: moment(new Date(json.createdAt)).format('YYYY/MM/DD'),
        updatedAt: moment(new Date(json.updatedAt)).format('YYYY/MM/DD')
      })

      const minCSS = await removeUnusedCSS(css, buildPlainHTML(post))

      const html = buildHTML(post, minCSS)

      const destPath = path.resolve(destDir, `${post.name}.html`)

      return fs.writeFile(destPath, html)
    })
  )

  rl.close()
})
