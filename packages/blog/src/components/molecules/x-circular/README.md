# `<x-circular/>`

Circular layout slotted items.

NOTE: Each children locates based on its center. You need to add the half of the size of them to parent container's margin.

## Usage

```js
import '~/components/molecules/x-circular/register'

document.body.innerHTML = `
  <x-circular radius="50%" degree="360"/>
`
```

## Attributes

| Name     | Type               | Description           |
| -------- | ------------------ | --------------------- |
| `radius` | `string`, `number` | Radius of the circle. |
| `degree` | `number`           | Degree of the circle. |
