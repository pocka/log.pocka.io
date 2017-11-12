/**
 * Load CSSs
 * @returns {Promise<>}
 */
const loadCSS = () => {
  const insertTarget = document.querySelector('head')
  const insertBase = insertTarget.querySelector('title')

  const hrefs = [...document.querySelectorAll('link[rel="preload"][as="style"]')].map(el => el.href)

  let elements = hrefs.map(href => {
    let el = document.createElement('link')

    el.rel = "stylesheet"
    el.href = href

    return el
  })

  const promises = elements.map(element => {
    return new Promise(resolve => {
      element.onload = () => resolve()
    })
  })

  requestAnimationFrame(() => {
    elements.forEach(el => {
      insertTarget.insertBefore(el, insertBase)
    })
  })

  return Promise.all(promises)
}

export default loadCSS
