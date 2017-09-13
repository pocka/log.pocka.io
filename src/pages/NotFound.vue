<template>
    <div>
      <section class="hero is-danger is-large">
        <div class="hero-body">
          <div class="container">
            <h1 class="title is-2">404</h1>
            <p class="subtitle is-4">Page Not Found</p>
          </div>
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
