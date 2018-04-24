<script>
export default {
  props: {
    error: {}
  }
}
</script>

<template>
  <div>
    <section class="hero is-danger is-large">
      <div class="hero-body">
        <div class="container">
          <template v-if="error.statusCode === 404">
            <h1 class="title is-2">404</h1>
            <p class="subtitle is-4">Page Not Found</p>
          </template>
          <template v-else>
            <h1 class="title is-2">¯\_(ツ)_/¯</h1>
            <p class="subtitle is-4">Error</p>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>
