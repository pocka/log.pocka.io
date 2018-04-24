<script>
import PostList from '~/components/PostList'

export default {
  head() {
    return {
      title: 'TOP'
    }
  },
  components: { PostList },
  asyncData() {
    const { posts } = require('../../public/posts.json')

    const formatted = posts.map(post => ({
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt)
    }))

    return {
      recentCreatedPosts: formatted
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 3),
      recentUpdatedPosts: formatted
        .sort((a, b) => b.updatedAt - a.updatedAt)
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
        <post-list :posts="recentCreatedPosts"/>
        <hr/>
        <h2 class="title is-4">最近更新された記事</h2>
        <post-list :posts="recentUpdatedPosts"/>
      </div>
    </section>
  </div>
</template>
