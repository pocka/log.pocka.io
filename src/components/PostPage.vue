<script>
import OldPostNotification from '~/components/OldPostNotification'
import TooOldPostNotification from '~/components/TooOldPostNotification'

import FacebookButton from '~/components/ShareButton/Facebook'
import HatenaBookmarkButton from '~/components/ShareButton/HatenaBookmark'
import PocketButton from '~/components/ShareButton/Pocket'
import TwitterButton from '~/components/ShareButton/Twitter'

const isNYearsAgo = n => date =>
  Math.floor((new Date() - date) / (1000 * 60 * 60 * 24 * 365)) >= n

export default {
  components: {
    OldPostNotification,
    TooOldPostNotification,
    FacebookButton,
    HatenaBookmarkButton,
    PocketButton,
    TwitterButton
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  head() {
    const { post } = this
    return {
      title: post.title,
      meta: [
        { name: 'description', content: post.description },
        { name: 'keywords', content: post.tags.join(',') },
        { name: 'author', content: post.author },
        { property: 'og:title', content: post.title },
        { property: 'og:type', content: 'article' },
        {
          property: 'og:image',
          content: 'https://avatars3.githubusercontent.com/u/13316015?s=460&v=4'
        },
        {
          property: 'og:url',
          content: this.pageURL
        },
        { property: 'og:description', content: post.description },
        { property: 'og:locale', content: 'ja_JP' }
      ],
      link: [
        { rel: 'amphtml', href: `https://log.pocka.io/amp/${post.name}.html` }
      ]
    }
  },
  computed: {
    historyUri() {
      return `https://github.com/pocka/log.pocka.io/commits/master/posts/${
        this.post.name
      }.md`
    },
    isArticle() {
      return this.post.tags.includes('article')
    },
    isOldPost() {
      return !this.isArticle && isNYearsAgo(1)(new Date(this.post.updatedAt))
    },
    isTooOldPost() {
      return !this.isArticle && isNYearsAgo(3)(new Date(this.post.updatedAt))
    },
    pageURL() {
      return `https://log.pocka.io/posts/${this.post.name}/`
    },
    shareTitle() {
      return `${this.post.title} | log.pocka.io`
    }
  }
}
</script>

<template>
  <div class="post-container">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">{{post.title}}</h1>
          <p class="subtitle is-4" v-if="!!post.subtitle">{{post.subtitle}}</p>
          <div class="tags">
            <router-link
              v-for="tag in post.tags"
              :key="tag"
              :to="`/tags/${tag}/`"
              :title="`${tag}タグのついた記事を探す`"
              class="tag is-light"
            >{{tag}}</router-link>
          </div>
          <p class="is-size-7 has-text-white-ter">
            作成日: {{post.createdAt | ymd}}, 更新日:
            <time>{{post.updatedAt | ymd}}</time>
          </p>
          <p class="is-size-7 has-text-white-ter">
            <a :href="historyUri" target="_blank" rel="noopener">更新履歴</a>
          </p>
          <div class="share-buttons buttons">
            <facebook-button class="is-small" :url="pageURL"/>
            <hatena-bookmark-button class="is-small" :url="pageURL" :title="shareTitle"/>
            <pocket-button class="is-small" :url="pageURL" :title="shareTitle"/>
            <twitter-button class="is-small" :url="pageURL" :title="post.title"/>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container box">
        <too-old-post-notification v-if="isTooOldPost"/>
        <old-post-notification v-else-if="isOldPost"/>
        <div class="content">
          <slot></slot>
        </div>
        <hr>
        <div class="share-buttons buttons">
          <facebook-button :url="pageURL"/>
          <hatena-bookmark-button :url="pageURL" :title="shareTitle"/>
          <pocket-button :url="pageURL" :title="shareTitle"/>
          <twitter-button :url="pageURL" :title="post.title"/>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.post-container p {
  letter-spacing: 0.07em;
  line-height: 1.7em;
}

.post-container li {
  line-height: 1.7em;
}

.post-container strong {
  letter-spacing: 0;
}

.post-container pre {
  background-color: #333;
}

.post-container pre code {
  margin: 0;
  padding: 0.25rem 0.5rem;
}

.post-container code {
  background-color: #333;
  color: #fefefe;
  border-radius: 3px;
  margin: 0 0.2em;
  letter-spacing: 0;
}

.post-container img {
  margin: 1em 0;
  box-shadow: 1px 0px 5px #aaa, -1px 0px 5px #aaa;
}

.post-container .tags > .tag.is-light {
  color: #0a0a0a;
}

.post-container .youtube {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;

  background-color: #ccc;
  border-radius: 5px;
}

.post-container .youtube iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.hero-body a:hover {
  text-decoration: underline;
}

.share-buttons {
  margin-top: 1em;
}

@media (max-width: 768px) {
  .section {
    padding: 0;
  }
}
</style>
