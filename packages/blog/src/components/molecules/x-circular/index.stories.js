import { storiesOf } from '@storybook/html'
import { number, text } from '@storybook/addon-knobs'

import './register'

import README from './README.md'

if (module.hot) {
  module.hot.decline()
}

storiesOf('components|molecules', module)
  .addDecorator(fn => {
    const style = [
      'position: fixed',
      'top: 0',
      'right: 0',
      'bottom: 0',
      'left: 0',
      'display: flex',
      'justify-content: center',
      'align-items: center',
      'font-size: 20px'
    ].join(';')

    return `<div style="${style}">${fn()}</div>`
  })
  .add(
    'x-circular',
    () => {
      const ballStyle = [
        'display: flex',
        'justify-content: center',
        'align-items: center',
        'width: 50px',
        'height: 50px',
        'background: red',
        'color: white',
        'border-radius: 50%'
      ].join(';')

      return `
      <x-circular radius="${text('radius', '30%')}" degree="${number(
        'degree',
        360
      )}">
        ${new Array(number('Item count', 5))
          .fill(0)
          .map((_, i) => `<i style="${ballStyle}">${i + 1}</i>`)
          .join('')}
      </x-circular>
    `
    },
    {
      notes: README
    }
  )
