<script>
  import GitHub from '../../icons/GitHub'
  import LogDot from '../../icons/LogDot'
  import Twitter from '../../icons/Twitter'
</script>

<style>
  .container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: calc(var(--baseline) * 1rem) 1em;
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0;
    margin: 0;
    height: calc(var(--baseline) * 2rem);

    list-style: none;
  }

  .nav > :first-child {
    display: inline-flex;
  }

  .nav > :not(:first-child) {
    margin-left: 1em;
  }

  .spacer {
    flex-grow: 1;
  }

  .brand {
    display: inline-flex;
    font-size: 2rem;
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: calc(var(--baseline) * 3rem);
    line-height: calc(var(--baseline) * 1rem);
    font-size: 0.8em;
  }

  .footer > :not(:first-child) {
    margin-left: 0.5em;
  }
</style>

<div class="container">
  <header>
    <nav>
      <ul class="nav">
        <li>
          <a class="brand" href="/" rel="preload" aria-label="Top page">
            <LogDot />
          </a>
        </li>
        <li class="spacer" aria-hidden="true" />
        <li>
          <a href="/posts/" rel="preload">Posts</a>
        </li>
        <li>
          <a href="/about/" rel="preload">About</a>
        </li>
        <li>
          <a href="https://github.com/pocka" target="_blank" rel="noopener">
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <slot />
  </main>
  <footer class="footer">
    <small>© 2019 pocka</small>
    <a
      href="https://github.com/pocka"
      target="_blank"
      rel="noopener"
      title="@pocka on GitHub">
      <GitHub />
    </a>
    <a
      href="https://twitter.com/pockaquel"
      target="_blank"
      rel="noopener"
      title="@pockaquel on Twitter">
      <Twitter />
    </a>
  </footer>
</div>
