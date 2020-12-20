---
name: js-network-resource-algebraic-data-type
title: 非同期データを宣言的にView層に持ち込む
description: Tagged Unionを使って非同期なデータを宣言的にView層に持ち込む手法の紹介
createdAt: 2020-11-21T00:00:00.000+09:00
updatedAt: 2020-11-21T00:00:00.000+09:00
tags:
  - article
  - javascript
  - typescript
  - react
---

# 対象読者

- JS/TS でアプリケーションを組める
- 基本的な TypeScript のコードが読める
- 非同期処理を View 層で処理するのに困っている / 今の書き方に満足していない
- 関数型プログラミングって実際使えるの？いいの？って疑問に思っている

コードサンプルは基本的に TypeScript で書かれています。一部を除いてわかりやすいようにシンプルに書いています。
また、View 層は React で書いていますがライブラリは問いません。ただ TypeScript との相性がいいライブラリほど有用性が高まります。

この記事に書かれているコードはあくまでも実装の一例であり、実際にこの手法を利用する場合は要件や用途に合わせたコードを書いてください。

# 解決したい問題

SPA が広く普及したことにより、クライアントサイドの複雑さは昔に比べて非常に増えました。特に一番複雑化に寄与しているのが UI と非同期処理の組み合わせです。
読み込みやエラーといった状態の上にビジネスロジックが乗るせいで、簡潔に書くことが難しく、バグの温床になりやすいのです。

今回は、特に頻度の高い非同期データの UI での表示の複雑さを関数型プログラミング<sup>※1</sup>の手法を取り入れて解決してみます。

なお、わかりやすくするために非同期データ=ネットワーク越しのデータ(= `fetch` や XHR で取得するもの)とします。

<small>※1 ... 正しくいうなら関数型プログラミングのものというわけではないが、ちゃんと活用しているのが主に関数型プログラミング界隈なのと関数型の要素との相性が非常にいいため。</small>

# 複雑さの理由

非同期データが扱いにくいのはその状態の多さです。最小でも以下の 4 パターンの状態が存在します。

- 読み込みが開始されていない
- 読込中
- 読み込まれた
- エラー

そしてこれをよくある書き方、特に手続き型なスタイルで多い方法で表すなら以下のようになるでしょう。

```tsx
// サンプルとしてどこかのAPIからユーザを取得する、という想定とします
// また、以降のサンプルも全て同じ想定とします
function SampleComponent() {
  // ユーザをAPIからfetchしてくるHooksとします (実装はReact固有なので省略)
  // コンポーネント表示時に自動的にfetchするHooksとします
  const userApi = useUserApi()

  // 読み込み未開始は面倒なので省略しています
  // 以降のサンプルでも全て省略します
  if (userApi.isLoading) {
    return <p>読込中です...</p>
  }

  if (userApi.error) {
    return <p>エラー: {userApi.error}</p>
  }

  return <p>名前: {userApi.value.name}</p>
}
```

最小限しか書いていないのもありますが問題ないように見えます。しかし、"状態" という観点から見るととても複雑なコードとなっています。

## 変数による状態の管理

それぞれの属性 (=変数、上記コードの場合は`userApi.isLoading`や`userApi.error`等) で状態を表現しようとすると、プログラムが表現する状態の数が実際に起きうる、もしくは必要な状態数よりもかなり多くなってしまいます。

上記コードを例にすると、起きうる状態は

- API から読み込んでいる途中 (LOADING)
- 読み込みに失敗した (FAILED)
- API からユーザ情報を取得した (OK)

の 3 つですが、コードで表現される状態は `isLoading` `error` `value` それぞれのとりうる値の組み合わせの総数となります。「状態に応じてそれぞれちゃんと値を設定するでしょ」と思うかもしれませんが、プログラム的に制限されない = 書いている人間に全て任されることになります。人間は間違える生き物なのでプログラム的に起き得ないようにするべきでしょう。

## 認知コストの増大

とりうる状態を読み取ろうとする際に、結果の属性 (`userApi`の中のプロパティ) を全て把握する必要があります。特に複数の処理を同時に扱ったりすると把握が非常に難しくなります。人間の脳は簡単にスタックオーバーフローを起こすので、できるだけ避けるべきでしょう。

## TypeScript との親和性の悪さ

上記コードをちゃんとした TS で書くなら以下のようになります。

```tsx
function SampleComponent() {
  const userApi = useUserApi()

  if (userApi.isLoading) {
    return <p>読込中です...</p>
  }

  if (userApi.error) {
    return <p>エラー: {userApi.error}</p>
  }

  return <p>名前: {userApi.value!.name}</p>
}
```

違いは最後の`return`内の`userApi.value`に`!`、つまり「`null`や`undefined`じゃないよマーク」がついたことです。これは一般的に書かれるこのパターンの型が以下のようになっているためです。

```ts
// useUserApiの返却値の型
interface UserApi {
  isLoading: boolean
  error: Error | null
  value: User | null // Userはユーザ情報の型定義とします
}
```

ロジック上は`isLoading === true`、もしくは`error === null`でなければ`value === null`にはならないのですが、プログラム的にはそうじゃない場合というのが発生してきます。この Non-Nullish キャストは `any` 型と同じくできるだけ避けないと型システムによる安全性というものを失ってしまいます。ただ一応、[直和型 (Union Type)][ts-union-doc] を使うことで回避することはできますが、使い勝手が悪くなり値を提供する側 (`useUserApi`の実装) も少し複雑になってしまいます。実際に View 層で扱おうとすると非常に面倒で、結果的に Non-Nullish キャストや`any`が湧いてきてしまいます。

[ts-union-doc]: https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#unions-with-common-fields

```ts
type UserApi =
  | {
      isLoading: true
      error: null
    }
  | {
      isLoading: false
      error: Error
    }
  | {
      isLoading: false
      error: null
      value: User
    }
```

# 状態を表すデータ型: Tagged Union

この、「フラグや変数による状態の表現」の代わりに関数型言語<sup>※2</sup>でよく使われているのが Tagged Union(Sum Types, Discriminated Union) というものです。数学が苦手なので詳しい説明はググってもらうとして、雑に言うなら`区別ができて、値を持てる型`です。Haskell では Algebraic data type (代数的データ型、ADT 厳密には異なる？)、Elm では Custom Type、OCaml や ReasonML では Variant と呼ばれているみたいです。

この Tagged Union というのは「状態の表現」という目的を果たすのに最も適していると言っても過言ではないしょう。例として Elm で上記のサンプルコードを書き直してみます。なるべくシンプルに書いているので Elm を知らない/よくわからないという人でもなんとなくわかるようになっているはずです。

```elm
{--
Elmでは本来エラー用の型を使わず、Result型というものを使ってエラーを表現するのですが、
比較しやすくするために文字列でエラーを保持するようにしています
--}
type UserApi
  = Loading
  | Failed String
  | Ok User

{--
Hooksの代わりにAPIの状態を引数で渡しています
--}
sampleComponent : UserApi -> Html Msg
sampleComponent userApi =
  case userApi of
    Loading ->
      p [] [ text "読込中です..." ]
    Failed err ->
      p [] [ text ("エラー:" ++ err )]
    Ok user ->
      p [] [ text ("名前:" ++ user.name )]
```

`case ~ of`はパターンマッチングと呼ばれるもので、JS で言うならそれぞれの枝が値を返す`switch`の式バージョンだと考えて大丈夫です。このサンプルでは状態に応じて返す内容の全体が変わりますが、部分的に変わるような UI でも問題なく書けます。

コードの`sampleComponent`の部分を見るとわかるかと思いますが、Tagged Union や代数的データ型を使うと以下のメリットがあります。

- 状態の数が必要な分だけになる (プログラム的にも認知的にも)
- その状態に関連する値だけを考えればよい
  - サンプルを例にすると、エラー時のエラー内容や読み込み完了時のユーザ情報
  - そもそも別の状態にしか存在しない値にアクセスできなくなる
  - ex) `Loading`状態のときに`user`の値は取得できない

この Tagged Union は React とそれ以降の View ライブラリのほとんどが採用している宣言的レンダリングとの相性が非常に良いのです。React は関数型ベースのデザインになっているので当然といえば当然なんですが。

<small>※2 ... もちろん全部ではない。静的型付けの関数型(寄り)の言語は持っている気がする。あと Rust にような新しい言語にも乗ってたりする。</small>

# JS/TS で Tagged Union

JS ではコンベンション、 TypeScript ではちゃんと型定義をすることで、ただのオブジェクトを使って Tagged Union を実現できます。

```tsx
// TypeScriptがなくても書けますが、TypeScriptを使うことを*強く*推奨します
type UserApi =
  | {
      state: 'loading'
    }
  | {
      state: 'failed'
      error: Error
    }
  | {
      state: 'ok'
      value: User
    }

function sampleComponent() {
  const userApi: UserApi = useUserApi() // useUserApiがUserApi型を返すものとします

  // if文を使って書くこともできますが、今回は返す内容が部分的ではなく全部異なるのでswitchの方が適しています
  switch (userApi.state) {
    case 'loading':
      return <p>読込中です...</p>
    case 'failed':
      return <p>エラー: {userApi.error}</p>
    case 'ok':
      // nullからの解放!
      return <p>名前: {userApi.value.name}</p>
  }
}
```

文法が違うことを除けば Elm 版のコードと殆ど一緒です。重要なのは、**オブジェクトに識別用のプロパティをもたせる**ことです。このサンプルの場合は`state`というプロパティがその対象の状態を表します。TypeScript を使っていれば現在の状態に紐付いていないプロパティにはアクセスできなくなります。

```tsx
// ...

switch (userApi.state) {
  // ...
  case 'failed':
    // 以下のuserApi.value.nameの部分がコンパイルエラーになる
    return (
      <p>
        エラー: {userApi.error} (ユーザ={userApi.value.name})
      </p>
    )
  // ...
}
```

このデザインは意外とよく使われていて、有名なところだと Redux の Actions が採用しています。というか JS 界隈は Redux で広まったのかも...と思っちゃうくらいメインコンセプトとして使われてます。

## 実際に使うには

非同期データを View 層に渡す度に逐一この型定義を書くのは無駄なので、ジェネリック型にまとめることで使いやすく、見やすくなります。

```ts
// progress: number みたいのをつけて進捗表示を出す、といったことも簡単にできます
interface Loading {
  state: 'loading'
}

interface Failed<E = Error> {
  state: 'failed'
  error: E
}

interface Ok<T> {
  state: 'ok'
  value: T
}

type RemoteResource<T, E = Error> = Loading | Failed<E> | Ok<T>
```

型チェックがあっても文字列比較を都度書きたくない！という場合はヘルパを作るといいでしょう。

```ts
function isLoading(r: RemoteResource<any>): r is Loading {
  return r.state === 'loading'
}

function isFailed<E>(r: RemoteResource<any, E>): r is Failed<E> {
  return r.state === 'failed'
}

function isOk<T>(r: RemoteResource<T>): r is Ok<T> {
  return r.state === 'ok'
}
```

また、関数型でよく使われるだけあって関数でアレコレするのと非常に相性がいいです。

<details>
<summary>サンプル: 複数の非同期データをまとめる関数</summary>

```ts
// 実際のプロジェクトで使っている関数を一部改変
//
// 複数の非同期データを一つの非同期データとしてまとめる関数
// 実際に使われているものは読込中の進捗(%)もいい感じにまとめられる
const combineRemoteResources = <C, T extends any[]>(
  combine: (...args: T) => C,
  ...resources: { [K in keyof T]: RemoteResource<T[K]> }
): RemoteResource<C> => {
  const failed = resources.find(isFailed)

  if (failed) {
    return failed
  }

  const loading = resources.find(isLoading)

  if (loading) {
    return { state: 'loading' }
  }

  const allOk = resources.every(isOk)

  if (allOk) {
    return {
      state: 'ok',
      value: combine(...((resources as Ok<any>[]).map(r => r.value) as T))
    }
  }

  return { state: 'empty' }
}

const user: RemoteResource<User>
const isJoined: RemoteResource<boolean>

// user=loading && isJoined=ok ... loading
// user=loading && isJoined=failed ... failed
// user=ok(ユーザ) && isJoined=ok(false) ... ok(null)
// user=ok(ユーザ) && isJoined=ok(true) ... ok(ユーザ)
combineRemoteResources(
  (user, isJoined): User | null => (!isJoined ? null : user),
  user,
  isJoined
)
```

</details>

## 実装時の注意

あくまでもこの「非同期処理の状態を Tagged Union で表す」のはロジックと View 層の境界のみにしましょう。JS には Promise/async-await といった非同期に関する扱いやすい標準があるため、ロジック内部等までこれをしてしまうと不揃いになりとても扱いにくくなってしまいます。この手法は宣言的なフローに持ち込むことによって真価を発揮します。なお、fp-ts 等を使ってアプリケーションを全部関数型チックに書くのであればこの限りではありません(そもそもそういう書き方をする人はこんな記事見ないと思いますが)。

# おわりに

関数型言語を使ったり、関数型のスタイルに切り替えるのはとても大変です。しかし、プログラミング言語もデザインパターンも所詮は道具、必要なときに必要な分だけ使っても全然問題ないのです。ES2015 以降の JavaScript や TypeScript は関数型言語の血が濃くなってきているので関数型界隈で使われているデザインや手法との相性がいい場面がどんどん増えてきています。関数型言語を学ぶことは実践で使える引き出しを増やすことにもなるので、実際に使う機会がなかったとしても学んでみることをおすすめします。

「この宣言的な感じいいな〜」とか「全部こんな感じで書きたいな〜」とか「言語レベルでのサポートとかパターンマッチングいいな〜」て思った人は以下のものを試してみるときっと幸せになれます。

- [ReasonML](https://reasonml.github.io/)
  - OCaml という関数型言語をベースにした言語。JS にコンパイルできる(というかそれがメインな気が)。
  - JS との親和性 (interop, 相互運用性) を重視しているので実際のアプリケーションにガンガン使える。多分。
  - Facebook 製なこともあり React との相性がいい。というか JSX がある。
- [Elm](https://elm-lang.org/)
  - Haskell ベースの関数型言語。AltJS。
  - 文法が非常にシンプルになってる。
  - 純粋 = コンポーネントの概念がない = ステートを持てない ので実用的な UI を作る場合は CustomElements とかと併用することになると思う。
  - Redux の基になっている。
  - JS やブラウザ API との相互運用性はかなり微妙。色々見てると作者はあまり web に聡くないと感じる (それで成り立つくらい抽象化されているとも言える)。
- [fp-ts](https://github.com/gcanti/fp-ts)
  - TypeScript で関数型プログラミングをするための型やオブジェクト、関数が詰まったライブラリ。
  - 部分的に使うもよし、全部関数型で書いてみるもよし。
  - ドキュメントが微妙。
  - AltJS と異なり、型の判定とかはオブジェクトとかを使ったランタイムでのタグチェックになる。パフォーマンス第一なとこなんかで使う場合は軽くソースコードを確認してから使うことを推奨。
