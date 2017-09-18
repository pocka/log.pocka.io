import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Promise from 'promise-polyfill'

import App from './components/App'
import store from './store'
import routes from './routes'


if (!window.Promise) {
  window.Promise = Promise
}

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
