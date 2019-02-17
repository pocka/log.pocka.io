import './scss/global.scss?inject'

const container = document.getElementById('app')!

const setDescription = (description: string = '') => {
  const tag =
    document.querySelector('meta[name="description"]') ||
    (() => {
      const meta = document.createElement('meta')

      meta.setAttribute('name', 'description')

      document.querySelector('head')!.appendChild(meta)

      return meta
    })()

  tag.setAttribute('content', description)
}

const render = (ssr = false) => {
  const path = location.pathname.replace(/(.+)\/$/, '$1')

  const load = (() => {
    switch (path) {
      case '/':
        return import('./pages/top')
      default:
        return import('./pages/notfound')
    }
  })()

  if (!ssr) {
    load.then(({ default: { render, description } }) => {
      container.innerHTML = ''

      setDescription(description)

      render(container)
    })
  }
}

window.addEventListener('popstate', () => {
  render()
})

render(!!document.body.dataset.prerendered)

export default async () => {
  document.body.dataset.prerendered = 'true'
}
