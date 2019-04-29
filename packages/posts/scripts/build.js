const { promises: fsp, ...fs } = require('fs')
const path = require('path')

const md2json = require('./md2json')

////////////////////////

const jsonModule = json => `module.exports=${JSON.stringify(json)}`

const build = async () => {
  const buildDir = path.resolve(__dirname, '../build')
  const postsDir = path.resolve(buildDir, 'posts')
  const srcDir = path.resolve(__dirname, '../../../posts')

  const files = await fsp.readdir(srcDir)

  const mdFiles = files.filter(
    file =>
      fs.statSync(path.resolve(srcDir, file)).isFile() && /\.md$/.test(file)
  )

  const list = await Promise.all(
    mdFiles.map(file => md2json(path.resolve(srcDir, file)))
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

build().catch(err => {
  console.error(err)

  return process.exit(1)
})
