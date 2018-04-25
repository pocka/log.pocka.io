<script>
import PostList from '~/components/PostList'

export default {
  asyncData({ params }) {
    const { posts } = require('~/assets/posts.json')

    return {
      matchedPosts: posts.filter(post => post.tags.includes(params.tag)),
      tag: params.tag
    }
  },
  components: {
    PostList
  },
  head() {
    return {
      title: 'Tags',
      meta: [{ name: 'robots', content: 'noindex' }]
    }
  }
}
</script>

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
        <post-list :posts="matchedPosts"/>
      </div>
    </section>
  </div>
</template>
