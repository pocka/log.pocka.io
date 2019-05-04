import { storiesOf, forceReRender } from '@storybook/html'
import centered from '@storybook/addon-centered/html'
import { boolean, color, number } from '@storybook/addon-knobs'

import README from './README.md'

import './register'

if (module.hot) {
  module.hot.decline()
}

storiesOf('components|atoms', module)
  .addDecorator(centered)
  .add(
    'x-hamburger',
    () => {
      const styles = [
        `font-size: ${number('font-size(CSS)', 50)}px`,
        `color: ${color('color(CSS)', '#333')}`
      ].join(';')

      return `
      <x-hamburger
        style="${styles}"
        expanded="${boolean('expanded') ? 'expanded' : ''}"
      />`
    },
    {
      notes: README
    }
  )
