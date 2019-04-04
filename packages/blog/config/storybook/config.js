import { addDecorator, configure } from '@storybook/html'

import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { withDesign } from 'storybook-addon-designs'

addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator(withDesign)

// automatically import all files ending in *.stories.js
const req = require.context('../../src', true, /\.stories\.jsx?$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
