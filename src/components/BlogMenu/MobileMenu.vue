<script>
export default {
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleMobileMenu() {
      this.$emit('toggle-menu')
    }
  }
}
</script>


<template>
  <div class="is-hidden-tablet">
    <div class="navbar-brand">
      <router-link
        class="navbar-item brand"
        to="/"
      >
        log.pocka.io
      </router-link>
      <div
        class="navbar-burger"
        @click="toggleMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div :class="['navbar-menu', {'is-active': isMenuOpen}]">
      <div class="navbar-item">
        <router-link
          class="navbar-item"
          to="/"
          @click.native="toggleMobileMenu"
        >
          Home
        </router-link>
      </div>
      <div class="navbar-item">
        <router-link
          class="navbar-item"
          to="/posts"
          @click.native="toggleMobileMenu"
        >
          Posts
        </router-link>
      </div>
      <div class="navbar-item">
        <router-link
          class="navbar-item"
          to="/about"
          @click.native="toggleMobileMenu"
        >
          About
        </router-link>
      </div>
      <div class="navbar-item">
        <router-link
          class="navbar-item"
          to="/contact"
          @click.native="toggleMobileMenu"
        >
          Contact
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
}

.brand:hover {
  background-color: transparent;
}
</style>
