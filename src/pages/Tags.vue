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
        <post-list
          :posts="matchedPosts"
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
    tag: {
      type: String,
      required: true
    },
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
    title: 'Tags',
    meta: [{ name: 'robots', content: 'noindex' }]
  },
  computed: {
    matchedPosts() {
      return this.posts.filter(post => post.tags.includes(this.tag))
    }
  }
}
</script>
