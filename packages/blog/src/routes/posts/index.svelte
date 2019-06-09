<script context="module">
  export function preload({ params, query }) {
    return this.fetch('/posts.json')
      .then(r => r.json())
      .then(posts => {
        return { posts }
      })
  }
</script>

<script>
  import Posts from '../../components/organisms/Posts'

  export let posts = []
</script>

<svelte:head>
  <title>Posts - log.pocka.io</title>
</svelte:head>

<h1>All Posts</h1>

<Posts {posts} />
