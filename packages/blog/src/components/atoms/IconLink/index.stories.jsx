import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { color, number, text } from '@storybook/addon-knobs'

import { IconLink } from '.'
import { TypeScript } from '~/components/icons/TypeScript'

storiesOf('atoms|IconLink', module)
  .addDecorator(centered)
  .add('default', () => (
    <IconLink
      href={text('href', 'https://google.com')}
      label={text('label', 'Label')}
      style={{
        fontSize: number('font-size(CSS)', 50),
        color: color('color(CSS)', '#000')
      }}
    >
      <TypeScript />
    </IconLink>
  ))
