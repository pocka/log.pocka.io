<script>
import {mapState, mapGetters} from 'vuex'

import PostList from '../components/PostList'

export default {
  components: {PostList},
  metaInfo: {
    title: 'Top',
  },
  computed: {
    recentCreatedPosts () {
      return this.$store.getters.getSortedPosts('createdAt').slice(0, 3)
    },
    recentUpdatedPosts () {
      return this.$store.getters.getSortedPosts('updatedAt').slice(0, 3)
    }
  }
}
</script>

<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">log.pocka.io</h1>
          <p class="subtitle is-4">Blog about Web, VR, Tech, etc...</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2 class="title is-4">最近作成された記事</h2>
        <PostList :posts="recentCreatedPosts"/>
        <hr/>
        <h2 class="title is-4">最近更新された記事</h2>
        <PostList :posts="recentUpdatedPosts"/>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
</style>
