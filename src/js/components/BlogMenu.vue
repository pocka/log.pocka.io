<template>
  <nav :class="['navbar', 'level', {'is-transparent': !showMobileMenu}]">
    <div class="level-item has-text-centered is-hidden-mobile">
      <router-link class="navbar-item" to="/">Home</router-link>
    </div>
    <div class="level-item has-text-centered is-hidden-mobile">
      <router-link class="navbar-item" to="/posts">Posts</router-link>
    </div>
    <div class="level-item has-text-centered is-hidden-mobile">
      <router-link class="navbar-item brand" to="/">log.pocka.io</router-link>
    </div>
    <div class="level-item has-text-centered is-hidden-mobile">
      <router-link class="navbar-item" to="/about">About</router-link>
    </div>
    <div class="level-item has-text-centered is-hidden-mobile">
      <router-link class="navbar-item" to="/contact">Contact</router-link>
    </div>
    <div class="navbar-brand is-hidden-tablet">
      <router-link class="navbar-item brand" to="/">log.pocka.io</router-link>
      <div class="navbar-burger" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div :class="['navbar-menu', 'is-hidden-tablet', {'is-active': showMobileMenu}]">
      <div class="navbar-item">
        <router-link class="navbar-item" to="/" @click.native="toggleMobileMenu">Home</router-link>
      </div>
      <div class="navbar-item">
        <router-link class="navbar-item" to="/posts" @click.native="toggleMobileMenu">Posts</router-link>
      </div>
      <div class="navbar-item">
        <router-link class="navbar-item" to="/about" @click.native="toggleMobileMenu">About</router-link>
      </div>
      <div class="navbar-item">
        <router-link class="navbar-item" to="/contact" @click.native="toggleMobileMenu">Contact</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    showMobileMenu: false,
  }),
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    }
  }
}
</script>

<style lang="scss" scoped>
  nav.level {
    position: sticky;
    top: 0;
    margin: 0;
    z-index: 100;
    background-color: #fff;

    &.is-transparent {
      background-color: rgba(255, 255, 255, 0.92);
    }
  }

  .navbar-item {
    font-family: Cairo;
  }

  .navbar-menu {
    position: absolute;
    left: 0;
    right: 0;
    background-color: #fff;
  }

  .brand {
    font-weight: bold;
    font-size: 1.2em;

    &:hover {
      background-color: transparent;
    }
  }
</style>
