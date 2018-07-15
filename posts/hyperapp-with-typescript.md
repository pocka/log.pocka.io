---
name: hyperapp-with-typescript
title: TypescriptでHyperappを書く
description: Typescriptを使ってHyperappアプリケーションを書いてみよう
createdAt: 2018-01-13T22:58:15.689Z
updatedAt: 2018-07-15T08:00:15.000Z
tags:
  - article
  - typescript
  - javascript
  - hyperapp
---
# はじめに

この記事はTypescript2.xを使用して、[Hyperapp](https://github.com/hyperapp/hyperapp)を使ったアプリケーションを書くためのドキュメントである。

HyperappのドキュメントにはTypescriptでの使い方が書いていないため書いた。
まぁTS型定義のテストファイル見れば使い方わかるんだけどね...

この記事で書かれているコードの確認環境は以下の通り

- Hyperapp@1.2.6
- Typescript@2.6.2

また、仮想ノードの構築にはJSX(`.tsx`)を用いる。

# 基本編

## Stateを書く

まず最初にstateの型を定義する必要がある。
単純にstateの型をそのまま書いてやればよい。

```ts
interface State {
  count: number
}

const state: State = {
  count: 0
}
```

## Actionsを書く

次にactionsの型を定義する。
各actionの型は「入力を受け取ってstateを返す」関数として定義する。

```ts
interface Actions {
  increment(): State
  decrement(value: number): State
}
```

そして定義した型を基にactionsを実装する。
実装側は`ActionsType`型を使うため、`input? => (state?, actions?) => result`となるようにする。
`result`の部分の型定義は[公式の型定義ファイル](https://github.com/hyperapp/hyperapp/blob/fe91524ae43399eac350b65769fa883173bf8818/hyperapp.d.ts#L58)を参照してね。

```ts
import { ActionsType } from 'hyperapp'

const actions: ActionsType<State, Actions> = {
  increment: () => (state, actions) => ({ count: state.count + 1 }),
  decrement: (value: number) => (state, actions) => ({ count: state.count - value }),
}
```

...しかし、残念なことに現時点では定義したActionsの型情報があまり役に立たたない。

```ts
// このように書いてもTSのコンパイルは通ってしまう
const actions: ActionsType<State, Actions> = {
  increment: (value: number) => (state, actions) => ({ count: value }),
  decrement: (value: string) => (state, actions) => ({ count: value })
}
```

actionsの実装に於いてはアクション名のチェック程度にしか使えないと考えておいたほうがよい。

## Viewを書く

ロジックの次はviewを書く。特に難しいことは無い。

```jsx
import { h, View } from 'hyperapp'

const view: View<State, Actions> = (state, actions) => (
  <main>
    <button onclick={() => actions.decrement(1)}>-</button>
    <span>{state.count}</span>
    <button onclick={() => actions.increment()}>+</button>
  </main>
)
```

ジェネリクスパラメータで指定している`State`と`Actions`がここではちゃんと活きている。

```jsx
// これはコンパイルエラーになる
const view: View<State, Actions> = (state, actions) => (
  <main>
    <button onclick={() => actions.decrement('1')}>-</button>
    <span>{state.count}</span>
    <button onclick={() => actions.increment(1)}>+</button>
  </main>
)
```

## がっちゃんこ

最後にstate, actions, viewをがっちゃんこする。
ジェネリクス指定してあげる以外はTS的な要素はない。

```ts
import { app } from 'hyperapp'

app<State, Actios>(
  state, actions, view, document.getElementById('app')
)
```

# 応用編

## モジュール化する

> ここでいう「モジュール化」とはstateとactionsをグループ化することであり、ESModulesのことではない。

直感的にそのまま分ければ大丈夫。

```ts
// modules/counter.ts
import { ActionsType } from 'hyperapp'

export interface State { count: number }
export const state: State = { count: 0 }

export interface Actions {
  increment(): State
  decrement(value: number): State
}
export const actions: ActionsType<State, Actions> = {
  increment: () => state => ({ count: state.count + 1 })
  decrement: (value: number) => state => ({ count: state.count - value })
}
```

```ts
// index.ts
import * as Count from './modules/counter'

interface State { count: Count.State }
const state: State = { count: Count.state }

interface Actions { count: Count.Actions }
const actions: ActionsType<State, Actions> = {
  count: Count.actions
}
```

これで`state.count.count`や`actions.count.increment`としてアクセスできるようになる。

## Componentを書く

コンポーネントは至ってシンプル。

```jsx
// components/Counter.tsx
import { h, Component } from 'hyperapp'

interface Props {
  count: number
  onchange(v: number): any
}

const Counter: Component<Props> = ({ count, onchange }) => (
  <div>
    <button onclick={() => onchange(count - 1)}>-</button>
    <span>{count}</span>
    <button onclick={() => onchange(count + 1)}>+</button>
  </div>
)

export default Counter
```

ただ、このまま書いていくとpropsのバケツリレーが起きてしまう。そのため、[Lazy Components](https://github.com/hyperapp/hyperapp#lazy-components)という機能を使い、StateとActionsを直接コンポーネントに渡して冗長さを軽減することができる。

```jsx
// ...

import { State, Actions } from '../'

// Component<Props, State, Actions>なので、propsを受け取らない場合は{}を指定する
const Counter: Component<{}, State, Actions> = () => (state, actions) => (
  <div>
    <button onclick={actions.count.decrement}>-</button>
    <span>{state.count.count}</span>
    <button onclick={actions.count.increment}>+</button>
  </div>
)

// ...
```

# おわりに

以上Hyperappの各要素にフォーカスした書き方でした。

実際のサンプルが見たい場合は[Typescript+Hyperapp(+CSS Modules) build with Webpackなサンプルプロジェクトを用意している](https://github.com/pocka/hyperapp-typescript-demo)ので、そちらを見てね。





