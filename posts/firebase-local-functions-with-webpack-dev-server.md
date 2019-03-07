---
name: firebase-local-functions-with-webpack-dev-server
title: webpack-dev-server+firebase-toolsでローカルのFunctionを呼び出す
description: webpack-dev-serverを使いながらローカルで起動しているFirebase HTTPS Functionを呼び出す方法
createdAt: 2019-03-07T12:00:00+09:00
updatedAt: 2019-03-07T12:00:00+09:00
tags:
  - blog
  - firebase
  - webpack
---

# やりたいこと

Firebase を使った Web アプリケーションをローカルで動かしたい。
ただ、[Firebase CLI](https://github.com/firebase/firebase-tools)の`firebase serve`だと Hosting は HMR どころかホットリロードすらされないので webpack-dev-server を使いたい。

# TL;DR

```js
// firebase.json
{
  "hosting": {
    "rewrites": [{
      "source": "/api/foo",
      "function": "foo"
    }]
  }
}
```

```js
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:8081'
    }
  }
}
```

```sh
firebase serve --port 8081
```

# 何をやっているのか

webpack の[`devServer.proxy`](https://webpack.js.org/configuration/dev-server/#devserverproxy)を設定して、該当パスへのリクエストをローカルで起動している Firebase Hosting へ流す。
Firebase Hosting は渡ってきたリクエストを`rewrites`セクションの設定にしたがって Firebase Functions へ流す。

`/api/foo`としているのはエンドポイントを追加した際に`/api`以下に生やしていけば`webpack`側にプロキシの設定を追加する必要がなくなるため。

# 注意点

あくまでも一部のパスをプロキシしているだけなので、他のリライトルールは適用されない。
そこらへんも全部 Hosting の設定どおりにしたい場合は[Firebase CLI の設定と superstatic を使ってリクエストを書き換える](https://blog.misosi.ru/2019/01/14/firebase-hosting-and-webpack-dev-server/)必要がある。
