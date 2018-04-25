---
name: vue-webpack-tutorial
title: Webpackで始めるVue.js
description: Webpack+Vue2(Single File Component)で簡単なSPAを作るチュートリアル
createdAt: 2017/09/13
updatedAt: 2018-04-25T00:00:00+09:00
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

+ フロントエンド開発の知識がある(JS/TSコンパイル、SASS/SCSSコンパイル等)
+ npmの開発フローをある程度知っている(`npm init`、`npm install`、npm scripts等)
+ Vue.jsの名前くらいは知っている
+ 最近のJavascriptがある程度書ける
+ browserifyやwebpack等のバンドルツール、又はGruntやGulp等のタスクランナーを触ったことがある

くらいの人を想定しています。

# つくるもの

このチュートリアルでは、Vue.jsを使ったカウンターアプリを作ります。
JSファイルのビルドにはWebpackを、各コンポーネントは単一ファイルコンポーネント(`.vue`ファイル)を使います。

チュートリアルを通して出来上がる最終的な完成物の[リポジトリ](https://github.com/pocka/vue-counter-example)を作成しているので、わからなくなったりうまく動かない場合は参照してください。

# チュートリアル

## 環境構築

まずはじめにプロジェクトのディレクトリを作ります。(既存のディレクトリを使う場合は省略)

```sh
mkdir vue-counter-app
cd vue-counter-app
```

作業ディレクトリに`package.json`を作成します。

```sh
npm init # いくつか質問されるので適当に答える
```


## Webpackのインストール

次に、アプリケーションをビルドするためにWebpackをインストールします。
一緒に超ベンリな開発サーバを立ててくれるwebpack-dev-serverもインストールします。

```sh
npm install --save-dev webpack webpack-dev-server
```

インストールできたらWebpackの設定ファイル(`webpack.config.js`)を作成します。


```javascript
// webpack.config.js
module.exports = {
    // メインとなるソースファイル
    entry: './src/index.js',
    // 出力設定
    // この場合はdest/bundle.jsというファイルが生成される
    output: {
        // 出力先のファイル名
        filename: 'bundle.js',
        // 出力先のファイルパス
        path: `${__dirname}/dest`,
    },
    // 開発サーバの設定
    devServer: {
        // destディレクトリの中身を表示してね、という設定
        contentBase: 'dest',
    },
}
```

この時点でJSファイルをコンパイルする準備ができたので、試しに簡単なJSファイルをビルドしてみましょう。

まず適当にソースファイル(`src/index.js`)を作成します。

```sh
mkdir src
echo 'console.log("Hello, World!")' > src/index.js
```

次に簡単に確認できるように`package.json`にnpm scriptを書きます。

```javascript
// package.json
{
  // ...省略
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --hot" // <-- 追加
  }
  // ...省略
}
```

最後に表示するHTMLファイル(`dest/index.html`)を作成し、以下の内容を貼り付けてください。


```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Vue app</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="/bundle.js"></script>
    </body>
</html>
```

以下のコマンドを実行してからブラウザで`localhost:8080`を開き、開発者ツールを開いてみましょう。
`Hello, World!`という文字列が表示されていれば成功です。

```sh
npm run dev
```

確認できたら一旦`Ctrl + C`で開発サーバを終了しときます。

## Vueのインストール

では本題であるVueをセットアップしていきます。

まず以下のコマンドでVueをインストールします。

```sh
npm install --save vue
```

また、Vueの単一ファイルコンポーネントをコンパイルするためにWebpackのローダーをインストールします。ついでにES2015でかけるようにbabel-loader、SASS(SCSS)を使えるようにsass-loaderもインストールします。

```sh
# vue-loaderとそれに必要なモジュール
npm install --save-dev vue-loader vue-template-compiler css-loader
# babel-loaderとそれに必要なモジュール
npm install --save-dev babel-loader babel babel-core babel-preset-es2015
# sass-loaderとそれに必要なモジュール
npm install --save-dev sass-loader node-sass
```

次に、`webpack.config.js`に各ローダーをセットしてビルドできるようにします。

```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dest`,
  },
  // ↓↓↓ここから↓↓↓
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?presets=es2015',
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: 'sass-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  // ↑↑↑ここまで追加↑↑↑
  devServer: {
    contentBase: 'public',
  },
}
```

お疲れ様でした、これでVueアプリを開発する環境は整いました！

## Vueアプリを書く

ではアプリを書いていきましょう。
まず、適当なコンポーネントを作ってみましょう。
`src/components/App.vue`を作成して以下の内容を書いてみてください。


```
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

import App from './components/App' // 今作ったやつ

new Vue({
    el: '#app', // アプリをマウントする要素
    components: { App }, // Appというコンポーネントを使うよ、という宣言
    template: '<app/>', // el(今回は#app)の中に表示する内容
})
```

`npm run dev`で開発サーバを立てて`localhost:8080`を確認してみるといつもの文字列が表示されているはずです。

### スタイルを加えてみる

先ほどの`src/components/App.vue`にひと手間加えてみましょう。

```
<template>
    <div>
        <p>Hello, World!</p>
    </div>
</template>

<style lang="scss">
    * {
        border: 1px solid #f00;
    }
</style>
```

ブラウザを確認すると、沢山のボーダーが増えているかと思います。
ではこのコンポーネントで定義したスタイルをこのコンポーネントの要素のみに適用してみましょう。

```diff
- <style lang="scss">
+ <style lang="scss" scoped>
```

罫線が減っていますね。これはScoped CSSというものです。基本的にはこれを使ってスタイルを適用していくのが良いと思います。

### カウンターコンポーネントを追加する

ではカウンタの実装をしていきましょう。

まずカウンタコンポーネントのvueファイル(`src/components/Counter.vue`)を作ります。


```
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
  <template>
      <div>
          <p>Hello, World!</p>
+         <counter/>
      </div>
  </template>
 
+ <script>
+ import Counter from './Counter'
+
+ export default {
+     components: {Counter},
+ }
+ </script>
 
  <style lang="scss">
      * {
          border: 1px solid #f00;
      }
  </style>
```

追加した`export default ~`の部分でカウンターコンポーネントを登録し、テンプレート内の`<counter/>`の部分で使用しています。

この状態でブラウザを確認すると追加したコンポーネントが表示されているはずです。

### カウンターコンポーネントを動かしてみる

それではカウンターを動くようにしましょう。

```diff
  <template>
      <div>
          <button>-</button>
-         <span>0</span>
+         <span>{{count}}</span>
          <button>+</button>
      </div>
  </template>

+ <script>
+ export default {
+     data() {
+         return {
+             count: 0,
+         }
+     }
+ }
+ </script>
```

これでコンポーネントにデータを追加することができました。

VueではHTMLテンプレート内に`{{value}}`で値を埋め込むことができます。
ここにはComponentの各プロパティをキーだけで指定することができます。
`count: 0`の部分の値を変えて保存し、ブラウザを見ると表示も変わっているかと思います。

では、次にボタンを押すと値を増減できるようにしましょう。

```diff
  <template>
      <div>
-         <button>-</button>
+         <button v-on:click="decrement">-</button>
          <span>{{count}}</span>
-         <button>+</button>
+         <button v-on:click="increment">+</button>
      </div>
  </template>
  
  <script>
  export default {
      data() {
          return {
              count: 0,
          }
      },
+     methods: {
+         increment() {
+             this.count += 1
+         },
+         decrement() {
+             this.count -= 1
+         },
+     },
  }
  </script>
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
    // 省略
    "scripts": {
        // 省略
        "build": "webpack -p" // 追加
    }
    // 省略
}
```

```js
// webpack.config.js
module.exports = {
    // 省略
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                postLoaders: {
                    // UglifyJSがこけるのでその対策として追加
                    js: 'babel-loader?presets=es2015',
                },
            },
        }
    // 省略
}
```

以上を追記したら、以下のコマンドを叩いてください。

```sh
npm run build
```

これで`dest`ディレクトリに`bundle.js`が生成されているはずです。
webpackの`-p`オプションは`NODE_ENV=production`の指定と`webpack.optimize.UglifyJsPlugin`の指定をしてくれるので、基本的にこの設定だけでファイルは最小化されて出力されます。

デプロイ時にはこの`dest`ディレクトリを公開します。

### gitignore

`.gitignore`では`dest/index.html`を除く`dest`ディレクトリ、`node_modules`を無視させます。

```
node_modules
dest/**
!dest/index.html
```

# おわり

だいぶ長くなってしまいましたが、以上がWebpack+Vueを使ったシンプルなSPAの構築方法です。vue-cliは確かに便利ですが、こういうものを理解するのは手で書いていくのが一番なので是非公式でちゃんとチュートリアルを書いてほしいものです。

