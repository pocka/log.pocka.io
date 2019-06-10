<script context="module">
  import hash from '@log.pocka.io/posts/build/hash'

  export function preload({ query }) {
    return this.fetch(`/posts/list.${hash}.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts: posts.slice(0, 3) }
      })
  }
</script>

<script>
  import LogDot from '../components/icons/LogDot'
  import Posts from '../components/organisms/Posts'

  export let posts = []
</script>

<style>
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: calc(var(--baseline) * 5rem);
    font-size: 5rem;

    color: var(--color-primary);
  }

  .logo > :first-child {
    flex-basis: calc(var(--baseline) * 3rem);
  }

  .name {
    font-size: 1rem;
    line-height: calc(var(--baseline) * 1rem);

    font-weight: 500;
  }

  .recent-posts {
    margin-top: calc(var(--baseline) * 5rem - 1px);
    border-top: 1px solid var(--color-fg-light);
  }
</style>

<svelte:head>
  <title>log.pocka.io</title>
</svelte:head>

<section class="logo">
  <LogDot />
  <span class="name">pocka.io</span>
</section>

<section class="recent-posts">
  <h1>Recent posts</h1>

  <Posts {posts} />
</section>
