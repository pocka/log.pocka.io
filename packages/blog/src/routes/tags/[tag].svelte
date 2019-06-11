<script context="module">
  import hash from '@log.pocka.io/posts/build/hash'

  export function preload({ params: { tag }, query }) {
    return this.fetch(`/posts/list.${hash}.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts: posts.filter(post => post.tags.includes(tag)), tag }
      })
  }
</script>

<script>
  import Head from '../../components/Head'
  import Posts from '../../components/organisms/Posts'

  export let posts = []
  export let tag
</script>

<svelte:head>
  <Head
    title="Posts tagged by '{tag}'"
    description="'{tag}'タグのついた記事一覧" />
</svelte:head>

<h1>Posts tagged by "{tag}"</h1>

<Posts windowSize={30} {posts} />
