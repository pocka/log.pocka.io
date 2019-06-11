<script>
  export let title = 'log.pocka.io'
  $: _title = title ? `${title} - log.pocka.io` : 'log.pocka.io'

  export let description = ''

  export let type = 'website'

  export let image = '/logo-512.png'

  export let url = process.browser ? location.href : 'https://log.pocka.io'
</script>

<title>{_title}</title>
<meta name="description" content={description} />
<meta property="og:title" content={_title} />
<meta property="og:type" content={type} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />
<meta property="og:url" content={url} />
<slot />
