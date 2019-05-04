import { storiesOf } from '@storybook/html'
import { boolean, number } from '@storybook/addon-knobs'

import { lorem } from 'faker'

import './register'
import '~/components/organisms/x-nav/register'

import README from './README.md'

if (module.hot) {
  module.hot.decline()
}

storiesOf('components|templates', module).add(
  'x-template',
  () => {
    return `
        <x-template
          hide-logo="${boolean('hide-logo', false)}"
          style="color:var(--color-fg)"
        >
          <x-nav slot="nav" page-title="${lorem.words()}">
            <a href="/foo">foo</a>
            <a href="/bar">bar</a>
            <a href="/baz">baz</a>
          </x-nav>

          <h1>${lorem.words()}</h1>

          ${lorem
            .paragraphs(number('Paragraph count', 10), '\n')
            .split('\n')
            .map(p => `<p>${p}</p>`)
            .join('')}
        </x-template>
      `
  },
  {
    notes: README
  }
)
