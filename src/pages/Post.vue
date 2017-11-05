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
        <div v-if="isTooOldPost" class="notification is-warning">
          <strong>この記事は3年以上更新されていません</strong><br>
          内容が古くなっており、現在と状況が変わっている可能性が高い為注意してください
        </div>
        <div v-else-if="isOldPost" class="notification is-info">
          <strong>この記事は1年以上更新されていません</strong><br>
          内容が古くなっている可能性があるため注意してください
        </div>
        <div class="content" v-html="post.__content" v-fetch></div>
      </div>
    </section>
  </div>
  <not-found v-else/>
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

const isNYearsAgo = n => date => Math.floor((new Date() - date) / (1000 * 60 * 60 * 24 * 365)) >= n

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
    },
    isArticle() {
      const {tags} = this.post

      if (!tags) {
        return false
      }

      return tags[0] === 'article'
    },
    isOldPost() {
      const {updatedAt} = this.post

      if (this.isArticle || !updatedAt) {
        return false
      }

      return isNYearsAgo(1)(updatedAt)
    },
    isTooOldPost() {
      const {updatedAt} = this.post

      if (this.isArticle || !updatedAt) {
        return false
      }

      return isNYearsAgo(3)(updatedAt)
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
      code {
        margin: 0;
        padding: 0.25rem 0.5rem;
      }
    }
    & code {
      background-color: #333;
      color: #fefefe;
      border-radius: 3px;
      margin: 0 0.1em;
    }

    & img {
      $shadow-color: #aaa;
      $shadow-blur: 5px;

      margin: 1em 0;
      box-shadow: 1px 0px $shadow-blur $shadow-color, -1px 0px $shadow-blur $shadow-color;
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
