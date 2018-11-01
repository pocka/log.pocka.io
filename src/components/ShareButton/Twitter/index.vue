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
    },
    via: {
      type: String
    },
    hashtags: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    href() {
      const queries = {
        url: this.url,
        via: this.via,
        text: this.title,
        related: this.via,
        hashtags: this.hashtags.join(',')
      }

      return (
        'https://twitter.com/share?' +
        Object.keys(queries)
          .filter(k => queries[k])
          .map(k => `${k}=${encodeURIComponent(queries[k])}`)
          .join('&')
      )
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
    title="Twitterで共有"
  >
    <brand-icon/>
  </a>
</template>


