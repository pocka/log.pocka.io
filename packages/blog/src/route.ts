import { compose, route as defaultRoute } from '@log.pocka.io/router'
import { container } from '@log.pocka.io/router/lib/middlewares/container'

export const route = compose([container(document.querySelector('#app')!)])(
  defaultRoute
)
