<template>
  <div id="app">
    <blog-menu />
    <transition name="content" appear mode="out-in">
      <router-view></router-view>
    </transition>
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

<style lang="scss" scoped>
p {
  font-weight: bold;
  font-size: 2em;
  background-color: #ececec;
  color: #333;
}

.content {
  &-enter-active, &-leave-active {
    transition: opacity 0.3s ease;
  }

  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>
