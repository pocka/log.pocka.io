---
name: building-spa-blog-with-nuxtjs
title: Nuxt.jsで作るSPAブログ
description: Nuxt.jsの静的生成機能(generate)を用いたブログの構築についてのお話
createdAt: 2018-04-25T09:02:04.062Z
updatedAt: 2018-10-16T21:15:00.000Z
tags:
  - article
  - javascript
  - vue.js
  - nuxt.js
---
# 概要

この技術ブログは[Nuxt.js](https://nuxtjs.org/)([日本語版](https://ja.nuxtjs.org/))によって生成されたSPAをAWS S3+CloudFront上で運用しています。

この記事では構成の概要や、Nuxt.jsについて紹介していきます。

# 何故Nuxt.jsなのか

Nuxt.jsを採用する前は[Vue.js製SPAに記事JSONをfetch方式](/posts/structure-of-this-blog)を採っていました。しかし、ゴリゴリの自前実装スタックの上に成り立っていたので、ServiceWorkerでのキャッシュやCode Splitting等の大きい変更が入れづらく、メンテナンスも難しく(というか面倒くさく)なっていきました。

「これは早めにどうにかしなければ」と思い色々調べた結果Nuxt.jsの静的生成機能(generate)が要件的にベストマッチしていた為、取り入れることにしました。

# 構成

[Vue.jsベースであった以前のもの](/posts/structure-of-this-blog)とそこまでは変わらないです。

S3上から配信されているSPA部分は、`nuxt generate`コマンドで生成されたHTML+JS+CSS+その他です。
SPAブログの各記事ページでは一般的に(?)、ランタイムで記事JSONをfetchして表示するという方式がとられています。
しかしこのサイトでは、初回表示にはビルド時に生成したHTMLを、それ以降(Vueが読み込まれた後)はdynamic importを使ってランタイムで記事JSONをfetchして表示するハイブリッド型となっています。

```diff
(初回表示用HTML)
今日のおやつ.md -> 今日のおやつ.json + /pages/posts/_name.vue -> /posts/今日のおやつ.html
```

AMPページ部分はビルド時に記事JSONとAMPテンプレート用のPugファイルからHTMLを生成しているだけです。

```diff
(今日のおやつ.md -> 今日のおやつ.json) + テンプレート.pug -> /amp/今日のおやつ.html
```

ちなみに[各変換処理は普通のNode.jsのスクリプトで書いています](https://github.com/pocka/log.pocka.io/tree/master/scripts)。


# 記事編集フロー

ローカルの場合

1. `npm run build:posts && npm run dev`
1. Markdownを編集
1. `npm run build:posts` (watch/importしたかったけど複雑になるので断念)
1. ブラウザで確認(HMRが効いているので快適)

# Nuxt.jsを採用してよかった点

Nuxt.jsを採用して特に良かったと感じたのはディレクトリ構造含むプロジェクト全体が非常にシンプルになったこと。エントリポイントやルーティングの設定がいらないだけで人はこんなにも幸せになれるんだとさえ思えてきます。

また、Nuxt.jsのPWAモジュールによるServiceWorkerキャッシュやCodeSplitting、各種バンドルファイルのハッシュ付与が設定不要、もしくはほんの少しの設定だけで動くこともよかった点としてあげることができます。


# SPAブログの構築にNuxt.jsはオススメできるか？

デザインや構造にこだわりがなく、ただ単にブログ等の記事管理をしたいというのであればVuePressやGatsby等を使ったほうが良いとは思います。ただ、「自分色にカスタマイズしたい !!」という欲求のある人には現状最もオススメできる選択肢です。



