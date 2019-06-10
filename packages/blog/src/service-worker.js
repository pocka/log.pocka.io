import * as routing from 'workbox-routing'
import * as strategies from 'workbox-strategies'

routing.registerRoute(
  /\.(json|png|js|css|svg|jpg)$/,
  new strategies.CacheFirst()
)
