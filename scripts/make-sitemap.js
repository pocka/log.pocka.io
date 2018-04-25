const fs = require('fs')
const path = require('path')

const Sitemap = require('sitemap')

const postsJSON = require('../src/assets/posts.json')

const urls = [
  ...postsJSON.posts.map(post => ({
    url: post.path,
    lastmodISO: new Date(post.updatedAt).toISOString()
  })),
  { url: '/' },
  { url: '/posts' },
  { url: '/about' },
  { url: '/contact' }
]

const sitemap = Sitemap.createSitemap({
  hostname: process.env.HOST_NAME,
  urls
})

sitemap.toXML((err, xml) => {
  if (err) {
    console.error('Failed to generate sitemap.xml')
    console.error(err)
    return
  }

  fs.writeFile(path.resolve(__dirname, '../src/static/sitemap.xml'), xml)
})
