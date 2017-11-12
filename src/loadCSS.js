const createID = index => `async_css__${index}`
/**
 * Load CSSs
 * @returns {Promise<>}
 */
const loadCSS = hrefs => {
  const insertTarget = document.querySelector('head')
  const insertBase = insertTarget.querySelector('title')

  let elements = hrefs.map((_, i) => {
    const id = createID(i)

    let el = document.createElement('style')

    return el
  })

  elements.forEach(el => {
    insertTarget.insertBefore(el, insertBase)
  })

  const promises = hrefs.map((href, i) => fetch(href).then(resp => {
    if (resp.status !== 200) {
      return Promise.resolve('')
    }

    return resp.text()
  }).then(style => {
    elements[i].innerText = style
  }).catch(err => {
    console.error(`Failed to load CSS <${href}>: ${err.message}`)
  }))

  return Promise.all(promises)
}

export default loadCSS
