import { route } from '~/route'

import styles from './styles.pcss'

export const posts = route('^/posts/?$', ({ container, isActive }) => {
  container.innerHTML = ''

  import(
    /* webpackChunkName: 'posts' */ '~/components/organisms/x-post-title/register'
  )

  import(/* webpackChunkName: 'posts' */ '@log.pocka.io/posts')
    .then(mod => mod.default)
    .then(posts => {
      if (!isActive()) return

      posts.forEach(post => {
        const el = document.createElement('x-post-title')

        el.setAttribute('post-title', post.title)
        el.setAttribute('updated-at', post.updatedAt)
        el.setAttribute('tags', post.tags.join(','))
        el.setAttribute('href', `/posts/${post.name}`)

        el.classList.add(styles.post)

        container.appendChild(el)
      })
    })

  document.title = 'Posts'
})
