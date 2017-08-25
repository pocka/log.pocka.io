<template>
  <div id="app">
    <blog-menu />
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'

import BlogMenu from './BlogMenu'

import {LoadPosts} from '../store/modules/post'


export default {
  name: 'app',
  components: {
    BlogMenu,
  },
  created() {
    this.$store.dispatch(LoadPosts)
  },
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
