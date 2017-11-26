const path = require('path')
const readline = require('readline')

const fs = require('mz/fs')

const moment = require('moment')

const { buildCSS, removeUnusedCSS } = require('./buildCSS')
const { buildPlainHTML, buildHTML } = require('./buildHTML')

const destDir = path.resolve(__dirname, '../../public/amp')

const {stdin, stdout} = process

const rl = readline.createInterface({
  input: stdin,
  output: stdout
})

let jsonFiles = []

rl.on('line', line => {
  jsonFiles.push(line)
})

rl.on('close', async () => {
  const css = await buildCSS()

  rl.close()

  await Promise.all(jsonFiles.map(async file => {
    const json = require(path.resolve(__dirname, '../../', file))

    const post = Object.assign({}, json, {
      createdAt: moment(new Date(json.createdAt)).format('YYYY/MM/DD'),
      updatedAt: moment(new Date(json.updatedAt)).format('YYYY/MM/DD')
    })

    const minCSS = await removeUnusedCSS(css, buildPlainHTML(post))

    const html = buildHTML(post, minCSS)

    const destPath = path.resolve(destDir, path.basename(file).replace(/\.json$/, '.html'))

    return fs.writeFile(destPath, html)
  }))
})
