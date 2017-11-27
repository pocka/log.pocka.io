<template>
  <div class="columns is-multiline">
    <div v-show="isLoading" class="column is-12">
      <div class="card fullwidth">
        <div class="card-content">
          Loading...
        </div>
      </div>
    </div>
    <div v-show="!isLoading" v-for="post in posts" :key="post.title" class="column is-4">
      <div class="card">
        <div class="card-content">
          <router-link :to="post.path" class="title is-4">{{post.title}}</router-link>
          <p class="summary">{{post.summary}}</p>
          <div class="dates">
            <p class="is-size-7 has-text-grey">
              更新日: {{post.updatedAt.getFullYear()}}/{{post.updatedAt.getMonth() + 1}}/{{post.updatedAt.getDate()}}
            </p>
            <p class="is-size-7 has-text-grey">
              作成日: {{post.createdAt.getFullYear()}}/{{post.createdAt.getMonth() + 1}}/{{post.createdAt.getDate()}}
            </p>
          </div>
          <div class="tags">
            <router-link v-for="tag in post.tags" :key="tag" :to="`/tags/${tag}`" :title="`${tag}タグのついた記事を探す`" class="tag is-dark">{{tag}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: {
    posts: {
      type: Array,
      default: [],
    }
  },
  computed: mapState({
    isLoading: state => state.post.isLoading
  })
}
</script>

<style lang="scss" scoped>
.summary {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card-content {
  padding-bottom: 5.5em;

  & > .title:hover {
    text-decoration: underline;
  }
}

.dates {
  position: absolute;
  bottom: 3em;
}

.tags {
  position: absolute;
  bottom: 1em;
}

.tag {
  &:hover {
    text-decoration: none;
  }
}

.column {
  display: flex;
}

.fullwidth {
  width: 100%;
  text-align: center;
}
</style>
