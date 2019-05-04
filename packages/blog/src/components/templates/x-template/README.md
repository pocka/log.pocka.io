# `<x-template/>`

Blog layouts.

## Usage

```js
import '~/components/templates/x-templates/register'

document.body.innerHTML = `
  <x-template hide-logo>
    <nav slot="nav"/>
    <p>content</p>
  </x-template>
`
```

## Attributes

| Name        | Type                       | Description           |
| ----------- | -------------------------- | --------------------- |
| `hide-logo` | `"hide-logo"`, `undefined` | Whether to hide logo. |

## Slots

| Name         | Description       |
| ------------ | ----------------- |
| default slot | Page contents.    |
| `nav`        | Navigation items. |
