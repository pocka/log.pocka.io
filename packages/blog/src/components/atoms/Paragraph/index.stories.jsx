import React from 'react'

import { storiesOf } from '@storybook/react'

import { lorem } from 'faker'

import { Paragraph } from '.'

storiesOf('atoms|Paragraph', module).add(
  'default',
  () => (
    <>
      {lorem
        .paragraphs(10, '\n')
        .split('\n')
        .map(p => (
          <Paragraph>{p}</Paragraph>
        ))}
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
