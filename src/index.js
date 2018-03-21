import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

import App from './components/App'
import routes from './routes'

import loadCSS from './loadCSS'

Vue.use(VueRouter)
Vue.use(VueMeta)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.afterEach((to, from) => {
  const { ga } = window

  ga('set', 'page', to.path)
  ga('send', 'pageview')
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted() {
    window.document.querySelector('#initial_view').classList.add('app-loaded')
  }
})

loadCSS().then(() => {
  window.document.querySelector('#initial_view').classList.add('css-loaded')
})
