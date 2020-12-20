---
title: About
description: About this site
createdAt: 2020-12-17T04:00:00+09:00
updatedAt: 2020-12-17T04:00:00+09:00
---

My knowledge base and place to practice English writing.
Basically I write tech posts here, but you may see some generic blog posts too.

# Author

A front-end engineer at [Impressive, Inc. (Japan)](https://impv.co.jp).
Covers front-end (React+TypeScript for the most and sometime use Elm, Vue, etc...) and backend (Mainly Node.js, Golang).

- GitHub: [@pocka](https://github.com/pocka)
- Twitter: [@pockaquel](https://twitter.com/pockaquel)

# How this site works

Statically generated by Next.js.
Next.js generates HAST (HTML AST) from Markdown posts using Remark and Rehype at compile time then React (runtime) generates components from the HAST via `rehype-react`.
For more info, please refer to [the repository](https://github.com/pocka/log.pocka.io).

## Fonts

| Style        | Font                                                         |
| ------------ | ------------------------------------------------------------ |
| Proportional | [Inter](https://fonts.google.com/specimen/Inter)             |
| Monospaced   | [Ubuntu Mono](https://fonts.google.com/specimen/Ubuntu+Mono) |

## CSS

Written from scratch.
Only layout things in components' styles.
Most of styles are done by element selectors :)

Are you curious about `calc(var(--baseline) * Nrem)` stuffs?
It's Vertical Rhythm.
There are many great articles explaining the technique so I would recommend you to search if you interested.

## Syntax Highlighting

Prism.js. Theme is `a11y-dark` from [`prism-themes`](https://github.com/PrismJS/prism-themes).