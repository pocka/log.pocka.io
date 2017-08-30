<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">Tag: {{tag}}</h1>
          <p class="subtitle is-4">{{tag}}タグのついた記事一覧</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <post-list :posts="posts"/>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import PostList from '../components/PostList'


export default {
  props: ['tag'],
  components: {
    PostList,
  },
  computed: {
    posts() {
      const posts = this.$store.getters.posts

      return posts.filter(post => post.tags.indexOf(this.tag) > -1)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
