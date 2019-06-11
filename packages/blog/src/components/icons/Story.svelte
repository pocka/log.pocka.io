<script>
  import Facebook from './Facebook'
  import GitHub from './GitHub'
  import Hatena from './Hatena'
  import LogDot from './LogDot'
  import Twitter from './Twitter'

  export let style = ''
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 1em);
    grid-gap: 16px;
    padding: 32px;
  }
</style>

<div class="grid" {style}>
  <LogDot />
  <GitHub />
  <Facebook />
  <Hatena />
  <Twitter />
</div>
