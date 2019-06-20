---
name: building-spa-blog-with-nuxtjs
title: Nuxt.jsで作るSPAブログ
description: Nuxt.jsの静的生成機能(generate)を用いたブログの構築についてのお話
createdAt: 2018-04-25T09:02:04.062Z
updatedAt: 2019-06-20T15:30:00.000+09:00
tags:
  - article
  - javascript
  - vue.js
  - nuxt.js
---

# 概要

この技術ブログは以前、[Nuxt.js](https://nuxtjs.org/)([日本語版](https://ja.nuxtjs.org/))によって生成された SPA を AWS S3+CloudFront 上で運用していました。

この記事では構成の概要や、Nuxt.js について紹介していきます。

# 何故 Nuxt.js なのか

Nuxt.js を採用する前は[Vue.js 製 SPA に記事 JSON を fetch 方式](/posts/structure-of-this-blog)を採っていました。しかし、ゴリゴリの自前実装スタックの上に成り立っていたので、ServiceWorker でのキャッシュや Code Splitting 等の大きい変更が入れづらく、メンテナンスも難しく(というか面倒くさく)なっていきました。

「これは早めにどうにかしなければ」と思い色々調べた結果 Nuxt.js の静的生成機能(generate)が要件的にベストマッチしていた為、取り入れることにしました。

# 構成

[Vue.js ベースであった以前のもの](/posts/structure-of-this-blog)とそこまでは変わらないです。

S3 上から配信されている SPA 部分は、`nuxt generate`コマンドで生成された HTML+JS+CSS+その他です。
SPA ブログの各記事ページでは一般的に(?)、ランタイムで記事 JSON を fetch して表示するという方式がとられています。
しかしこのサイトでは、初回表示にはビルド時に生成した HTML を、それ以降(Vue が読み込まれた後)は dynamic import を使ってランタイムで記事 JSON を fetch して表示するハイブリッド型となっています。

```diff
(初回表示用HTML)
今日のおやつ.md -> 今日のおやつ.json + /pages/posts/_name.vue -> /posts/今日のおやつ.html
```

AMP ページ部分はビルド時に記事 JSON と AMP テンプレート用の Pug ファイルから HTML を生成しているだけです。

```diff
(今日のおやつ.md -> 今日のおやつ.json) + テンプレート.pug -> /amp/今日のおやつ.html
```

ちなみに[各変換処理は普通の Node.js のスクリプトで書いています](https://github.com/pocka/log.pocka.io/tree/master/scripts)。

# 記事編集フロー

ローカルの場合

1. `npm run build:posts && npm run dev`
1. Markdown を編集
1. `npm run build:posts` (watch/import したかったけど複雑になるので断念)
1. ブラウザで確認(HMR が効いているので快適)

# Nuxt.js を採用してよかった点

Nuxt.js を採用して特に良かったと感じたのはディレクトリ構造含むプロジェクト全体が非常にシンプルになったこと。エントリポイントやルーティングの設定がいらないだけで人はこんなにも幸せになれるんだとさえ思えてきます。

また、Nuxt.js の PWA モジュールによる ServiceWorker キャッシュや CodeSplitting、各種バンドルファイルのハッシュ付与が設定不要、もしくはほんの少しの設定だけで動くこともよかった点としてあげることができます。

# SPA ブログの構築に Nuxt.js はオススメできるか？

デザインや構造にこだわりがなく、ただ単にブログ等の記事管理をしたいというのであれば VuePress や Gatsby 等を使ったほうが良いとは思います。ただ、「自分色にカスタマイズしたい !!」という欲求のある人には現状最もオススメできる選択肢です。
