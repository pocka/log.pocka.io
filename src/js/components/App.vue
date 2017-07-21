<template>
  <div id="app">
    <blog-menu />
    <blog-body />
  </div>
</template>

<script>
import Vue from 'vue'

import Menu from './Menu'
import Body from './Body'

Vue.component('blog-menu', Menu)
Vue.component('blog-body', Body)

// ---

export default {
  name: 'app',
}
</script>

<style scoped>
p {
  font-weight: bold;
  font-size: 2em;
  background-color: #ececec;
  color: #333;
}
</style>
