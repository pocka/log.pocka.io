---
name: building-spa-blog-with-nuxtjs
title: Nuxt.jsで作るSPAブログ
description: Nuxt.jsの静的生成機能(generate)を用いたブログの構築についてのお話
createdAt: 2018-04-25T09:02:04.062Z
updatedAt: 2018-04-25T09:02:04.062Z
tags:
  - article
  - javascript
  - vue.js
  - nuxt.js
---
# 概要

この技術ブログは[Nuxt.js](https://nuxtjs.org/)([日本語版](https://ja.nuxtjs.org/))によって生成されたSPAを[Netlify](https://www.netlify.com/)上で運用しています。

この記事では構成の概要や、Nuxt.jsについて紹介していきます。

# 何故Nuxt.jsなのか

Nuxt.jsを採用する前は[Vue.js製SPAに記事JSONをfetch方式](/posts/structure-of-this-blog)を採っていました。しかし、ゴリゴリの自前実装スタックの上に成り立っていたので、ServiceWorkerでのキャッシュやCode Splitting等の大きい変更が入れづらく、メンテナンスも難しく(というか面倒くさく)なっていきました。

「これは早めにどうにかしなければ」と思い色々調べた結果Nuxt.jsの静的生成機能(generate)が要件的にベストマッチしていた為、取り入れることにしました。

# 構成

[Vue.jsベースであった以前のもの](/posts/structure-of-this-blog)とそこまでは変わらないです。

Netlify上から配信されているSPA部分は、`nuxt generate`コマンドで生成されたHTML+JS+CSS+その他です。
各記事ページは、SPAブログでは一般的な(?)ランタイムで記事JSONをfetchして表示するタイプではなく、**ビルド時に記事JSONから記事ページのコンポーネントを作成**し、それを表示しています。

```diff
今日のおやつ.md -> 今日のおやつ.json -> 今日のおやつ.vue
```

AMPページ部分はビルド時に記事JSONとAMPテンプレート用のPugファイルからHTMLを生成しているだけです。

```diff
(今日のおやつ.md -> 今日のおやつ.json) + テンプレート.pug -> /amp/今日のおやつ.html
```

ちなみに[各変換処理は普通のNode.jsのスクリプトで書いています](https://github.com/pocka/log.pocka.io/tree/master/scripts)。

## なぜVueコンポーネントを生成するのか

実装初期はNuxt.jsの[非同期データ(asyncData)](https://ja.nuxtjs.org/guide/async-data/)を使って実装していたのですが、この方式だとCodeSplittingで記事が分割されないという問題がありました(JSファイルごとにCodeSplittingされるため)。そのため、「全ての記事の内容を一つにまとめた」JSファイルが記事を開く際に読み込まれてしまいます。これは通信の無駄という以外にも、「一つ記事を更新したら全ての記事のデータを再度読みこむ」というキャッシュパフォーマンス的にもよろしくない自体を招いてしまっていました。

対応策として実行時にfetchする、という手段もありましたが、パフォーマンス的にも開発フロー的にもあまり納得のいく手段とは思えなかったので、「.vueファイルをMarkdownから自動生成する」という力技を採用しました。

この手段を採用できたのは、Nuxt.jsの「`pages`ディレクトリ以下に`.vue`ファイルを置くと、それをページコンポーネントとみなす」というNext.js譲りの特性があったためです。もしもこれがなければもっと面倒な思いをしていたことでしょう...

# 記事編集フロー

ローカルの場合(あまりやらない)

1. `npm run build:posts && npm run dev`
1. Markdownを編集
1. `npm run build:posts` (自動化したかったけど複雑になるので断念)
1. ブラウザで確認(HMRが効いているので快適)

NetlifyCMSの場合

1. 記事を書く
1. 保存するとPRが作成される
1. Netlifyのプレビューを確認する

NetlifyCMSがあまりにも便利なのでローカル編集の利便性は追求していない。

# Nuxt.jsを採用してよかった点

Nuxt.jsを採用して特に良かったと感じたのはディレクトリ構造含むプロジェクト全体が非常にシンプルになったこと。エントリポイントやルーティングの設定がいらないだけで人はこんなにも幸せになれるんだとさえ思えてきます。

また、Nuxt.jsのPWAモジュールによるServiceWorkerキャッシュやCodeSplitting、各種バンドルファイルのハッシュ付与が設定不要、もしくはほんの少しの設定だけで動くこともよかった点としてあげることができます。


# SPAブログの構築にNuxt.jsはオススメできるか？

ブログ等の記事管理用途ではVuePressやGatsby等を使ったほうが良いかと思います。特に前述のコード分割の問題もあり、そのまま使うのはオススメはできません。ただ、このブログのように「MarkdownをJSONから.vueファイルに変換して〜」というのを受け入れられる人や、自分で全部カスタマイズしたい、という人には現状最もオススメできる選択肢だと思います。

