const fs = require('fs').promises
const path = require('path')

const posts = require('@log.pocka.io/posts')

const css = require('./css')
const html = require('./html')

//////////////////////////////////

const distDir = path.resolve(__dirname, '../dist')

const build = async () => {
  const baseCss = await css.build()

  await Promise.all(
    posts.map(async post => {
      const fullPost = require(`@log.pocka.io/posts/build/posts/${post.name}`)

      const pageHtml = await html.build(fullPost, baseCss)

      const dist = path.resolve(distDir, `${post.name}.html`)

      await fs.writeFile(dist, pageHtml)
    })
  )
}

build()
