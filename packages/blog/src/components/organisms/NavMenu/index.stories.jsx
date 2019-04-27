import React from 'react'

import { storiesOf } from '@storybook/react'
import { radios, text } from '@storybook/addon-knobs'

import { NavMenu, NavMenuItem } from '.'

storiesOf('organisms|NavMenu', module)
  .addDecorator(fn => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: 'tomato'
      }}
    >
      {fn()}
    </div>
  ))
  .add('default', () => {
    const active = radios('Active', ['none', 'foo', 'bar', 'baz'], 'none')

    return (
      <NavMenu title={text('Title', 'Title')}>
        <NavMenuItem active={active === 'foo'} href="/foo">
          foo
        </NavMenuItem>
        <NavMenuItem active={active === 'bar'} href="/bar">
          bar
        </NavMenuItem>
        <NavMenuItem active={active === 'baz'} href="/baz">
          baz
        </NavMenuItem>
      </NavMenu>
    )
  })
