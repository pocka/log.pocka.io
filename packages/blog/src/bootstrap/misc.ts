const loadWebFont = (url: string) => {
  fetch(url)
    .then(resp => resp.text())
    .then(text => {
      const css = text.replace(/}/g, 'font-display:swap;}')

      const node = document.createElement('style')

      node.textContent = css

      document.querySelector('head')!.appendChild(node)
    })
}

loadWebFont(
  'https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,500|Roboto:400,500'
)
