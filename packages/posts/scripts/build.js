const { createHash } = require('crypto')
const { promises: fsp, ...fs } = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

const md2json = require('./md2json')

////////////////////////

const jsonModule = json => `module.exports=${JSON.stringify(json)}`

const build = async () => {
  const buildDir = path.resolve(__dirname, '../build')
  const postsDir = path.resolve(buildDir, 'posts')
  const srcDir = path.resolve(__dirname, '../../../posts')

  if (!(await fsp.access(postsDir))) {
    mkdirp.sync(postsDir)
  }

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

  const md5 = createHash('md5')

  md5.update(JSON.stringify(list))

  const hash = md5.digest('hex')

  await fsp.writeFile(
    path.resolve(buildDir, 'hash.js'),
    `module.exports='${hash}'`
  )

  await Promise.all(
    list.map(info =>
      fsp.writeFile(path.resolve(postsDir, info.name + '.js'), jsonModule(info))
    )
  )

  const builtDirFiles = await fsp.readdir(postsDir)

  const expectedFiles = list.map(info => info.name + '.js')

  const unexpectedNodes = builtDirFiles.filter(
    file => !expectedFiles.includes(file)
  )

  await Promise.all(
    unexpectedNodes.map(filename =>
      fsp.unlink(path.resolve(postsDir, filename))
    )
  )
}

build().catch(err => {
  console.error(err)

  return process.exit(1)
})
