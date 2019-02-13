<script>
import BlogMenu from '~/components/BlogMenu'
import BlogMenuItem from '~/components/BlogMenu/Item'
import BlogMenuIcon from '~/components/BlogMenu/Icon'

import Octcat from '~/components/Icons/Octcat'
import Twitter from '~/components/Icons/Twitter'

export default {
  components: { BlogMenu, BlogMenuItem, BlogMenuIcon, Octcat, Twitter },
  computed: {
    page() {
      const path = this.$route.fullPath.replace(/\/$/, '')

      switch (path) {
        case '':
          return 'top'
        case '/about':
          return 'about'
        case '/posts':
          return 'posts'
        default:
          return path.match(/^\/posts\/.+/) ? 'post' : 'notfound'
      }
    },
    contentsStyle() {
      const indexes = {
        about: 0,
        top: 1,
        posts: 2,
        post: 3
      }

      return {
        transform: `translateY(-${indexes[this.page] * 100}%)`
      }
    }
  }
}
</script>

<template>
  <div :class="$style.container">
    <blog-menu>
      <blog-menu-item to="/">Top</blog-menu-item>
      <blog-menu-item to="/posts/">Posts</blog-menu-item>
      <blog-menu-item to="/about/">About</blog-menu-item>
      <template slot="icons">
        <blog-menu-icon href="https://twitter.com/pockaquel">
          <twitter/>
        </blog-menu-icon>
        <blog-menu-icon href="https://github.com/pocka">
          <octcat/>
        </blog-menu-icon>
      </template>
    </blog-menu>
    <div :class="$style.contents">
      <div :class="$style.contentsWrapper" :style="contentsStyle">
        <div :class="$style.about">
          <transition name="page">
            <nuxt v-if="page === 'about'"/>
          </transition>
        </div>
        <div :class="$style.top">
          <transition name="page">
            <nuxt v-if="page === 'top'"/>
          </transition>
        </div>
        <div :class="$style.posts">
          <transition name="page">
            <nuxt v-if="page === 'posts'"/>
          </transition>
        </div>
        <div :class="$style.post">
          <transition name="page">
            <nuxt v-if="page === 'post'"/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}
</style>

<style module lang="scss">
@import '~/assets/mixins.scss';

.container {
  font-family: 'IBM Plex Sans', 'Mplus 1p', sans-serif;
}

.contents {
  position: absolute;
  width: 100%;
  height: 100%;

  overflow: hidden;
}

.contentsWrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;

  transition: transform 0.2s ease;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

%page {
  position: absolute;
  height: 100%;
  width: 100%;

  overflow: auto;
}

.about {
  @extend %page;
  top: 0;
}

.top {
  @extend %page;
  top: 100%;
}

.posts {
  @extend %page;
  top: 200%;
}

.post {
  @extend %page;
  top: 300%;
}
</style>
