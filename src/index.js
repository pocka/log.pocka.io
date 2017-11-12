import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

import App from './components/App'
import store from './store'
import routes from './routes'

import loadCSS from './loadCSS'

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
  mounted () {
    window.document.querySelector('#initial_view').classList.add('app-loaded')
  }
})

const css = [
  'https://fonts.googleapis.com/earlyaccess/mplus1p.css',
  'https://fonts.googleapis.com/css?family=Cairo|Raleway|Saira+Semi+Condensed',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.2/css/bulma.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css'
]

loadCSS(css).then(() => {
  window.document.querySelector('#initial_view').classList.add('css-loaded')
})
