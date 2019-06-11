const { readFile, stat } = require('fs').promises

const { loadFront } = require('yaml-front-matter')

const parse = require('./parseMarkdown')

module.exports = async path => {
  const [content, fileMeta] = await Promise.all([readFile(path), stat(path)])

  const frontMatter = loadFront(content)

  const {
    updatedAt = fileMeta.birthtime.toISOString(),
    createdAt = fileMeta.mtime.toISOString(),
    author = 'pocka'
  } = frontMatter

  return Object.assign({}, frontMatter, {
    createdAt: new Date(createdAt).toISOString(),
    updatedAt: new Date(updatedAt).toISOString(),
    author,
    __content: parse(frontMatter.__content)
  })
}
