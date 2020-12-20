---
name: js-error-on-googlebot
title: GoogleBOTでJavascriptエラー
description: GoogleBOTでJSエラーが起きた時の記録
createdAt: 2017/09/20
updatedAt: 2017/09/20
tags:
  - blog
  - javascript
  - googlebot
  - google
---

# 起きたこと

このブログが GoogleBOT で正しくレンダリングされない

記事一覧や記事ページで外部リソースが読み込めていなかったので`fetch`や`Promise`がないものと思い込み polyfill を追加するも変化なし

Netlify で[SPA 用の Prerendering](https://www.netlify.com/docs/prerendering/)をやってみるも効果なし(そもそも動いてるのかすら怪しい...)

[polyfill.io][]の CDN を入れるも GoogleBOT に読み込ませると polyfill スクリプトがエラーになり`<body>`のレンダリングすらされない...

`<body>`へのエラー出力を追加して調べてみたところ`fetch`したレスポンスをいじってる箇所で`Object.assign is undefined`...

# 対応したこと

面倒だったので[babel-polyfill][]で対応した

```shell
npm install --save babel-polyfill
```

今までは手動でインポートしていたが、Webpack だと`entry`にモジュール名を渡すとバンドルしてくれるらしい(このとき初めて知った)

```js
module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  // ...
};
```

# ちなみに...

GoogleBOT に正しくレンダリングされているかどうか確認したい場合は、[Google Search Console][]の Fetch as Google を使うと確認できる

[polyfill.io]: https://polyfill.io/v2/docs/
[babel-polyfill]: https://babeljs.io/docs/usage/polyfill/
[google search console]: https://www.google.com/webmasters/tools/home
