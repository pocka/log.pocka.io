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
  components: { PostList },
  metaInfo: {
    title: 'Top'
  },
  computed: {
    recentCreatedPosts() {
      return [...this.posts]
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        .slice(0, 3)
    },
    recentUpdatedPosts() {
      return [...this.posts]
        .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
        .slice(0, 3)
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
        <PostList
          :posts="recentCreatedPosts"
          :is-loading="isLoadingPosts"
        />
        <hr/>
        <h2 class="title is-4">最近更新された記事</h2>
        <PostList
          :posts="recentUpdatedPosts"
          :is-loading="isLoadingPosts"
        />
      </div>
    </section>
  </div>
</template>
