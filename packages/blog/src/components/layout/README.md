# `<x-layout>`

The element places navigation, main, aside.
Its style changes according to device width.

## Usage

```html
<x-layout>
  <nav slot="nav">
    <ul>
      <!-- ... -->
    </ul>
  </nav>

  <p>Hello, World!</p>

  <aside slot="aside">
    <small>
      Copyright
      <!-- ... -->
    </small>
  </aside>
</x-layout>
```

## Slots

| name    | description                              |
| ------- | ---------------------------------------- |
| default | Main contents                            |
| `nav`   | Navigation area                          |
| `aside` | Right side pane. Hidden in mobile layout |
