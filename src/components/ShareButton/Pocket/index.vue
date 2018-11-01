<script>
import BrandIcon from './BrandIcon'

export default {
  components: { BrandIcon },
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    href() {
      return `http://getpocket.com/edit?url=${encodeURIComponent(
        this.url
      )}&title=${encodeURIComponent(this.title)}`
    }
  }
}
</script>

<template>
  <a
    class="button"
    :href="href"
    target="_blank"
    rel="noopener"
    title="Pocketに保存"
  >
    <brand-icon/>
  </a>
</template>

