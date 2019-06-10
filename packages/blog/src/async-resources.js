requestAnimationFrame(() => {
  const head = document.querySelector('head')

  const googleFontsCss = head.querySelector('[data-async-resource-ga]')

  if (!googleFontsCss) {
    const el = document.createElement('link')

    el.rel = 'stylesheet'
    el.href =
      'https://fonts.googleapis.com/css?family=Hind+Siliguri:400,500|Inconsolata|M+PLUS+Rounded+1c:400,500&display=swap'
    el.dataset.asyncResourceGa = 'true'

    head.appendChild(el)
  }
})
