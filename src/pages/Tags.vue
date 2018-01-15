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
  metaInfo: {
    title: 'Tags',
    meta: [
      {name: 'robots', content: 'noindex'},
    ]
  },
  computed: {
    posts() {
      return this.$store.getters.getPostsByTag(this.tag)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
