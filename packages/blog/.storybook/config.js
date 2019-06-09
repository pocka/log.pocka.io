import { addDecorator, addParameters, configure } from '@storybook/svelte'

import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import '../src/global.css'
import '../src/async-resources'

addDecorator(withA11y)
addDecorator(withKnobs)

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
})

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
