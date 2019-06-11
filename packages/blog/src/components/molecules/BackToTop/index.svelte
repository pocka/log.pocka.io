<script>
  import { onMount } from 'svelte'
  let scrollDetector
  let isOnTop = true

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => {
      isOnTop = entry.isIntersecting
    })

    observer.observe(scrollDetector)

    return () => observer.disconnect()
  })

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }
</script>

<style>
  .scroll-detector {
    position: absolute;
    top: 0;
  }

  .button {
    position: fixed;
    right: 1em;
    bottom: 1em;
    border: 0 none;
    outline: 0;
    padding: 0.1em 0.5em;

    background-color: var(--color-primary);
    color: var(--color-bg);
    border-radius: 0.3em;
    font-weight: 500;
    cursor: pointer;

    transition: opacity 0.2s ease;
  }

  .button[aria-hidden='true'] {
    opacity: 0;
  }

  @media (max-width: 799.98px) {
    .button {
      font-size: 1.5em;
      right: 0.2em;
      bottom: 0.2em;

      border-radius: 50%;
    }

    .button-label {
      display: none;
    }
  }
</style>

<i bind:this={scrollDetector} class="scroll-detector" aria-hidden="true" />

<button
  class="button"
  aria-hidden={isOnTop ? 'true' : 'false'}
  aria-label="Scroll back to top"
  on:click={scrollToTop}>
  <span class="arrow">↑</span>
  <span class="button-label">Back to top</span>
</button>
