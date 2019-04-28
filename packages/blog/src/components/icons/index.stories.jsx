import React from 'react'

import { storiesOf } from '@storybook/react'
import { color, number } from '@storybook/addon-knobs'

const components = [
  require('./Nuxt').default,
  require('./TypeScript').default,
  require('./WebComponents').default
]

storiesOf('icons|icons', module).add('list', () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 1em)',
      gridGap: '1em',
      padding: '0.5em',
      color: color('color(CSS)', '#000'),
      fontSize: number('font-size(CSS)', 50)
    }}
  >
    {components.map(C => (
      <i title={C.name}>
        <C />
      </i>
    ))}
  </div>
))
