<template>
  <div class="columns">
    <div v-for="post in posts" :key="post.title" class="column is-4">
      <div class="card">
        <div class="card-content">
          <router-link :to="post.path" class="title is-4">{{post.title}}</router-link>
          <p>{{post.summary}}</p>
          <div class="tags">
            <router-link v-for="tag in post.tags" :key="tag" :to="`/tags/${tag}`" :title="`${tag}タグのついた記事を探す`" class="tag is-dark">{{tag}}</router-link>
          </div>
          <p>
            <p class="is-size-7 has-text-grey">
              更新日: {{post.updatedAt.getFullYear()}}/{{post.updatedAt.getMonth() + 1}}/{{post.updatedAt.getDate()}}
            </p>
            <p class="is-size-7 has-text-grey">
              作成日: {{post.createdAt.getFullYear()}}/{{post.createdAt.getMonth() + 1}}/{{post.createdAt.getDate()}}
            </p>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: [],
    }
  }
}
</script>

<style lang="scss" scoped>
.card-content > .title {
  &:hover {
    text-decoration: underline;
  }
}

.tag {
  &:hover {
    text-decoration: none;
  }
}
</style>
