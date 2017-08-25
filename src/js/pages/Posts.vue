<template>
  <div class="container">
    <ul>
      <li v-for="post in posts" :key="post">
        <router-link :to="post">{{post}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'


export default {
  computed: mapState({
    posts: state => state.post.list,
  }),
}
</script>

<style lang="scss" scoped>
</style>
