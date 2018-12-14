---
name: js-read-then-write
title: JavascriptのパフォーマンスTip - Read.then(write)
description: ブラウザのレンダリングパフォーマンスを上げるための小技についての紹介
createdAt: 2018-12-14T15:00:00.000+09:00
updatedAt: 2018-12-14T15:00:00.000+09:00
tags:
  - article
  - javascript
  - cds2018
  - performance
---

# 概要

2018/11/12~13にサンフランシスコでChrome Dev Summit 2018が開催されました。
当日のセッションの様子はYouTube上でライブストリームされ、アーカイブも残っています。
この記事では個人的に特に面白かった、"Smooth Moves: Rendering at the Speed of Right ®"セッションの中の"Read.then(write)"というパフォーマンスTipを紹介したいと思います。

英語がわかる人は該当のセッションを直接聞いた方が早いと思うので記事最下部に埋め込んである動画を視聴することをおすすめします。

# ブラウザのレンダリングフレーム

Javascriptで要素のスタイルを変えたり子要素を追加したりすると、ブラウザ上の要素の見た目も変わります。単純で当たり前のことのように思えますが、実際にブラウザが裏側で行っている処理はそこまで単純ではありません。

CSSをある程度知っていたりパフォーマンスチューニングをしたことのある人なら知っているとは思いますが、要素を画面上に描画するためにはいくつかのステップがあります。よく知らない人は[ここ](https://developers.google.com/web/fundamentals/performance/rendering/)でわかりやすく説明されているので参照してください。

この記事ではレンダリングのサイクルに関しては知っているものとして話を進めます。

# Forced Layout

基本的にJavascriptでLayoutに関するプロパティを変更したり、子要素を追加したりすると、ScriptからCompositeまでの処理がストレートに走ります。

```js
foo.style.width = '10px'

console.log('foo')

// --- Script終わり ---

// Style()
// Layout()
// Paint()
// Composite()
```

しかし、Layoutに関する変更(A)を加えた後にLayoutに関する値(B)を取得しようとした場合、Bの値はAを行った結果である必要があります。これを実現するため、ブラウザはScriptをペンドしてStyleとLayoutを行うことになります。

```js
foo.style.width = '100%'

// Style()
// ForcedLayout()

console.log(foo.clientWidth) // width=100%で計算された値である必要がある

console.log('foo')

// --- Script終わり ---

// Paint()
// Composite()
```

この、強制的に走ってしまうStyleとLayout(ForcedLayout)はメインスレッドをブロックして行われるため、パフォーマンスに悪影響を与えてしまいます。

そして何よりも最悪なのが、この後に再度変更する処理がある場合です。
この場合はForcedLayoutによって計算されたレイアウトを破棄して再度計算する必要があるため、またStyleとLayoutを行うことになります。

```js
foo.style.width = '100%'

// Style()
// ForcedLayout()

console.log(foo.clientWidth)

foo.style.width = '50vh' // 先に計算されたLayoutを破棄(Invaliadte)してしまう

console.log('foo')

// --- Script終わり ---

// Style()
// ForcedLayout()
// Paint()
// Composite()
```

# Read.then(write)

このように、ForcedLayoutを使うとレンダリングパフォーマンスが落ちてしまうため、先に値を取得し、その後に変更を行うようにすることでレンダリングをスムーズに行うことができます。セッションの中ではこれを"Read.then(write)"として小見出しにしていました。

昨今のフロントエンドではDOMを直接操作する機会はかなり少なくなりました。しかしそれでも、スクロール処理を書いたり、hackyな処理を行うためにDOMに触る際にはレイアウト系プロパティ/メソッドをいじることになります。そういった場合に、この`Read.then(write)`を意識しておくと不必要なパフォーマンス低下を避けることができたり、チューニングの際に頭を悩ませる必要が少なくなります。

# セッション動画

CDS2018での該当セッションの動画です(英語)。キャプションは自動生成ではなく手動生成のため、英語が読めるなら内容は理解できるかと思います。

<div class="youtube">
<iframe width="560" height="315" src="https://www.youtube.com/embed/AB9qSUhlxh8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

