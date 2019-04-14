import { storiesOf } from '@storybook/html'
import centered from '@storybook/addon-centered/html'
import { boolean, number } from '@storybook/addon-knobs'

import './register'

import notes from '!raw-loader!./README.md'

storiesOf('x-hamburger', module)
  .addDecorator(centered)
  .add(
    'Preview',
    () => `
      <x-hamburger
        style="font-size:${number('Font size(CSS)', 20)}px"
        expanded="${boolean('Expanded', false)}"
      />
    `,
    { notes }
  )
