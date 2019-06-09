import { format } from 'date-fns'

import posts from '@log.pocka.io/posts'

const contents = posts
  .map(post => {
    return {
      title: post.title,
      name: post.name,
      tags: post.tags,
      updatedAt: post.updatedAt,
      updatedAtFormatted: format(post.updatedAt, 'YYYY/MM/DD')
    }
  })
  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  const filtered = contents.filter(
    post => !req.query.tag || post.tags.includes(req.query.tag)
  )

  res.end(JSON.stringify(filtered))
}
