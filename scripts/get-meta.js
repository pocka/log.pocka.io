const {readFileSync, statSync} = require('fs')
const {inspect} = require('util')
const {loadFront} = require('yaml-front-matter')


/**
 * Create metadata from a post file.
 * @param {string} path Path to the post file.
 * @returns {object} Metadata for post. Content is in "__content".
 */
module.exports = path => {
  const content = readFileSync(path)

  const meta = loadFront(content)

  const {
    updatedAt, createdAt, author,
  } = meta

  const fileInfo = statSync(path)

  return Object.assign({}, meta, {
    createdAt: createdAt || fileInfo.birthtime.toISOString(),
    updatedAt: updatedAt || fileInfo.mtime.toISOString(),
    author: author || 'pocka',
    path: `/${path.replace(/\.md$/, '')}`,
  })
}
