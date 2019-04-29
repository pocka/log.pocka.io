import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { boolean, number, text } from '@storybook/addon-knobs'

import { Galaxy } from '.'

const Ball = ({ index }) => (
  <i
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      background: 'red',
      color: 'white',
      borderRadius: '50%'
    }}
  >
    {index + 1}
  </i>
)

storiesOf('molecules|Galaxy', module)
  .addDecorator(fn => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20
      }}
    >
      {fn()}
    </div>
  ))
  .add('default', () => (
    <Galaxy
      degree={number('degree', 360)}
      radius={text('radius', '100px')}
      centerItem={boolean('centerItem', true) && <span>CENTER</span>}
    >
      {new Array(number('Item count', 5)).fill(0).map((_, i) => (
        <Ball key={i} index={i} />
      ))}
    </Galaxy>
  ))
