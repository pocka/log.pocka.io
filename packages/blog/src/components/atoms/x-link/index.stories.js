import { storiesOf } from '@storybook/html'
import centered from '@storybook/addon-centered/html'
import { text } from '@storybook/addon-knobs'

import README from './README.md'

import './register'

if (module.hot) {
  module.hot.decline()
}

storiesOf('components|atoms', module)
  .addDecorator(centered)
  .add(
    'x-link',
    () => {
      return `
      <a is="x-link" href="${text('href', '/')}">foo</a>`
    },
    {
      notes: README
    }
  )
