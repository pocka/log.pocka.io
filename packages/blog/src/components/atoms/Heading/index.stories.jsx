import React from 'react'

import { storiesOf } from '@storybook/react'

import { Heading } from '.'

storiesOf('atoms|Heading', module).add(
  'default',
  () => (
    <>
      <Heading level="1">Heading1</Heading>
      <Heading level="2">Heading2</Heading>
      <Heading level="3">Heading3</Heading>
      <Heading level="4">Heading4</Heading>
      <Heading level="5">Heading5</Heading>
      <Heading level="6">Heading6</Heading>
    </>
  ),
  {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/NnSzXfxfHCkjUSzEErcceTti/log.pocka.io?node-id=201%3A0'
    }
  }
)
