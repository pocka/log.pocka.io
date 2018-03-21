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
        <post-list
          :posts="posts"
          :is-loading="isLoadingPosts"
        />
      </div>
    </section>
  </div>
</template>

<script>
import PostList from '../components/PostList'

export default {
  props: {
    posts: {
      type: Array,
      required: true
    },
    isLoadingPosts: {
      type: Boolean,
      required: true
    }
  },
  components: {
    PostList
  },
  metaInfo: {
    title: 'Posts'
  }
}
</script>
