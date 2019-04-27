import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { color, number } from '@storybook/addon-knobs'

import { Logo } from '.'

storiesOf('atoms|Logo', module)
  .addDecorator(centered)
  .add('default', () => (
    <Logo
      style={{
        fontSize: number('font-size(CSS)', 100),
        color: color('color(CSS)', '#000')
      }}
    />
  ))
