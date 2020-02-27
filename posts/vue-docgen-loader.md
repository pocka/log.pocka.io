---
name: vue-docgen-loader
title: 'Storybook for VueのDocs Addonの裏側: コンポーネントの自動ドキュメント生成について'
description: Storybook Docs Addonでどのようにコンポーネントのドキュメントを自動生成しているか、またそのツールを使った独自のドキュメント作成についてなど
createdAt: 2020-02-27T18:00:00.000+09:00
updatedAt: 2020-02-27T18:00:00.000+09:00
tags:
  - blog
  - vue.js
  - webpack
  - storybook
---

# はじめに

Storybook の公式アドオンである Addon Docs は、[5.3 から Vue(や Angular や Web Components)におけるコンポーネントドキュメントの自動生成機能がサポート](https://medium.com/storybookjs/storybook-docs-for-new-frameworks-b1f6090ee0ea)されるようになりました。
これは、コンポーネントを指定するだけでその Props や Events, Slots の型やコメントがドキュメントとして生成できる、というものです。

この記事では、如何にして Vue 版のドキュメントが自動生成されているのか、またその仕組みを Storybook 以外で使うことについて説明します。

# コンポーネントの情報抽出

ドキュメントを自動生成するには、まずどうにかしてコンポーネントの(Props 等)を取得、またそれらに対して書かれたコメントを抽出する必要があります(メタ情報の抽出)。
この工程をまるっと行ってくれるのが、Vue Styleguidist<sup>※1</sup>というプロジェクトの[`vue-docgen-api`](https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api)というライブラリです。

`vue-docgen-api`はコンポーネントファイルを読み込み、その内容を解析して JSON として出力してくれます。

```html
<!-- Foo.vue -->

<template>
  <div>
    <!-- @slot my slot -->
    <slot />
  </div>
</template>

<script>
  /**
   * I'm Foo!
   */
  export default {
    props: {
      /**
       * Foo the Bar.
       */
      foo: {
        type: String
      }
    }
  }
</script>
```

こんなコンポーネントから、

```json
{
  "description": "I'm Foo!",
  "props": [
    {
      "description": "Foo the Bar.",
      "name": "foo",
      "type": {
        "name": "string"
      }
    }
  ],
  "slots": [
    {
      "description": "my slot"
    }
  ]
}
```

こんな感じのメタ情報を生成してくれます。(色々省略しています)

<small>※1 ... Storybook と同じようなコンポーネントカタログツール。どちらかというとドキュメントの部分に重きを置いている。</small>

# メタ情報を利用する

`vue-docgen-api`によって抽出されたメタ情報は[`vue-docgen-loader`](https://github.com/pocka/vue-docgen-loader)という webpack のローダーによって、コンポーネントオブジェクトにこっそり追加されます。

```js
import Foo from 'Foo.vue'

console.dir(Foo.__docgenInfo) // メタ情報がそのまま詰まっている
```

そして Docs Addon はこのコンポーネントにひっついているメタ情報を元に、Props や Events, Slots のテーブルをレンダリングする、というわけです。

# Storybook 以外でメタ情報を使う

前述したようにメタ情報は`vue-docgen-api`によって生成され`vue-docgen-loader`によってコンポーネントに注入されます。
つまり、この一連のプロセスには一切 Storybook 関連のものが入っていないということになります。
そのため、webpack 環境さえあれば`Foo.__docgenInfo`でメタ情報を抽出できる環境を構築することができます。

具体的にどんな用途に使えるのかは人やプロジェクトによって異なりますが、例えばスクラッチでドキュメントを作成する際にコンポーネントのメタ情報を自動生成する、というようなことが可能になります([サンプル](https://github.com/pocka/vue-docgen-loader-usage-sample))。

## 注意点

`vue-docgen-loader`は名前の通り webpack のローダーなのでやりたい放題できてしまいます。
しかし、コンパイルにかかる時間やバンドルサイズを考えると、あくまでもドキュメンテーションのようなメインのアプリケーション以外にのみ利用することを推奨します。
