<script>
  import FacebookIcon from '../../icons/Facebook'

  export let url = ''

  $: href = `https://www.facebook.com/share.php?u=${encodeURIComponent(url)}`
</script>

<a {href} target="_blank" rel="noopener" title="Share on Facebook">
  <FacebookIcon />
</a>
