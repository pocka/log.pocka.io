<template>
  <div>
    <section class="hero is-dark is-large">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">log.pocka.io</h1>
          <p class="subtitle is-4">Blog about Web, VR, Tech, etc...</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
      </div>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'


export default {
    components: {
    },
    computed: mapState({
        articles: state => state.article.list,
    }),
}
</script>

<style lang="scss" scoped>
</style>
