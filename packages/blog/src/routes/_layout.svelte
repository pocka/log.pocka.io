<script>
  import { afterUpdate, onMount } from 'svelte'
  import Layout from '../components/templates/Layout'

  if (process.env.GA_TRACKING_ID) {
    onMount(() => {
      window.ga =
        window.ga ||
        function() {
          ;(ga.q = ga.q || []).push(arguments)
        }
      ga.l = +new Date()
      ga('create', process.env.GA_TRACKING_ID, 'auto')
      ga('send', 'pageview')
    })

    afterUpdate(() => {
      ga('set', 'page', location.pathname)
      ga('send', 'pageview')
    })
  }
</script>

<style src="../global.css">

</style>

<Layout>
  <slot />
</Layout>
