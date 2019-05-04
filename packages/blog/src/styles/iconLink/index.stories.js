import { storiesOf } from '@storybook/html'
import centered from '@storybook/addon-centered/html'
import { color, number } from '@storybook/addon-knobs'

import { iconLink } from '.'

import README from './README.md'

storiesOf('styles|iconLink', module)
  .addDecorator(centered)
  .add(
    'default',
    () => {
      const style = [
        `font-size: ${number('font-size(CSS)', 50)}px`,
        `color: ${color('color(CSS)', '#000')}`
      ].join(';')

      return `
        <a class="${iconLink}" style="${style}" tabindex="0">
          <span>A</span>
        </a>
      `
    },
    {
      notes: README
    }
  )
