---
name: vue-webpack-tutorial
title: Webpackで始めるVue.js
description: Webpack+Vue2(Single File Component)で簡単なSPAを作るチュートリアル
createdAt: 2017/09/13
updatedAt: 2018-04-25T14:10:00+09:00
tags:
  - article
  - javascript
  - vue.js
  - webpack
---

# まえがき

この記事はWebpackを使って単一ファイルコンポーネント(Single File Component)のVueアプリケーションを作るチュートリアルです。

公式の日本語ドキュメントはかなりしっかりしています。
しかし、vue-cliを使わない通常の開発フローに沿ったチュートリアルや、単一ファイルコンポーネントの使い方等、実際に使うにあたって必要な情報がかなり少ないです。
本記事ではその部分のカバーをすることを目的とします。

対象読者は

+ フロントエンド開発の知識がある(JSやCSSのコンパイル等)
+ npmを用いた開発フローをある程度知っている
+ Vue.jsの名前くらいは知っている
+ 最近のJavascriptがある程度書ける

くらいの人を想定しています。

# つくるもの

このチュートリアルでは、Vue.jsを使ったカウンターアプリを作ります。
JSファイルのビルドにはWebpackを、各コンポーネントは単一ファイルコンポーネント(`.vue`ファイル)を使います。

チュートリアルを通して出来上がる最終的な完成物の[リポジトリ](https://github.com/pocka/vue-counter-example)を作成しているので、わからなくなったりうまく動かない場合は参照してください。

# バージョン等

- Webpack 4.x
  - 確認環境: 4.20.2
- Node.js >= 8
  - ぶっちゃけ何でもいいですが、できるだけ新しいやつを使うといいです
  - 確認環境: v10.10.0

# チュートリアル

## 環境構築

まずはじめにプロジェクトのディレクトリを作り、`package.json`を作成します。(既存のディレクトリを使う場合は省略)

```sh
mkdir vue-counter-app
cd vue-counter-app
npm init # いくつか質問されるので適当に答える
```


## Webpackのインストール

次に、アプリケーションをビルドするためにWebpackをインストールします。
一緒に超ベンリな開発サーバを立ててくれるwebpack-dev-serverもインストールします。
webpack-cliは`webpack`コマンドを使うために必要なパッケージです。

```sh
npm install --save-dev webpack webpack-cli webpack-dev-server
# 以降は下記の省略形式で記載します
# npm i -D webpack
```

インストールできたらWebpackの設定ファイルを作成します。


```js
// webpack.config.js

const path = require('path')

module.exports = {
  // エントリポイントのファイル
  entry: './src/index.js',
  output: {
    // 出力先のディレクトリ
    path: path.resolve(__dirname, './dest'),
    // 出力ファイル名
    filename: 'bundle.js'
  },
  devServer: {
    // webpackの扱わないファイル(HTMLや画像など)が入っているディレクトリ
    contentBase: path.resolve(__dirname, 'public')
  }
}
```

この時点でJSファイルをコンパイルする準備ができたので、試しに簡単なJSファイルをビルドしてみましょう。
まず適当にソースファイルを作成します。

```js
// src/index.js

console.log('Hello, World!')
```

次に開発環境の起動コマンドを`package.json`に書きます。

```js
// package.json

{
  // ...省略
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --hot" // <-- 追加
  }
  // ...省略
}
```

最後に表示するHTMLファイルを作成します。


```html
<!-- public/index.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Vue app</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

以下のコマンドを実行してからブラウザで<http://localhost:8080>を開き、開発者ツールを開いてみましょう。
`Hello, World!`という文字列が表示されていれば成功です。

```sh
npm start
```

確認できたら一旦`Ctrl + C`で開発サーバを終了しときます。


## Vueのインストール

では本題であるVueをセットアップしていきます。

まず以下のコマンドでVueをインストールします。

```sh
npm i --save vue
```

また、Vueの単一ファイルコンポーネント(SFC)を扱うためのWebpackのローダーをインストールします。

- SFCを扱うために必要な基本ローダー
  - [vue-loader](https://github.com/vuejs/vue-loader/) (SFCを読み込む)
  - [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler) (ドキュメント等に記載はないがvue-loaderに必要)
  - [css-loader](https://github.com/webpack-contrib/css-loader) (cssを読み込む)
  - [style-loader](https://github.com/webpack-contrib/style-loader) (読み込んだCSSをJSに埋め込んだりする)
- JSのトランスパイルに必要なローダー
  - [babel-loader](https://github.com/babel/babel-loader) (JSをトランスパイルする)
  - [@babel/core](https://github.com/babel/babel/tree/master/packages/babel-core) (Babelの本体)
  - [@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) (実行環境を指定してよしなにトランスパイルしてくれるやつ)
- その他 (必要に応じてインストールしてください)
  - [ts-loader](https://github.com/TypeStrong/ts-loader) (Typescriptを読み込む)
    - [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin)+[@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)で多分代用可能かもしれない
  - [sass-loader](https://github.com/webpack-contrib/sass-loader) (SASS/SCSSを読み込む)
  - etc...

```sh
# 基本ローダー
npm i -D vue-loader vue-template-compiler css-loader style-loader
# JS系ローダー
npm i -D babel-loader @babel/core @babel/preset-env
```

インストールしたローダーを組み込んでいきます。

```js
// webpack.config.js

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/, // ファイルが.vueで終われば...
        loader: 'vue-loader' // vue-loaderを使う
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // css-loader -> style-loaderの順で通していく
      },
    ]
  },
  resolve: {
    // import './foo.vue' の代わりに import './foo' と書けるようになる(拡張子省略)
    extensions: ['.js', '.vue'],
    alias: {
      // vue-template-compilerに読ませてコンパイルするために必要
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  // ...
}
```

最後にBabelの変換設定を追加して終了です。

```js
// package.json
{
  // ...
  "babel": {
    "presets": ["@babel/preset-env"]
  },
  // メジャーな最新2バージョンで、まともに使われており、IE以外のブラウザをターゲットにする
  // ここはプロジェクトに応じて適当に決めてください
  // 詳細は以下を参照
  // https://github.com/browserslist/browserslist
  "browserslist": "last 2 versions, not dead, not ie > 0",
  // ...
}
```

お疲れ様です、これでVueアプリを開発する環境は整いました！

## Vueアプリを書く

ではアプリを書いていきましょう。
まず、適当なコンポーネントを作ってみましょう。


```
<!-- src/components/App.vue -->

<template>
  <div>
    <p>Hello, World!</p>
  </div>
</template>
```

次に`src/index.js`を編集します。

```javascript
// src/index.js

import Vue from 'vue'

import App from './components/App' // 作ったやつ

new Vue({
    el: '#app', // アプリをマウントする要素(セレクタで指定)
    components: { App }, // Appというコンポーネントを使うよ、という宣言
    template: '<app/>', // el(今回は#app)の中に表示する内容
})
```

`npm start`で開発サーバを立てて<http://localhost:8080>を確認してみるといつもの文字列が表示されているはずです。

### スタイルを加えてみる

先ほどのコンポーネントにひと手間加えてみましょう。

```
<!-- src/components/App.vue -->

<template>
  <div>
    <p>Hello, World!</p>
  </div>
</template>

<style>
  * {
    border: 1px solid red;
  }
</style>
```

ブラウザを確認すると、沢山のボーダーが増えているかと思います。
ではこのコンポーネントで定義したスタイルをこのコンポーネントの要素のみに適用してみましょう。

```diff
- <style>
+ <style scoped>
```

罫線が減っていますね。これはScoped CSSというものです。基本的にはこれを使ってスタイルを適用していくのが良いと思います。

### カウンターコンポーネントを追加する

ではカウンタの実装をしていきましょう。



```
<!-- src/components/Counter.vue -->

<template>
  <div>
    <button>-</button>
    <span>0</span>
    <button>+</button>
  </div>
</template>
```

作ったらそれをアプリに追加します。今回はメインコンポーネントである`src/components/App.vue`に追加します。

```diff 
+ <script>
+ import Counter from './Counter'
+
+ export default {
+   components: {Counter},
+ }
+ </script>

  <template>
    <div>
      <p>Hello, World!</p>
+     <counter/>
    </div>
  </template>
 
  <style lang="scss">
    * {
      border: 1px solid #f00;
    }
  </style>
```

追加した`components: {Counter}`の部分でカウンターコンポーネントを登録し、テンプレート内の`<counter/>`の部分で使用しています。

この状態でブラウザを確認すると追加したコンポーネントが表示されているはずです。

### カウンターコンポーネントを動かしてみる

それではカウンターを動くようにしましょう。

```diff
+ <script>
+ export default {
+   data() {
+     return {
+       count: 0,
+     }
+   }
+ }
+ </script>

  <template>
    <div>
      <button>-</button>
-     <span>0</span>
+     <span>{{count}}</span>
      <button>+</button>
    </div>
  </template>
```

これでコンポーネントにデータを追加することができました。

VueではHTMLテンプレート内に`{{value}}`で値を埋め込むことができます。
ここにはComponentの各プロパティをキーだけで指定することができます。
`count: 0`の部分の値を変えて保存し、ブラウザを見ると表示も変わっているかと思います。

では、次にボタンを押すと値を増減できるようにしましょう。

```diff
  <script>
  export default {
    data() {
      return {
        count: 0,
      }
    },
+   methods: {
+     increment() {
+       this.count += 1
+     },
+     decrement() {
+       this.count -= 1
+     },
+   }
  }
  </script>

  <template>
    <div>
-     <button>-</button>
+     <button v-on:click="decrement">-</button>
      <span>{{count}}</span>
-     <button>+</button>
+     <button v-on:click="increment">+</button>
    </div>
  </template>
```

これを保存しブラウザに戻ると、ボタンを押すと値が増減するようになっているはずです。

Vueのコンポーネントの`methods`にメソッドを定義すると、`<template>`内で使うことができるようになります。
`<template>`側で使うには`v-on:event`属性でメソッドを指定します。`onclick="increment"`みたいなものなのでわかりやすいですね。

また、イベントのバインディングには`@event`という略記法があり、基本的にそちらを使うことが推奨されています。

```
<button @click="decrement">-</button>
<span>{{count}}</span>
<button @click="increment">+</button>
```


これでカウンターアプリはほぼ完成したので、あとはお好きにスタイル調整をしたりマークアップを変えてみていろいろ試してみてください。

## プロダクションビルド

アプリが完成して実際にデプロイしたい、と思ってもこのままだとバンドルが生成されないのでプロダクションビルド用の設定を追加していきます。

```js
// package.json
{
  // ...
  "scripts": {
    // ...
    "build": "webpack -p"
  }
  // ...
}
```

`public`ディレクトリ以下のファイルを`dest`にコピーするための用意をします。
JSファイルの分割等を行う際に便利なので、`dest`にHTMLやWebフォントを置かずにこちらの方法をとることをおすすめします。

```sh
npm i -D copy-webpack-plugin
```

```js
// webpack.config.js

// ...
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    // ...
    new CopyPlugin({ from: './public' })
  ],
  // ...
}
```


以下のコマンドを叩くと、`dest/bundle.js`が生成されます。

```sh
npm run build
```

webpackの`-p`オプションは`NODE_ENV=production`の指定と`webpack.optimize.UglifyJsPlugin`の指定をしてくれるので、基本的にこの設定だけでファイルは最小化されて出力されます。

デプロイ時にはこの`dest`ディレクトリを公開します。


# おわり

だいぶ長くなってしまいましたが、以上がWebpack+Vueを使ったシンプルなSPAの構築方法です。vue-cliは確かに便利ですが、こういうものを理解するのは手で書いていくのが一番なので是非公式でちゃんとチュートリアルを書いてほしいものです。


