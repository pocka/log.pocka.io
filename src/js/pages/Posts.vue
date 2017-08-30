<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">Posts</h1>
          <p class="subtitle is-4">記事一覧</p>
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
  components: {
    PostList,
  },
  computed: mapGetters([
    'posts',
  ]),
}
</script>

<style lang="scss" scoped>
</style>
