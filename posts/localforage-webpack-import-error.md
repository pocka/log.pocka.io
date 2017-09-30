---
name: localforage-webpack-import-error
title: localForageをwebpackで読み込む
description: localForageをwebpackで読み込むとエラーが出る件とその対処
createdAt: 2017-09-24T11:24:39+09:00
updatedAt: 2017-09-24T02:24:39.503Z
tags:
  - blog
  - javascript
  - webpack
---
# 概要

webpackで運用しているプロジェクトでlocalForageを使おうとしたらエラーが出たのでメモ。

# エラー

```
./node_modules/localforage/dist/localforage.js
Module build failed: ReferenceError: Unknown plugin "add-module-exports" specified in "/app/node_modules/localforage/.babelrc" at 0, attempted to resolve relative to "/app/node_modules/localforage"
```

[localforageに既に上がっているIssue(#599)](https://github.com/localForage/localForage/issues/599)とは別物。

# 対処

Babelが原因のエラーのようなので、
`webpack.config.js`の`babel-loader`に読み込ませないようにする。

```js
// webpack.config.js
module: {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader?presets=es2015',
      exclude: /localforage/,
    },
  ],
},
```

# 参考

<https://stackoverflow.com/questions/45244723/how-to-use-noparse-in-webpack>
