---
title: About
description: このサイトについて
createdAt: 2020-12-17T04:00:00+09:00
updatedAt: 2020-12-17T04:00:00+09:00
---

同じことを繰り返さないための備忘録として、自分の知識を周りと共有するためのプチナレッジベースとして書いている技術ブログです。 一応技術ブログですがゲームや VR、ガジェット等関係ないことも書かれる可能性があります。

# 書いているひと

[株式会社 Impressive](https://impv.co.jp) に所属しているフロントエンドエンジニアです。
主にフロントエンドのおしごとがメインですがそれ以外もやります。

- GitHub: [@pocka](https://github.com/pocka)
- Twitter: [@pockaquel](https://twitter.com/pockaquel)

# サイトのしくみ

Next.js を使って静的出力しています。
各記事は Markdown で書かれており、Remark と Rehype を使って HAST (HTML の AST、構文木) をビルド時に生成、`rehype-react`を使ってランタイムで React コンポーネントとして表示しています。
詳細は [GitHub 上のソースコード](https://github.com/pocka/log.pocka.io)を参照してください。

## 使用フォント

| 適用文字種別        | フォント                                                       |
| ------------------- | -------------------------------------------------------------- |
| ラテン (英数字)     | [Inter](https://fonts.google.com/specimen/Inter)               |
| 等幅ラテン (英数字) | [Ubuntu Mono](https://fonts.google.com/specimen/Ubuntu+Mono)   |
| 日本語              | [Noto Sans JP](https://fonts.google.com/specimen/Noto+Sans+JP) |

## CSS

スクラッチで書いています。
コンポーネントのスタイルは基本的にレイアウトのみで、要素セレクタでスタイルを当てる漢 CSS です。

Vertical Rhythm を使って縦のレイアウトを揃えています。
要素に当たっている `calc(var(--baseline) * Nrem)` でリズムを整えています。

## シンタックスハイライト

Markdown のビルド時に Prism.js でハイライトしています。CSS のテーマは [`prism-themes`](https://github.com/PrismJS/prism-themes) の `a11y-dark` を使っています。
