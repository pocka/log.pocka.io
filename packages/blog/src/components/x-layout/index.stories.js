import { storiesOf } from '@storybook/html'

import faker from 'faker'

import './register'

import notes from '!raw-loader!./README.md'

storiesOf('x-layout', module).add(
  'Preview',
  () => `
    <x-layout>
      <nav slot="nav">
        Foo
      </nav>
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
