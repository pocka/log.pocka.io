<template>
  <div id="app">
    <blog-menu />
    <transition name="content" appear mode="out-in">
      <router-view :key="$route.path"></router-view>
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
  metaInfo: {
    titleTemplate: '%s | log.pocka.io',
  },
}
</script>

<style lang="scss">
h1, h2, h3, h4, h5, h6 {
  font-family: "Raleway", "Mplus 1c", sans-serif;
}
</style>

<style lang="scss" scoped>
#app {
  font-family: "Saira Semi Condensed", "Mplus 1c", sans-serif;
}

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
