<template>
  <div class="spinner">Loading...</div>
</template>

<script>
// Markup and styles from https://projects.lukehaas.me/css-spinners/
</script>


<style lang="scss" scoped>
$spinner-color: #555;
$spinner-size: 2.5em;

.spinner, .spinner:before, .spinner:after {
  border-radius: 50%;
  width: $spinner-size;
  height: $spinner-size;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}

.spinner {
  color: $spinner-color;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

.spinner:before, .spinner:after {
  content: '';
  position: absolute;
  top: 0;
}

.spinner:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner:after {
  left: 3.5em;
}

@-webkit-keyframes load7 {
  0%, 80%, 100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%, 80%, 100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
