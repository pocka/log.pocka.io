<script>
import PostList from '~/components/PostList'

export default {
  components: { PostList },
  head() {
    return {
      title: 'Posts'
    }
  },
  asyncData() {
    const { posts } = require('../../../public/posts.json')

    return {
      posts: posts
        .map(post => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt)
        }))
        .sort((a, b) => b.updatedAt - a.updatedAt)
    }
  }
}
</script>

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

