import { format } from 'date-fns'

import posts from '@log.pocka.io/posts'

export function get(req, res, next) {
  const { slug } = req.params

  const found = posts.find(post => post.name === slug)

  if (!found) {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    })

    res.end(
      JSON.stringify({
        message: 'Not found'
      })
    )

    return
  }

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  const fullPost = require(`@log.pocka.io/posts/build/posts/${found.name}`)

  res.end(
    JSON.stringify({
      ...fullPost,
      updatedAtFormatted: format(fullPost.updatedAt, 'YYYY/MM/DD')
    })
  )
}
