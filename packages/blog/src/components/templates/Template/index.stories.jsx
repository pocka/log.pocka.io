import React from 'react'

import { storiesOf } from '@storybook/react'
import { number, text } from '@storybook/addon-knobs'

import { lorem } from 'faker'

import { Template } from '.'
import { NavMenuItem } from '~/components/organisms/NavMenu'

storiesOf('templates|Template', module).add('default', () => (
  <Template
    title={text('Title', 'title')}
    navMenuItems={
      <>
        <NavMenuItem href="/">foo</NavMenuItem>
        <NavMenuItem href="/">bar</NavMenuItem>
        <NavMenuItem href="/">baz</NavMenuItem>
      </>
    }
  >
    <p>HEAD</p>
    {lorem
      .paragraphs(number('Paragraph count', 5), '\n')
      .split('\n')
      .map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    <p>TAIL</p>
  </Template>
))
