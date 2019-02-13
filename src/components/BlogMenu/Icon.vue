<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <li :class="$style.item">
    <a :class="$style.link" :href="href" target="_blank" rel="noopener">
      <slot/>
    </a>
  </li>
</template>

<style module lang="scss">
.item {
  font-size: 32px;
  height: 1em;

  pointer-events: none;
}

.link {
  height: 1em;

  color: inherit;

  pointer-events: auto;
}
</style>

