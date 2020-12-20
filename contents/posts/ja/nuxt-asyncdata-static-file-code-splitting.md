---
name: nuxt-asyncdata-static-file-code-splitting
title: NuxtのasyncDataで静的ファイルを読み込む
description: NuxtのasyncDataを使って静的ファイルを読み込んで適切にCodeSplittingする方法
createdAt: 2018-05-10T08:08:02.294Z
updatedAt: 2018-05-10T08:08:02.294Z
tags:
  - blog
  - javascript
  - nuxt.js
---
# 概要

Nuxt.jsを使って色々作っていると、generate(静的出力)時の初期表示内容にJSONファイルの内容を取り込んで表示したい、という場面に出くわします(多分)。
そんなときにどうやって取り込めばいいのかという方法を書き残しておきます。

# 方法

[`asyncData`メソッド](https://ja.nuxtjs.org/guide/async-data/)を使います。
また、ページが動的ルーティングの場合は[`routes`オプション](https://ja.nuxtjs.org/api/configuration-generate#routes)も使う必要がでてきます。

これら2つで要件は満たせるのですが、その中でどうやって読み込まれるかによって出力されるJS(ランタイム=初期表示以降に読み込まれる内容)が変わってくるので使い分ける必要があります。

## サンプルケース

説明/理解しやすいように、以下のサンプルケースを用いて説明をしていきます。

- Nuxt.jsを使ってブログシステムを作成する
- 記事はMarkdownで書き、それらを変換した個別のJSONファイルがあるものとする
- 初期表示時に記事の内容をHTMLに含めておきたい
  - 余計なランタイムコストをかけずにイニシャルビューを早く出したい

## コンテンツがひとつのJSファイルとなるパターン

asyncDataメソッドの中で`require`を使いJSONファイルを読み込むと、generate時にそれらは一つのJSファイルとして出力されます。

サンプルケースの場合、例えば以下のような記事ページコンポーネントがあったとします。

```html
<!-- /pages/posts/_name.vue -->
<script>
export default {
  asyncData({ params }) {
    return {
      post: require(`~/posts/${params.name}.json`)
    }
  }
}
</script>

<template>
  <article class="content" v-html="post"></article>
</template>
```

そして以下のような記事のJSONファイルを用意します。

```js
// /posts/awesome-cooking.json
{
  "name": "awesome-cooking",
  "content": "<p>とても素晴らしい料理の説明</p>"
}
```

```js
// /posts/how-to-master-js.json
{
  "name": "how-to-master-js",
  "content": "<h1>JSをマスターするには</h1>"
}
```

そして`nuxt.config.js`の`generate.routes`に、`["/posts/awesome-cooking", "/posts/how-to-master-js"]`を渡してそれぞれのJSONを読み込ませるようにします。

この状態でNuxtのgenerate機能を用いて静的ファイル出力を行うと、以下のファイルが出力されます。

- `awesome-cooking.json`の内容が含まれた`awesome-cooking.html`
- `how-to-master-js.json`の内容が含まれた`how-to-master-js.html`
- `awesome-cooking.json`と`how-to-master-js.json`の**両方の内容**が含まれたJSファイル

肝心なのはこの、「両方の内容が含まれた」という点です。
仮に`/posts/awesome-cooking`にだけアクセスしたとしても、`how-to-master-js.json`のデータまでダウンロードすることになります。

これがもし、記事数が1000あった場合、JSONファイル1000個分の内容が詰まったJSファイルが記事ページ表示時に読み込まれることになり、かなりの非効率となります。

ただ、JSONファイルの総サイズが小さい場合、初期ロードが少し遅くなる代わりにページ遷移時(routerでの遷移時)の読み込み時間がなくなる、というメリットにもなりえます。

この方式は、記事数が少ない場合や初期ロードよりも遷移時の待ち時間を重視する場合、また利用するユーザあたりの訪問ページ数が高い場合等に使うべきでしょう。

## コンテンツごとにJSファイルが分割されるパターン

上のパターンとは逆に、それぞれのコンテンツ(JSONファイルの内容)を別々のJSファイルに分けて、そのページに必要なコンテンツだけをダウンロードするパターンです。
この場合は、asyncDataメソッド内で**dynamic import**を用いてJSONファイルを読み込みます。

```html
<script>
export default {
  async asyncData({ params }) {
    const post = await import(`~/posts/${params.name}.json`)

    return { post }
  }
}
</script>

<template>
  <article class="content" v-html="post"></article>
</template>
```

このコンポーネントを使って上のパターンと同じように静的ファイルを生成すると、以下のファイルが出力されます。

- `awesome-cooking.json`の内容が含まれた`awesome-cooking.html`
- `how-to-master-js.json`の内容が含まれた`how-to-master-js.html`
- **`awesome-cooking.json`の内容が含まれたJSファイル**
- **`how-to-master-js.json`の内容が含まれたJSファイル**

上のパターンとは異なり、`1JSON -> 1JS`でファイルが出力されます。

この方式を取るメリットは、やはり「必要なデータだけダウンロードする」ことでしょう。
`/posts/awesome-cooking`にアクセスした際には`awesome-cooking.json`の内容だけが、`/posts/how-to-master-js`にアクセスした場合は`how-to-master-js`の内容だけがダウンロードされるため、通信量が必要最低限になります。

一方でデメリットとして、ルート遷移時に通信が発生してしまいます。

この方式は、記事数がそこそこある場合や、利用するユーザあたりの訪問ページ数が少ない(全ページの30%に満たない等)場合に使うべきでしょう。ブログなんかはこちらを使ったほうがいいですね。

# まとめ

ざっくりとまとめると、

- データ量が少ない場合は`require`を使ってJSONを読み込む
- データ量が多い場合はdynamic importを使ってJSONを読み込む

それぞれの方式にはメリット/デメリットがあるので、要件に合わせて使い分けていきましょう。
