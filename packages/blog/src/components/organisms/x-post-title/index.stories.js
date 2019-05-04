import { storiesOf } from '@storybook/html'
import centered from '@storybook/addon-centered/html'
import { text, number } from '@storybook/addon-knobs'

import { format } from 'date-fns'
import { lorem } from 'faker'

import './register'

import README from './README.md'

if (module.hot) {
  module.hot.decline()
}

const defaultTitle = lorem.words()
const defaultDate = format(new Date(), 'YYYY-MM-DD')

storiesOf('components|organisms', module)
  .addDecorator(centered)
  .add(
    'x-post-title',
    () => {
      return `
      <x-post-title
        post-title="${text('post-title', defaultTitle)}"
        updated-at="${text('updated-at', defaultDate)}"
        tags="${new Array(number('tags(count)', 5))
          .fill(0)
          .map((_, i) => `tag${i + 1}`)
          .join(',')}"
        href="/"
      />
    `
    },
    {
      notes: README
    }
  )
