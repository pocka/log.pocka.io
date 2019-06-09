<script>
  import Tags from '../../molecules/Tags'

  export let posts = []

  let cursor = 1
  export let windowSize = 15

  $: rangedPosts = posts.slice(0, cursor * windowSize)

  const increaseWindow = () => {
    cursor += 1
  }

  $: hasMore = cursor * windowSize < posts.length
</script>

<style>
  .posts {
    margin-top: calc(var(--baseline) * 2rem);
  }

  .post:not(:first-of-type) {
    margin-top: calc(var(--baseline) * 1rem);
  }

  .title {
    font-size: 1.1em;
  }

  .date {
    font-size: 0.8em;
  }

  .load-more {
    appearance: none;
    background: transparent;
    padding: 0;
    margin: 0;
    border: 0 none;

    display: block;
    margin-top: calc(var(--baseline) * 2rem);
    width: 100%;

    cursor: pointer;
    text-align: center;
    text-decoration: underline;
  }
</style>

<ul class="posts">
  {#each rangedPosts as post (post.name)}
    <li class="post">
      <a class="title" rel="prefetch" href="/posts/{post.name}/">
         {post.title}
      </a>
      <span class="date">({post.updatedAtFormatted})</span>
      <Tags tags={post.tags} />
    </li>
  {/each}
</ul>

{#if hasMore}
  <button class="load-more" on:click={increaseWindow}>more...</button>
{/if}
