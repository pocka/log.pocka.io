import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { text, number } from '@storybook/addon-knobs'

import { lorem } from 'faker'

import { PostTitle } from '.'

const defaultTitle = lorem.words()

storiesOf('organisms|PostTitle', module)
  .addDecorator(centered)
  .add('default', () => (
    <PostTitle
      title={text('title', defaultTitle)}
      updatedAt={text('updatedAt', '2019-01-01')}
      tags={new Array(number('tags(count)', 5))
        .fill(0)
        .map((_, i) => `tag${i + 1}`)}
      url="/"
    />
  ))
