import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App'
import store from './store'
import routes from './routes'


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
