<template>
  <div class="blog-body">
    <h1>Hello, World!</h1>
    <ul>
      <li v-for="article in articles" @click="loadArticle(article)" :key="article">{{article}}</li>
    </ul>
    <div>
      <div v-html="article"></div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import {LoadArticle} from '../store/modules/article'

export default {
  computed: mapState({
    article: state => state.article.current,
    articles: state => state.article.list,
  }),
  methods: {
    loadArticle(uri) {
      this.$store.dispatch(LoadArticle, uri)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
