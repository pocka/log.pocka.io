---
name: structure-of-this-blog
title: Vue.jsで作るSPAブログ
description: Vue+Vuex+Vue-Routerを用いたブログの構築
createdAt: 2017/09/06
updatedAt: 11/03/2017
tags:
  - article
  - javascript
  - vue.js
---
# 概要

この技術ブログは[Vue.js](https://jp.vuejs.org/index.html)(2系)を用いたSPAを[Netlify](https://www.netlify.com/)上でホスティングして動いています。

この記事ではその構築を通してわかったことや、
ブログのようなシンプルなコンテンツサイトのSPA化のメリット、デメリットについて紹介したいと思います。

# フロー

フローは以下のような形になっています。

1. ローカル開発マシンで記事を書いて、GitHubへPush
2. GitHubへのPushを受けてNetlifyは最新のソースコードを取得する
3. 予め指定してあるビルドコマンド(ここでは`npm run build`)を実行
4. HTML,JS,`posts.json`(記事一覧),各記事のJSONファイルが生成されて、`log.pocka.io`から閲覧可能になる

![structure](/images/blog-20170905.svg)

`npm run build`では記事のJSONを生成する自作スクリプト(Node)と記事一覧を生成する自作スクリプト(Node)、そしてVue.jsアプリケーションとHTMLファイルをビルドするwebpackのビルドタスクを実行しています

    [build] -> [build posts]     -> <post>.json
            -> [build post list] -> posts.json
            -> [build app]       -> index.html, bundle.js

## 自作スクリプトでやる理由

今世の中には[Jekyll](https://github.com/jekyll/jekyll)や[Hugo](https://github.com/gohugoio/hugo)、[Gatsby](https://github.com/gatsbyjs/gatsby)といった様々なSSG(静的サイトジェネレータ)があります。
それにも関わらず自作のスクリプトを使う理由はなんでしょう？

一つはSPA向きのそういったツールがないことです。

SSGはStatic Site Generatorという名前の通り、テンプレートと記事を元に静的で完成されたHTMLを吐き出します。
これらはHTMLを吐き出す為に作られており、好きなフォーマットのデータファイルのみ生成するということが(当たり前ですが)難しくなっています。

また、Gatsby等のSPAを生成するSSGの場合は全ての記事がバンドルされたJSとHTMLを吐き出します。
この場合だと全ての記事が1つのJSに含まれてしまう為、記事が増えた時のファイルサイズ肥大化という問題が出てきます。

もうひとつの理由としては、「MarkdownをJSONに変換する」処理が大した処理ではない、ということです。

npm上には優秀なMarkdownパーサである[marked](https://github.com/chjj/marked)、Yaml Front MatterをJSONに変換する[yaml-front-matter](https://github.com/dworthen/js-yaml-front-matter)、そしてMarkdownの特殊記号を除去してただのプレインテキストに変換する[remove-markdown](https://github.com/stiang/remove-markdown)というモジュールが(幸いにも)存在します。
そのため、生成スクリプトとして必要な処理は

* 記事ファイルを各モジュールへ渡す
* 生成されたJSONをファイルとして保存

のみとなるのです。

# 仕組み

基本的には[Vue.js](https://jp.vuejs.org/index.html)\+[Vuex](https://vuex.vuejs.org/ja/)\+[vue-router](https://router.vuejs.org/ja/)の普通のSPAです。

Vueは2.xを使い、[Single File Component](https://jp.vuejs.org/v2/guide/single-file-components.html)を用いて記述しています。(コンパイルには[Webpack](https://webpack.js.org/)を使用)

## ルーティングとページ読み込み

ルーティングには[vue-router](https://router.vuejs.org/ja/)を使用しており、各記事の読み込みは`Post`コンポーネントのロード時に`fetch`を叩いて実現しています([ソースコード](https://github.com/pocka/log.pocka.io/blob/d5de2c064ea8076eeaad3fcd427dcf187bb70014/src/js/pages/Post.vue#L63))。
トップページやAboutページは単にコンポーネントを読み込んでいるだけですが、各記事ページではURI内`/posts/:name`の`name`を元にJSONファイルを取得し、その内容を反映させるようになっています。

## ページ移動エフェクト

各ページの移動時にはfadeのtransitionが走るようになっています。
これは[Vueのtransition組込コンポーネント](https://jp.vuejs.org/v2/guide/transitions.html)を使って実現しています。

ただ、[vue-routerの公式ページ](https://router.vuejs.org/ja/advanced/transitions.html)通りに実装すると複数のルートを同じページコンポーネントが受ける場合にtransitionが発火しません。
`transition`コンポーネントは子要素が変わった場合のみtransitionイベントを発火させる為、プロパティが変わっただけでは発火しないのです(されても困りますが)。

その為、`router-view`の`key`に現在のパスである`$route.path`を指定し、URIが変更されるとコンポーネントを別のものとして認識させ、強制的にtransitionを発火させています。

    <transition>
        <router-view :key="$route.path"></router-view>
    </transition>

# SPA化のメリット

上2つはどちらかというとサイトの静的化に伴うメリット

* 読み込みの高速化
* 静的サイトホスティングサービスがあれば運用可能
  * Amazon S3やGitHub Pages等でも可能
* サイト内遷移の爆速化
* デザインから何から全て自分でカスタマイズできる
* テーマやプラグインに縛られない
* **楽しい**

# SPA化によるデメリット

* SPAを構築するだけのフロントエンドの知識が必要
* 記事の更新にgitやmarkdownの知識が必要(Netlify CMSで解決可能)
* 読み込むJSが少し大きくなりがち(このサイトの場合`239KB(gzip 78KB)`)
* JSが大きくなることによって初回ロードに少し時間がかかるようになる
* コマンドポチポチで完成しない

# まとめ

SPA化には確かにデメリットがありますが、いずれも対処して問題ないレベルまで落とし込めるようなものばかりなので、個人的には(**フロントエンドエンジニアにとっては**)ほぼメリットしかないと思っています。

SPAライブラリもReact\+ReduxだけでなくVue(\+Vuex)やAngular2、Riot.jsと様々なものがあるので、使い勝手を知ったり、実際に案件で使う前の練習として簡単なSPAブログを構築してみるのもよいかもしれませんね。
