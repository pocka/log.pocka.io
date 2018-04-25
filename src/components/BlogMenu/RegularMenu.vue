<template>
  <div class="container level is-hidden-mobile">
    <div class="level-item has-text-centered">
      <router-link
        class="navbar-item"
        to="/"
      >
        Home
      </router-link>
    </div>
    <div class="level-item has-text-centered">
      <router-link
        class="navbar-item"
        to="/posts"
      >
        Posts
      </router-link>
    </div>
    <div class="level-item has-text-centered">
      <router-link
        class="navbar-item brand"
        to="/"
      >
        log.pocka.io
      </router-link>
    </div>
    <div class="level-item has-text-centered">
      <router-link
        class="navbar-item"
        to="/about"
      >
        About
      </router-link>
    </div>
    <div class="level-item has-text-centered">
      <router-link
        class="navbar-item"
        to="/contact"
      >
        Contact
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  margin-bottom: 0;
}

.navbar-item {
  font-family: Cairo;
}

.brand {
  font-weight: bold;
  font-size: 1.2em;
}

.brand:hover {
  background-color: transparent;
}
</style>
