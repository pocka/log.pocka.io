import React from 'react'

import { storiesOf } from '@storybook/react'
import { boolean, number, text } from '@storybook/addon-knobs'

import { lorem } from 'faker'

import { Template } from '.'
import { Heading } from '~/components/atoms/Heading'
import { Paragraph } from '~/components/atoms/Paragraph'
import { NavMenuItem } from '~/components/organisms/NavMenu'

storiesOf('templates|Template', module).add('default', () => (
  <Template
    showLogo={boolean('showLogo', true)}
    title={text('Title', 'title')}
    navMenuItems={
      <>
        <NavMenuItem href="/">foo</NavMenuItem>
        <NavMenuItem href="/">bar</NavMenuItem>
        <NavMenuItem href="/">baz</NavMenuItem>
      </>
    }
  >
    <Heading>Head</Heading>
    {lorem
      .paragraphs(number('Paragraph count', 5), '\n')
      .split('\n')
      .map((p, i) => (
        <Paragraph key={i}>{p}</Paragraph>
      ))}
    <Heading>Tail</Heading>
  </Template>
))
