---
name: nuxtjs-modern-mode
title: Nuxt.jsでES2015+とES5を出力する
description: Nuxt.jsのmodern modeを使ってモダンブラウザ用とレガシーブラウザ用のJSを出力する
createdAt: 2019-01-25T16:00:00.000+09:00
updatedAt: 2019-01-25T16:00:00.000+09:00
tags:
  - article
  - javascript
  - nuxt.js
---

# モダンブラウザでのパフォーマンスが犠牲となる互換性確保

Babelの普及と各種Polyfillの整備により、フロントエンド開発者はレガシーブラウザを対象にしながらも新しいコードを書くことができるようになりました。
もはや当たり前となったこれらの手法ですが、もちろんダウンサイドは存在します。その一つがコードサイズの増大です。

ターゲットとなるJS実行環境に存在しない機能を再現するためにBabelやTypeScriptといったトランスパイラは(もちろんPolyfillも)出力されるコード中にランタイムコードを挿入します。
トランスパイルやPolyfillの必要なレガシーブラウザではこれらは必要不可欠なものですが、モダンブラウザではレガシーブラウザ用のコードはただのゴミでしかありません。
あえてリスクを冒して標準を満たしていないブラウザを使う一部のユーザのために、まともなブラウザを使っている大多数のユーザのUXを損なうのは間違っていると思います。

しかし現実にはレガシーブラウザ、主にIEをサポートするよう要求される場面はなかなか減りません。
ファイルサイズを減らすために必死に努力している開発者からしたらたまったものではありません。

この問題の解決策として主に2種類の手段があります。

# ブラウザごとにバンドルを分ける

ひとつはブラウザ毎に読み込ませるJSファイルを分ける手法です。
アクセスしてきたUAを見て適切なバンドルを配布するというこの手法は昔から存在します(普及しているかはさておき)。

# ESModuleに対応しているかどうかでバンドルを分ける

UAを見てバンドルを分ける手法をとる場合、サーバサイドの処理が必要になります。そのため、静的なサイトには適用できません<sup>※1</sup>。
そういった場合やサーバ側での処理を実装したくない場合に使われるのがESModuleに対応しているかどうかでスクリプトを読み込むテクニックです。
これはESModuleに対応しているモダンブラウザ用のタグと対応していないレガシーブラウザ用のタグを両方記載し、それぞれに必要な方だけ読み込ませるというものです。

```html
<script type="module" src="my-modern-bundle.mjs"></script>
<script nomodule src="my-legacy-bundle.js" defer></script>
```

ESModuleに対応したブラウザは1つめのscriptをモジュールとして読み込み、
2つめのscriptは[`nomodule`属性](https://developer.mozilla.org/ja-JP/docs/Web/HTML/Element/script#attr-nomodule)がついているために実行しません。
ESModule未対応のブラウザは1つめのscriptは`type="module"`に対応していないので読み込まず、2つめのscriptを普通に読み込みます。
注意点として、`nomodule`属性はあくまでも"実行しない"フラグであるため、処理系によってはファイルをダウンロードする可能性があります。

<small>※1 ... nginxやストレージの設定次第でできるとは思いますが、構築やメンテナンスコストを考えると現実的ではない、という意味で「適用できません」。</small>

# Nuxt.jsでバンドルを分ける

Nuxt.jsではv2.3.1から導入された[Modern mode](https://nuxtjs.org/api/configuration-modern/)という機能を用いることで、これらの手法を超絶簡単に導入することができます。
ブラウザごとにバンドルを分けるのが`modern: server`で、ESModuleの対応有無で読み込むスクリプトを変えるのが`modern: client`となります。
詳しい説明や使い方は公式のドキュメントを参照してください(2019/01/25時点では日本語版ドキュメントはない模様)。

デフォルトでは`false`(無効)となっているのでv2.3.1以上を使っている場合はとりあえず有効にしてみることをオススメします。

ちなみにこのブログは`modern=client`で静的生成されているので、実際にどんなふうに出力されるのか気になる人は開発者ツールを開けば確認できます。