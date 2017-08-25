<template>
  <div v-html="post">
  </div>
</template>

<script>
import {mapState} from 'vuex'


export default {
  props: ['name'],
  data: () => ({
    isLoading: false,
    post: '',
  }),
  created() {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.isLoading = true

      fetch(`${this.name}.html`).then(res => {
        this.isLoading = false

        if (res.status !== 200) {
          return Promise.reject(`Status code error: ${res}`)
        }

        return res.text()
      }).then(post => {
        this.post = post
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
