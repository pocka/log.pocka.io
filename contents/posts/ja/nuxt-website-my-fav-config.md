---
name: nuxt-website-my-fav-config
title: Nuxtで個人的によく使う設定
description: NuxtでWebサイトを作るときによく使うおすすめの設定
createdAt: 2018-11-09T12:30:00.000Z
updatedAt: 2019-02-26T11:00:00.000Z
tags:
  - blog
  - javascript
  - nuxt.js
---

# 概要

仕事や趣味で Nuxt.js を使って Web サイトを作る際に大体いつも使っている`nuxt.config.js`の設定をまとめてみました。
個人的におすすめの必要最小限の設定になってます。

# TL;DR

```js
module.exports = {
  srcDir: 'src/',
  ignore: ['**/*.stories.*'],
  modules: ['@nuxtjs/pwa']
}
```

# 各項目の説明

## `srcDir`

デフォルトでは Nuxt は`nuxt.config.js`が存在するディレクトリ(プロジェクトルート)に`pages/`や`layouts/`といったディレクトリを置くことになっています。しかし、ビルドを行うタイプの言語やプロジェクトではソースコードは`src/`配下に置くのが当たり前なので、`src/`ディレクトリ以下に`pages/`や`layouts/`を置けるようにしています。

## `ignore`

Storybook を使用している(使用する予定がある)場合にのみ設定しています。
Story ファイルはコンポーネントと同じディレクトリに`*.stories.js`という名前で置いているため、この設定をしないと Nuxt が勝手にこのファイルを読み込んでエラーを吐いてしまうので必要となります。
試していないですが、Storybook 公式の推奨する、 Story ファイルを`stories/`に置く手法をとっている人はこの設定は不要だと思います。

## `modules: ['@nuxtjs/pwa']`

[WorkBox](https://developers.google.com/web/tools/workbox/)を使った ServiceWorker でのキャッシュ目的で使っています。ただ、初回表示が重要でユーザのリピート率があまり高くない用途のサイトの場合は入れる必要は薄いです。

当たり前ですが、npm や yarn で`@nuxtjs/pwa`パッケージをインストールする必要があります。

# まとめ

本当に最小限の設定ですが、これだけで自分にとっての「理想の開発環境で高品質のサイトを作る」環境が手に入ります。Nuxt には痒いところに手が届くような様々な設定があるので、一度ドキュメントを読んでみて自分が思う最高の設定を見つけてみてはどうでしょうか。
