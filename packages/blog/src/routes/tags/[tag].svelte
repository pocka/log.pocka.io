<script context="module">
  export function preload({ params: { tag }, query }) {
    return this.fetch(`/posts.json?tag=${tag}`)
      .then(r => r.json())
      .then(posts => {
        return { posts, tag }
      })
  }
</script>

<script>
  import Posts from '../../components/organisms/Posts'

  export let posts = []
  export let tag
</script>

<svelte:head>
  <title>Posts tagged by "{tag}" - log.pocka.io</title>
</svelte:head>

<h1>Posts tagged by "{tag}"</h1>

<Posts windowSize={30} {posts} />
