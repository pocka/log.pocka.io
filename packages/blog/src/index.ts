import './global.pcss?critical'

import { router } from '@log.pocka.io/router'
import { route } from './route'

import { posts } from '~/pages/posts'

router({
  routes: [
    posts,
    route('^/$', ({ container }) => {
      document.title = 'Top'

      container.innerHTML = 'Top'
      console.info(container)

      return () => {
        document.title = ''
      }
    }),
    route(/.*/, ({ container }) => {
      document.title = 'Not found'

      container.innerHTML = '404'
    })
  ]
})
