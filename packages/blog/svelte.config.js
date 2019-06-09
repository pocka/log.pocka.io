const fs = require('fs')
const path = require('path')

const postcss = require('postcss')
const postcssrc = require('postcss-load-config')

module.exports = {
  preprocess: {
    style({ content, attributes, filename }) {
      if (attributes.src) {
        const file = path.resolve(path.dirname(filename), attributes.src)

        content = `@global { ${fs.readFileSync(file).toString()} }`
      }

      return postcssrc().then(({ plugins, options }) =>
        postcss(
          attributes.src
            ? [require('postcss-svelte-cascade'), ...plugins]
            : plugins
        )
          .process(content, {
            ...options,
            from: filename
          })
          .then(result => ({ code: result.css, map: result.map }))
          .catch(err => {
            console.log('Failed to preprocess style', err)
            return
          })
      )
    }
  }
}
