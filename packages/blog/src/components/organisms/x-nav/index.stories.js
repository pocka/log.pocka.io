import { storiesOf } from '@storybook/html'
import { text } from '@storybook/addon-knobs'

import './register'

import README from './README.md'

if (module.hot) {
  module.hot.decline()
}

storiesOf('components|organisms', module)
  .addDecorator(
    fn => `<div style="position:fixed;width:100%;height:100%">${fn()}</div>`
  )
  .add(
    'x-nav',
    () => {
      return `<x-nav page-title="${text('page-title', 'Title')}">
      <a href="/foo">foo</a>
      <a href="/bar">bar</a>
      <a href="/baz">baz</a>
    </x-nav>`
    },
    {
      notes: README
    }
  )
