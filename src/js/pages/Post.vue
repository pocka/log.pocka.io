<template>
  <div class="post-container" v-if="!notFound">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">{{post.title}}</h1>
          <p class="subtitle is-4" v-if="!!post.subtitle">{{post.subtitle}}</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container content" v-html="post.__content"></div>
    </section>
  </div>
  <not-found v-else/>
</template>

<script>
import {mapState} from 'vuex'
import NotFound from './NotFound'


export default {
  props: ['name'],
  components: {
    NotFound,
  },
  data: () => ({
    isLoading: false,
    post: {},
    notFound: false,
  }),
  created() {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.isLoading = true

      fetch(`/posts/${this.name}.json`).then(res => {
        this.isLoading = false

        if (res.status !== 200) {
          return Promise.reject(`Status code error: ${res}`)
        }

        return res.json()
      }).then(post => {
        this.post = Object.assign({}, post, {
          updatedAt: new Date(post.updatedAt),
          createdAt: new Date(post.createdAt),
        }),
        this.notFound = false
      }).catch(err => {
        this.notFound = true
      })
    }
  }
}
</script>

<style lang="scss">
  .post-container {
    & pre {
      background-color: #333;
    }
    & code {
      background-color: #333;
      color: #fefefe;
    }
  }
</style>


<style lang="scss" scoped>
</style>
