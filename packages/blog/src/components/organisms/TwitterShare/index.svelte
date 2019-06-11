<script>
  import TwitterIcon from '../../icons/Twitter'

  export let url = ''
  export let title = ''
  export let via = ''
  export let hashtags = []

  $: queries = {
    url,
    text: title,
    via,
    related: via,
    hashtags: hashtags.join(',')
  }

  $: href = `https://twitter.com/share?${Object.keys(queries)
    .filter(k => queries[k])
    .map(k => `${k}=${encodeURIComponent(queries[k])}`)
    .join('&')}`
</script>

<a {href} target="_blank" rel="noopener" title="Share on Twitter">
  <TwitterIcon />
</a>
