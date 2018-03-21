<script>
import Vue from 'vue'

import BlogMenu from '../BlogMenu'

export default {
  name: 'app',
  components: {
    BlogMenu
  },
  async created() {
    this.isLoadingPosts = true
    try {
      await this.fetchPosts()
    } finally {
      this.isLoadingPosts = false
    }
  },
  metaInfo: {
    titleTemplate: '%s | log.pocka.io'
  },
  data() {
    return {
      posts: [],
      isLoadingPosts: false
    }
  },
  methods: {
    async fetchPosts() {
      const resp = await fetch('/posts.json')

      if (resp.status !== 200) {
        throw new Error(
          `Unexpected status code: ${res.status} ${res.statusText}`
        )
      }

      const { posts } = await resp.json()

      this.posts = posts.map(post => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt)
      }))
    }
  }
}
</script>

<template>
  <div id="app">
    <blog-menu />
    <transition name="content" appear mode="out-in">
      <router-view
        :key="$route.path"
        :posts="posts"
        :is-loading-posts="isLoadingPosts"
      />
    </transition>
  </div>
</template>

<style lang="scss" src="./style.scss">

</style>

<style lang="scss" scoped src="./scoped.scss">

</style>
