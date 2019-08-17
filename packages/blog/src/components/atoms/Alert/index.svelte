<script>
  import ExclamationCircle from '../../icons/ExclamationCircle'
  import ExclamationTriangle from '../../icons/ExclamationTriangle'
  import Info from '../../icons/Info'

  export let level = 'info'

  $: Icon = (() => {
    switch (level) {
      case 'warning':
        return ExclamationTriangle
      case 'danger':
        return ExclamationCircle
      case 'info':
      default:
        return Info
    }
  })()

  $: label = (() => {
    switch (level) {
      case 'danger':
        return '注意'
      case 'warning':
        return '警告'
      case 'info':
      default:
        return '情報'
    }
  })()
</script>

<style>
  .alert {
    display: flex;
    align-items: center;

    border-radius: 0.4rem;
  }

  .alert:not(:first-child) {
    margin-top: calc(var(--baseline) * 1em);
  }

  .icon {
    padding: 0 1em;
  }

  .content {
    margin: 0;
    padding: calc(var(--baseline) * 0.5em) 1em;
    padding-left: 0;
  }

  .info {
    background-color: var(--color-primary);
    color: #eff1f3;
  }

  .warning {
    background-color: var(--color-secondary);
    color: #231c07;
  }

  .danger {
    background-color: #ff4422;
    color: #eff1f3;
  }
</style>

<div class={`alert ${level}`} role="alert">
  <i class="icon" aria-label={label}><Icon/></i>
  <p class="content"><slot/></p>
</div>