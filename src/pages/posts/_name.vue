<script>
import Vue from 'vue'

import PostPage from '~/components/PostPage'

Vue.directive('dynamic-content', {
  inserted(el, binding, vnode) {
    ;[...el.querySelectorAll('[data-vue-router-link]')].forEach(link => {
      link.addEventListener('click', ev => {
        ev.preventDefault()
        vnode.context.$router.push(ev.target.getAttribute('href'))
      })
    })
  }
})

export default {
  components: { PostPage },
  async asyncData({ params }) {
    const post = (await import(`~/assets/posts/${params.name}.json`)).default

    return { post }
  }
}
</script>

<template>
  <post-page :post="post">
    <article v-html="post.__content" v-dynamic-content></article>
  </post-page>
</template>
