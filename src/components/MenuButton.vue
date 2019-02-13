<script>
export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    darken: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    label() {
      return this.opened ? 'Close menu' : 'Open menu'
    }
  }
}
</script>

<template>
  <a
    :class="[$style.container, darken ? $style.dark : null]"
    role="button"
    :aria-label="label"
    @click="$emit('click')"
  >
    <span :class="[$style.bar, opened ? $style.open : null]"/>
    <span :class="[$style.bar, opened ? $style.open : null]"/>
    <span :class="[$style.bar, opened ? $style.open : null]"/>
  </a>
</template>

<style module lang="scss">
@import '~/assets/vars.scss';

.container {
  color: $color-bg;
  cursor: pointer;
}

.dark {
  color: $color-fg;
}

$bar-height: 6px;
$bar-interval: 7px;

.bar {
  display: block;
  width: 32px;
  height: $bar-height;

  border-radius: 1px;

  $invert-filter: grayscale(100%) invert(100%);
  backdrop-filter: $invert-filter;
  @supports not (backdrop-filter: $invert-filter) {
    background-color: currentColor;
  }

  transition: color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;

  &:not(:first-child) {
    margin-top: $bar-interval;
  }
}

.open {
  &:nth-child(1) {
    transform: translateY($bar-height + $bar-interval) rotate(-45deg);
    transform-origin: center center;
  }

  &:nth-child(2) {
    opacity: 0;
  }

  &:nth-child(3) {
    transform: translateY(-($bar-height + $bar-interval)) rotate(45deg);
    transform-origin: center center;
  }
}
</style>
