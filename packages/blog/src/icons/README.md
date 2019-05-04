# icons

Easy to use SVG icons.

Every icons should use `currentColor` for its `fill`/`stroke` and `height: 1em`. Users can use them just by setting `color` property for it or its ancestor and `font-size` property.

## Usage

```js
import { logo } from '~/icons'

// Every SVGs in this project is imported as inline string (e.g. <svg>).
document.body.innerHTML = `
  <div>
    ${logo}
  </div>
`
```
