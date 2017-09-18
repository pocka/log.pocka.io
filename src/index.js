import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Raven from 'raven-js'

import App from './components/App'
import store from './store'
import routes from './routes'


Raven.config('https://5382795373e441a8a4791a649ce1b2ab@sentry.io/218959').install()

Vue.use(VueRouter)
Vue.use(VueMeta)

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.afterEach((to, from) => {
  const {ga} = window

  ga('set', 'page', to.path)
  ga('send', 'pageview')
})

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>',
})
