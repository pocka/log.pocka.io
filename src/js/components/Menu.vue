<template>
  <nav class="menu">
    <ul>
      <li><a>HOME</a></li>
      <li><a>ARTICLE</a></li>
      <li><a>ABOUT</a></li>
    </ul>
  </nav>
</template>

<script>
</script>

<style lang="scss" scoped>
  .menu {
    margin: 0;
    top: 0;
    left: 0;
    right: 0;

    background-color: #333;
    & > ul {
      margin: 0;

      & > li {
        background-color: #f4c;
      }
    }
  }
</style>
