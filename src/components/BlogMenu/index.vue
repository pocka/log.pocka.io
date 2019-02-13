<script>
import MenuButton from '~/components/MenuButton'

export default {
  components: { MenuButton },
  data: () => ({
    open: false
  }),
  methods: {
    toggleOpen() {
      this.open = !this.open
    }
  }
}
</script>

<template>
  <div>
    <menu-button :class="$style.menuButton" :darken="!open" :opened="open" @click="toggleOpen"/>
    <nav :class="[$style.navbar, open ? $style.open : null]">
      <div :class="$style.bg"/>
      <div :class="$style.contents">
        <ul :class="$style.items" @click="toggleOpen">
          <slot/>
        </ul>
        <ul :class="$style.icons">
          <slot name="icons"/>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style module lang="scss">
@import '~/assets/mixins.scss';
@import '~/assets/vars.scss';

.menuButton {
  position: fixed;
  left: 16px;
  top: 16px;

  z-index: 101;

  @include media-up(lg) {
    display: none;
  }
}

.navbar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: $menu-min-width;
  margin: 0;

  color: $color-bg;
  z-index: 100;

  pointer-events: none;

  @include media-up(xl) {
    left: auto;
    right: calc(50% + #{$container-max-width / 2});
  }
}

.open {
  & > .bg {
    transform: translateY(0) skewX(-10deg);
    transition: transform 0.2s ease;
  }

  & > .contents {
    opacity: 1;
    transition: opacity 0.2s ease 0.1s;
  }
}

.contents {
  position: relative;
  margin-top: 88px;

  opacity: 0;
  transition: opacity 0.2s ease;

  @include media-up(lg) {
    margin-top: 56px;

    pointer-events: auto;

    opacity: 1;
  }
}

.items,
.icons {
  list-style: none;
  margin: 0;
  padding-left: 16px;
}

.items {
  & > :not(:first-child) {
    margin-top: 24px;
  }
}

.icons {
  margin-top: 48px;

  & > :not(:first-child) {
    margin-top: 16px;
  }
}

.bg {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 200vh;

  background-color: $color-fg;

  pointer-events: auto;
  transition: transform 0.2s ease 0.1s;
  transform: skewX(-10deg) translateY(-100%);
  transform-origin: right top;

  @include media-up(lg) {
    transition: none;
    transform: skewX(-10deg);
  }

  @include media-up(xl) {
    margin-left: -100vw;
    padding-left: 100vw;
  }
}
</style>
