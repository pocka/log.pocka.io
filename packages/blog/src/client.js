import * as sapper from '@sapper/app'
import smoothscroll from 'smoothscroll-polyfill'

import './async-resources'

smoothscroll.polyfill()

sapper.start({
  target: document.querySelector('#sapper')
})
