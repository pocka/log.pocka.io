<template>
  <nav :class="['navbar', {'is-transparent': !showMobileMenu}]">
    <regular-menu/>
    <mobile-menu
      :is-menu-open="showMobileMenu"
      @toggle-menu="toggleMobileMenu"
    />
  </nav>
</template>

<script>
import MobileMenu from './MobileMenu'
import RegularMenu from './RegularMenu'

export default {
  components: {
    MobileMenu,
    RegularMenu
  },
  data: () => ({
    showMobileMenu: false
  }),
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    }
  }
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  margin: 0;
  z-index: 100;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.navbar.is-transparent {
  background-color: rgba(255, 255, 255, 0.92);
}
</style>
