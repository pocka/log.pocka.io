<script context="module">
  import hash from '@log.pocka.io/posts/build/hash'

  export function preload({ params, query }) {
    return this.fetch(`/posts/list.${hash}.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts }
      })
  }
</script>

<script>
  import Head from '../../components/Head'
  import Posts from '../../components/organisms/Posts'

  export let posts = []
</script>

<svelte:head>
  <Head title="Posts" description="記事一覧" path="/posts/" />
</svelte:head>

<h1>All Posts</h1>

<Posts {posts} />
