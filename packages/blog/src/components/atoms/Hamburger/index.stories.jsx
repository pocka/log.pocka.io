import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered'
import { boolean, color, number } from '@storybook/addon-knobs'

import { Hamburger } from '.'

storiesOf('atoms|Hamburger', module)
  .addDecorator(centered)
  .add('default', () => (
    <Hamburger
      expanded={boolean('Expanded', false)}
      style={{
        fontSize: number('font-size(CSS)', 20),
        color: color('color(CSS)', '#000')
      }}
    />
  ))
