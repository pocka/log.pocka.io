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
      return `http://b.hatena.ne.jp/add?mode=confirm&url=${encodeURIComponent(
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
    title="はてブに保存"
  >
    <brand-icon/>
  </a>
</template>
