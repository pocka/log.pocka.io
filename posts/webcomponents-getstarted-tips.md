---
name: webcomponents-getstarted-tips
title: Web Componentsを始めてみる際のTips
description: Web Componentsを始めてみる際につまるところや気をつけておいたほうがいいところについての紹介
createdAt: 2018-12-21T12:10:00.000+09:00
updatedAt: 2018-12-21T12:10:00.000+09:00
tags:
  - article
  - javascript
  - webcomponents
  - webpack
---

# 概要

Web Componentsを始めるにあたって、つまりそうなところや気をつけておいたほうがいいところをピックアップしてみました。
なお、素のWeb Componentsスタックではなく、[lit-element](https://github.com/Polymer/lit-element) や [lit-html](https://github.com/Polymer/lit-html) といったPolymer系のライブラリを使うことを想定しています。

実際の設定が見たいという方は[pocka/webpack-lit-element-sample](https://github.com/pocka/webpack-lit-element-sample)を参照してください。
小さなlit-elementのアプリケーションをWebpackでコンパイルする構成になっています。

# 基本Tips

## 情報収集

WebComponentsを構成するスタックはフロントエンドの中でもかなり動きが激しいため、できるだけ最新の公式ソース(MDNやGoogleの開発者向けドキュメント等)をできるだけ参照するようにしましょう。

個人ブログやStackOverflowを見る際は(もちろんこの記事も含めて)、書かれた日付やバージョン、書いた人のスキル等をよく見て参考にするかどうか判断すると良いです。

例えば少し昔の記事ではHTML Importsを推奨したり、それ前提で書かれているものが多いですが、HTML Importsはすでに非推奨で廃止予定となっています。

# 開発環境系Tips

## Polymer系ライブラリのトランスパイル

PolymerコミュニティのモジュールはES2017で書かれている(そもそもトランスパイルされていない?)ため、`node_modules/`以下にある該当モジュールを使用する側がトランスパイルする必要があります。

```js
// webpack.config.js

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          // これが必要
          /node_modules\/(@polymer|lit-html)\//,
        ],
        loader: 'babel-loader'
      },
      // ...
    ]
  },
  // ...
}
```

## ES5へのトランスパイル

ES5にトランスパイルするとクラス構文がトランスパイルされてしまうため、クラス構文とCustomeElementsをネイティブでサポートしている環境でエラーになってしまいます。
それを回避するためにBabelに[babel-plugin-transform-builtin-classes](https://github.com/WebReflection/babel-plugin-transform-builtin-classes#readme)プラグインを導入する必要があります。

```js
// Babelの設定

{
  "plugins": [
    [
      "babel-plugin-transform-builtin-classes",
      {
        "globals": [
          "HTMLElement"
          // lit-elementを使う場合は"LitElement"を指定する
        ]
      }
    ]
  ]
}
```

# 実装系Tips

## 効率的な読み込み

作成したコンポーネントをまとめて読み込むのではなく、そのとき必要なコンポーネントのみを読み込むことがパフォーマンス上推奨されています。
Webpack等のバンドラを使っている場合は、Dynamic Importを使うことで簡単にそれを実装することができます。

```js
// my-foo.js

import('./my-bar')

class MyFoo extends LitElement {
  render() {
    return html`
      <my-bar/>
    `
  }
}
```

注意点としては、コンポーネントが読み込まれるまでブランク or 子要素だけがそのまま表示された状態になってしまいます。
コンポーネントの依存関係がわかっている場合は事前に読み込んでおくことでこれを回避することができます。
