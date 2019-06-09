<script>
  import HatenaIcon from '../../icons/Hatena'

  export let url = ''
  export let title = ''

  $: href = `http://b.hatena.ne.jp/add?mode=confirm&url=${encodeURIComponent(
    url
  )}&title=${encodeURIComponent(title)}`
</script>

<a {href} target="_blank" rel="noopener" title="Bookmark on Hatena">
  <HatenaIcon />
</a>
