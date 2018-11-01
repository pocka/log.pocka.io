<script>
import BrandIcon from './BrandIcon'

export default {
  components: { BrandIcon },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    href() {
      return `http://www.facebook.com/share.php?u=${encodeURIComponent(
        this.url
      )}`
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
    title="Facebookで共有"
  >
    <brand-icon/>
  </a>
</template>
