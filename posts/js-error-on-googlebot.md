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

このブログがGoogleBOTで正しくレンダリングされない

記事一覧や記事ページで外部リソースが読み込めていなかったので`fetch`や`Promise`がないものと思い込みpolyfillを追加するも変化なし

Netlifyで[SPA用のPrerendering](https://www.netlify.com/docs/prerendering/)をやってみるも効果なし(そもそも動いてるのかすら怪しい...)

[polyfill.io][]のCDNを入れるもGoogleBOTに読み込ませるとpolyfillスクリプトがエラーになり`<body>`のレンダリングすらされない...

`<body>`へのエラー出力を追加して調べてみたところ`fetch`したレスポンスをいじってる箇所で`Object.assign is undefined`...

# 対応したこと

面倒だったので[babel-polyfill][]で対応した

```sh
npm install --save babel-polyfill
```

今までは手動でインポートしていたが、Webpackだと`entry`にモジュール名を渡すとバンドルしてくれるらしい(このとき初めて知った)

```js
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  // ...
}
```

# ちなみに...

GoogleBOTに正しくレンダリングされているかどうか確認したい場合は、[Google Search Console][]のFetch as Googleを使うと確認できる


[polyfill.io]:https://polyfill.io/v2/docs/
[babel-polyfill]:https://babeljs.io/docs/usage/polyfill/
[Google Search Console]:https://www.google.com/webmasters/tools/home
