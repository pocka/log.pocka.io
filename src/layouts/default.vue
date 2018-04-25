<script>
import BlogMenu from '~/components/BlogMenu'

export default {
  components: { BlogMenu }
}
</script>

<template>
  <div :class="$style.container">
    <blog-menu/>
    <nuxt/>
  </div>
</template>

<style module>
.container {
  font-family: 'IBM Plex Sans', 'Mplus 1p', sans-serif;
}
</style>

<style>
.nuxt-enter-active,
.nuxt-leave-active {
  transition: opacity 0.2s;
}

.nuxt-enter,
.nuxt-leave-to {
  opacity: 0;
}
</style>
