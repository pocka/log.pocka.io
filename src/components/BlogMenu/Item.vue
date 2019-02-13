<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <li :class="$style.item">
    <nuxt-link :class="$style.link" :to="to">
      <slot/>
    </nuxt-link>
  </li>
</template>

<style module lang="scss">
.item {
  font-size: 24px;
  height: 1em;
  margin: 0;

  pointer-events: none;
}

.link {
  color: inherit;
  text-decoration: none;

  pointer-events: auto;

  &:hover {
    text-decoration: underline;
  }
}
</style>
