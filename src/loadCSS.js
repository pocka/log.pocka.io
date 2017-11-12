/**
 * Load CSSs
 * @returns {Promise<>}
 */
const loadCSS = hrefs => {
  const insertTarget = document.querySelector('head')
  const insertBase = insertTarget.querySelector('title')

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

  window.setTimeout(() => {
    elements.forEach(el => {
      insertTarget.insertBefore(el, insertBase)
    })
  }, 0)

  return Promise.all(promises)
}

export default loadCSS