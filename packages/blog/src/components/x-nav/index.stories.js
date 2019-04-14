import { storiesOf } from '@storybook/html'

import faker from 'faker'

import '~/components/x-layout/register'
import './register'

import notes from '!raw-loader!./README.md'

storiesOf('x-nav', module).add(
  'Preview',
  () => `
    <x-layout>
      <x-nav slot="nav">
        <ul>
          <li>foo</li>
          <li>bar</li>
          <li>baz</li>
        </ul>
      </x-nav>
      ${faker.lorem
        .paragraphs(100, '\n')
        .split('\n')
        .map(lorem => `<p>${lorem}</p>`)
        .join('')}
      <aside slot="aside">
        Baz
      </aside>
    </x-layout>
  `,
  { notes }
)
