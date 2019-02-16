const { promises: fsp, ...fs } = require('fs')
const path = require('path')

const md2json = require('./md2json')

////////////////////////

const jsonModule = json => `module.exports=${JSON.stringify(json)}`

const build = async () => {
  const buildDir = path.resolve(__dirname, '../build')
  const postsDir = path.resolve(buildDir, 'posts')
  const srcDir = path.resolve(__dirname, '../../../posts')

  const files = await fsp.readdir(srcDir, {
    withFileTypes: true
  })

  const mdFiles = files.filter(file => file.isFile() && /\.md$/.test(file.name))

  const list = await Promise.all(
    mdFiles.map(file => md2json(path.resolve(srcDir, file.name)))
  )

  await fsp.writeFile(
    path.resolve(buildDir, 'list.js'),
    jsonModule(
      list.map(info => Object.assign({}, info, { __content: undefined }))
    )
  )

  await Promise.all(
    list.map(info =>
      fsp.writeFile(path.resolve(postsDir, info.name + '.js'), jsonModule(info))
    )
  )
}

build()
