---
name: introduce-storybook-addon-designs
title: storybook-addon-designsの紹介
description: Storybook向けのアドオンについての紹介
createdAt: 2019-03-28T14:00:00.000Z
updatedAt: 2019-03-28T14:00:00.000Z
tags:
  - blog
  - storybook
  - javascript
  - figma
---

# Intro

今日は Storybook の新しいアドオン、[storybook-addon-designs](https://github.com/pocka/storybook-addon-designs) を紹介します。
このアドオンは Figma のライブプレビューや PDF、画像を Storybook のアドオンパネルに埋め込んで表示できるアドオンです。

当初は、既にメンテナンスされておらず新しい Storybook に対応していない[storybook-addon-figma](https://github.com/hharnisc/storybook-addon-figma)の代替として開発されました。
しかし、コンセプト的に Figma 以外にも応用できそうだとわかったため、PDF や画像の埋め込みにも対応した、汎用デザインプレビューアドオンとして開発することになりました。

実際にどんなものか見てみたい、という場合は[オンラインデモ](https://pocka.github.io/storybook-addon-designs)があるのでこちらをどうぞ。

# Why?

Storybook を使ったコンポーネント駆動開発では、コンポーネント単位で見た目や動きの確認をすることができます。
特に複数人で作業している場合やデザイナーがチェックを行う場合等はこれに加えて、PullRequest でのブランチデプロイ(Zeit now や Netlify 等)を使うと非常に高い DX を実現することができます。

このようなフローを採用する際に気になってくるのがデザインと照らし合わせるコストです。

Storybook によってコンポーネントのルックアップは圧倒的に簡単になりましたが、各コンポーネントに対応したデザインを参照する手間は消えません。この問題を解決するために、「コンポーネントの Story 上に該当するデザインを表示する」というのがこのアドオンの役割となります。

これにより、コンポーネントが Web 上だけで、かつページ移動なしに確認できるようになります。

# Usage

Storybook の v5 以上に対応しています。

```shell
yarn add -D storybook-addon-designs

# yarnを使わない場合
npm install --save-dev storybook-addon-designs
```

インストールしたらアドオンを登録し、

```js
// .storybook/addons.js
import "storybook-addon-designs/register";
```

各 Story にパラメータを渡してあげるだけです。

```js
// Storyを書くファイル
import { withDesign } from "storybook-addon-designs";

storiesOf("My stories", module)
  .addDecorator(withDesign)
  .add("My awesome story", () => <Button>Hello, World!</Button>, {
    design: {
      type: "figma",
      url: "<FigmaのURL>",
    },
  });
```

# And you...

このアドオンは OSS として公開されているため、不具合や要望等あれば気軽に Issue や PullRequest を立ててください！
もし「英語できないよ！！」という場合は[Twitter](https://twitter.com/pockaquel)で言ってもらえば Issue 作成やお手伝い等します。
