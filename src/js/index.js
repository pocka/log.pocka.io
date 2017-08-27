import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'

import App from './components/App'
import store from './store'
import routes from './routes'


Vue.use(Buefy)
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
})

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>',
})
