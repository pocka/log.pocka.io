<script>
  export let tags = []
</script>

<style>
  .tags {
    font-size: 0.8em;
  }

  .tag {
    color: var(--color-fg-sub);
    text-decoration: none;
    font-weight: 400;
  }
  .tag:hover {
    text-decoration: underline;
  }
  .tag::before {
    content: '#';
  }
  .tag:not(:first-of-type) {
    margin-left: 0.5em;
  }
</style>

<div class="tags">
  {#each tags as tag (tag)}
    <a
      class="tag"
      href="/tags/{tag}/"
      rel="prefetch"
      title={`Posts tagged by "${tag}"`}>
      {tag}
    </a>
  {/each}
</div>
