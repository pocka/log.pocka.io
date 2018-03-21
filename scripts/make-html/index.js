const path = require('path')
const readline = require('readline')

const fs = require('mz/fs')

const moment = require('moment')

const { buildHTML } = require('./buildHTML')

const destDir = path.resolve(__dirname, '../../public')

const { stdin, stdout } = process

const rl = readline.createInterface({
  input: stdin,
  output: stdout
})

let jsonFiles = []

rl.on('line', line => {
  jsonFiles.push(line)
})

rl.on('close', async () => {
  rl.close()

  // 記事HTMLの作成
  await Promise.all(
    jsonFiles.map(async file => {
      const json = require(path.resolve(__dirname, '../../', file))

      const post = Object.assign({}, json, {
        createdAt: moment(new Date(json.createdAt)).format('YYYY/MM/DD'),
        updatedAt: moment(new Date(json.updatedAt)).format('YYYY/MM/DD')
      })

      const html = buildHTML(post)

      const destPath = path.resolve(
        destDir,
        'posts',
        path.basename(file).replace(/\.json$/, '.html')
      )

      return fs.writeFile(destPath, html)
    })
  )

  // index.htmlの作成
  const html = buildHTML()

  const savePath = path.resolve(destDir, 'index.html')

  await fs.writeFile(savePath, html)
})
