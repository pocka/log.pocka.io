# `<x-nav/>`

Navigation menu.

## Usage

```js
import '~/components/organisms/x-nav/register'

document.body.innerHTML = `
  <x-nav page-title="foo">
    <a href="/foo">Foo</a>
    <a href="/bar">Bar</a>
    <a href="/baz">Baz</a>
  </x-nav>
`
```

## Attributes

| Name         | Type     | Description                |
| ------------ | -------- | -------------------------- |
| `page-title` | `string` | Title of the current page. |

## Slots

| Name         | Description |
| ------------ | ----------- |
| default slot | Menu items. |
