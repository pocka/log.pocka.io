<template>
  <div class="spinner-container" v-if="isLoading">
    <spinner/>
  </div>
  <div class="post-container" v-else-if="!notFound">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">{{post.title}}</h1>
          <p class="subtitle is-4" v-if="!!post.subtitle">{{post.subtitle}}</p>
          <div class="tags">
            <router-link v-for="tag in post.tags" :key="tag" :to="`/tags/${tag}`" :title="`${tag}タグのついた記事を探す`" class="tag is-light">{{tag}}</router-link>
          </div>
          <p class="is-size-7 has-text-white-ter">
            作成日: {{createdAt}}, 更新日: <time>{{updatedAt}}</time>
          </p>
          <p class="is-size-7 has-text-white-ter">
            <a :href="historyUri" target="_blank">更新履歴</a>
          </p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container box">
        <div class="content" v-html="post.__content" v-fetch></div>
      </div>
    </section>
  </div>
  <div v-else>
    Detail: {{notFound}}
  </div>
</template>

<script>
import Vue from 'vue'
import {mapState} from 'vuex'
import NotFound from './NotFound'
import Spinner from '../components/Spinner'

Vue.directive('fetch', {
  componentUpdated(el, binding, vnode) {
    [...el.querySelectorAll('[data-vue-router-link]')].forEach(link => {
      link.addEventListener('click', ev => {
        ev.preventDefault()

        vnode.context.$router.push(ev.target.getAttribute('href'))
      })
    })
  }
})


export default {
  props: ['name'],
  components: {
    NotFound,
    Spinner,
  },
  metaInfo() {
    if (!this.post.__content) {
      return {
        title: 'loading...',
      }
    }

    return {
      title: this.post.title,
      meta: [
        {name: 'description', content: this.post.subtitle},
        {name: 'keywords', content: this.post.tags.join(',')},
        {name: 'author', content: this.post.author},
      ],
    }
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
  computed:{
    createdAt() {
      const {createdAt} = this.post

      if (!createdAt) {
        return ''
      }

      return `${createdAt.getFullYear()}/${createdAt.getMonth() + 1}/${createdAt.getDate()}`
    },
    updatedAt() {
      const {updatedAt} = this.post

      if (!updatedAt) {
        return ''
      }

      return `${updatedAt.getFullYear()}/${updatedAt.getMonth() + 1}/${updatedAt.getDate()}`
    },
    historyUri() {
      const {name} = this.post

      if (!name) {
        return ''
      }

      return `https://github.com/pocka/log.pocka.io/commits/master/posts/${name}.md`
    }
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
        })
        this.notFound = false
      }).catch(err => {
        this.notFound = err.message
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

    .tags > .tag.is-light {
      color: #0a0a0a;
    }
  }
</style>

<style lang="scss" scoped>
.hero-body {
  a {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
