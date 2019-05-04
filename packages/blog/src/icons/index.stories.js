import { storiesOf } from '@storybook/html'
import { color, number } from '@storybook/addon-knobs'

import * as icons from '.'

import README from './README.md'

storiesOf('icons|All', module).add(
  'list',
  () => {
    const wrapperStyle = [
      'display: grid',
      'grid-template-columns: repeat(auto-fill, 1em)',
      'grid-gap: 0.5em',
      'padding: 0.5em',
      `font-size: ${number('font-size(CSS)', 50)}px`,
      `color: ${color('color(CSS)', '#000')}`
    ].join(';')

    return `
      <div style="${wrapperStyle}">
      ${Object.keys(icons)
        .map(key => `<i title="${key}">${icons[key]}</i>`)
        .join('')}
      </div>
    `
  },
  {
    notes: README
  }
)
