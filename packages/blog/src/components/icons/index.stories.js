import { storiesOf } from '@storybook/svelte'

import { color, number } from '@storybook/addon-knobs'

import Story from './Story'

storiesOf('icons|All', module).add('List', () => ({
  Component: Story,
  props: {
    style: [
      `font-size: ${number('font-size(style)', 50)}px`,
      `color: ${color('color(style)', '#000')}`
    ].join(';')
  }
}))
