# `<x-post-title/>`

Post heading. A set of post's meta.

## Usage

```js
import '~/components/organisms/x-post-title/register'

document.body.innerHTML = `
  <x-post-title
    post-title="Foo"
    updated-at="2019-01-01"
    tags="foo,bar,baz"
    href="/"
  />
`
```

## Attributes

| Name         | Type                             | Description                                |
| ------------ | -------------------------------- | ------------------------------------------ |
| `post-title` | `string`                         | Title of the post.                         |
| `updated-at` | `string`(Parsable by `date-fns`) | Post last updated at.                      |
| `tags`       | list (comma separated strings)   | A list of tags.                            |
| `href`       | `string`                         | Where to jump when user clicks post title. |
