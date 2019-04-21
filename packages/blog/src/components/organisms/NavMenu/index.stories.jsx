import React from 'react'

import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import { NavMenu, NavMenuItem } from '.'

storiesOf('organisms|NavMenu', module).add('default', () => (
  <NavMenu title={text('Title', 'Title')}>
    <NavMenuItem href="/foo">foo</NavMenuItem>
    <NavMenuItem href="/bar">bar</NavMenuItem>
    <NavMenuItem href="/baz">baz</NavMenuItem>
  </NavMenu>
))
