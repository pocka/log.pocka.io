---
name: container-component-pattern-in-vuex
title: Vue.js+VuexでContainer Componentパターン
description: Vue.js+VuexなアプリケーションをContainer Componentパターンを使って書いてみよう!
createdAt: '06/15/2018 17:00'
updatedAt: '06/15/2018 17:00'
tags:
  - article
  - vue.js
  - vuex
---
# まえがき

この記事はVue.js+Vuexなアプリケーションを、React+Reduxでよく用いられるContainer Componentパターンで設計する手法や、そのメリット/デメリット等について記載したものです。

## 想定読者

- Vue.jsとVuexについて知っている

# UIのコンポーネント/ロジックのコンポーネント

一般的に、Vue.jsである程度の大きさのアプリケーションを作る際は、Vuexを使って状態管理をすることが多いと思います。その際の書き方や設計として、Vue.js公式では以下のようなものを推奨しており、一般的にもこれが採用されているようです。

```html
<!-- todo-list.vue -->
<script>
import { mapActions, mapState } from 'vuex'

export default {
  // StateをComponentで扱えるように流し込んでいる
  computed: mapState({
    todos: state => state.todos
  }),
  // ActionsをComponentから呼べるように流し込んでいる
  methods: {
    ...mapActions(['completeTodo'])
  }
}
</script>

<template>
  <ul class="todo-list">
    <li
      v-for="todo in todos"
      :key="todo"
      class="todo"
      @click="() => completeTodo(todo)"
    >
      {{todo}}
    </li>
  </ul>
</template>

<style scoped>
.todo-list {/* スタイル */}

.todo {/* スタイル */}
</style>
```

ぱっと見た感じ良さそうに見えます。
しかし、この設計は以下のような理由から、**非常に良くない設計になっている**と言えるでしょう。

- スタイル(デザイン)とロジック(ストア関連)が混ざってしまっている
  - デザインの調整をするのにロジックが書かれているモジュールをいじるのはナンセンス
- ComponentがStoreに強く依存してしまっている
  - Componentをいじる際にStoreについて知っている必要がある
  - ViewとLogicが密結合になっている
- ComponentがVuexというライブラリに強く依存してしまっている
  - 他の状態管理ライブラリに切り替える際にコンポーネントをいじる必要がある
- 再利用性がない
- テスタビリティがない

これらの問題を解決し、良い設計に変える方法は簡単です。
スタイルやデザインに関心のある`UIのコンポーネント`と、Storeについて関心のある`ロジックのコンポーネント`に分ければ良いのです。

この`UIのコンポーネント`と`ロジックのコンポーネント`を分離し、それらを実際のアプリケーションで上手く実装できるようにしたものが、"**Presentational/Container Component Pattern**"です。

# Presentational/Container Component

Presentational/Container Component Patternはコンポーネント設計パターンの一つです。
この設計手法ではコンポーネントを"**Presentational Component**"と"**Container Component**"の2つに分類してコンポーネントツリーを組み立てていきます。

Presentational Componentは「どのように見えるか」について関心を持つコンポーネントです。
基本的にマークアップやスタイルをゴリゴリと書いていき、このコンポーネントを使う側に対して抽象化を提供します(Props等)。

Container Componentは「何を表示するか/どのように変更を行うか」についての関心を持ちます。
このコンポーネントは基本的にPresentational ComponentのPropsに対してStateやActionsを流し込みます。
マークアップやスタイルは原則ここには書きません。ラップ用の`<div>`くらいは書いてもいいということになっていますが、書かないに越したことはないです。

先ほどのサンプルコードをこの手法で書くと以下のようになります。

```html
<!-- components/todo-list.vue -->
<script>
export default {
  props: {
    todos: { type: Array, default: () => [] }
  },
  methods: {
    complete(todo) {
      this.$emit('complete', todo)
    }
  }
}
</script>

<template>
  <ul class="todo-list">
    <li
      v-for="todo in todos"
      :key="todo"
      class="todo"
      @click="() => complete(todo)"
    >
      {{todo}}
    </li>
  </ul>
</template>

<style scoped>/* 同じ */</style>
```

```html
<!-- containers/todo-list.vue -->
<script>
import { mapActions, mapState } from 'vuex'

import TodoList from 'src/components/todo-list'

export default {
  components: { TodoList },
  computed: mapState({
    todos: state => state.todos
  }),
  methods: ...mapActions(['completeTodo'])
}
</script>

<template>
  <todo-list :todos="todos" @complete="todo => completeTodo(todo)"/>
</template>
```

記述量が増えてしまいましたが、`components/todo-list.vue`からはStoreの依存が消え、Props(とevent)によるインターフェイスのみになり、**暗黙的な状態をなくすことができました**。

# Reduxに限らない

この設計手法について調べていると、おそらく殆どの記事が「React+Reduxのためのコンポーネント設計」のような書き方をしていると思いますが、そんなことはありません。

実際にReact周辺でもReact+ReduxだけではなくReact+[Relay][relay-repository]や[React+Apollo][apollo-repository]、React+[MobX][mobx-repository]でも使われることのある手法です。

また、View層に関してもReactである必要はありません。上記のサンプルコードがそのいい例ですが、Alt-React系のライブラリやもちろんVue.jsでも導入することができます。

# vuex-connect

この設計手法が最も使われているReact+Reduxでは[react-redux][react-redux-repository]では、`connect`というHOC(コンポーネントをラップするコンポーネント)によってContainer Componentを簡単に作成することができます。

そして素晴らしいことに、[vuex-connect][vuex-connect-repository]というライブラリのおかげでVue.js+Vuexでも簡単にStoreにつながったContainer Componentを作成することができます。

vuex-connectを使うと、先ほどの`containers/todo-list`を以下のように書くことができます。(jsファイルです)

```javascript
// containers/todo-list.js
import { connect } from 'vuex-connect'

import TodoList from 'src/components/todo-list'

export default connect({
  stateToProps: {
    todos: state => state.todos
  },
  methodsToEvents: {
    complete: ({ dispatch }, todo) => dispatch('completeTodo', todo)
  }
})('todo-list', TodoList)
```

StateとActionsを対象コンポーネントのPropsにマッピングする、ということが明示的な非常にシンプルな書き方ができます。

# サンプル

サンプルコードだけじゃわかりづらいと思うので実際にvuex-connectを使ってContainer Component Patternを使ったシンプルなTODOアプリケーションを作成しました。

[pocka/vue-container-component-example][sample-repository]

`src/components`配下にサブディレクトリが切られているのはAtomic Designによる区分けなのであまり気にしないでください。

# まとめ

メリット

- 関心の分離
- 暗黙的な状態をなくすことができる
- Storeに依存しなくなるため、
  - 再利用がしやすい
  - ライブラリに依存しなくなる
- 協業がしやすくなる

デメリット

- 冗長になる
- React界隈以外では知名度がなくあまり一般的ではない
- パフォーマンスオーバーヘッド(大したことはないが)
- ライブラリを追加する必要がある(デメリット?)

設計的にはメリットしかなく、パフォーマンス上のデメリットも無いに等しいので(個人の感想です)、プロジェクトで導入できそうであれば是非使ってみることをお勧めします。

## 補足

この記事の説明でよくわからなかった場合はリンク先の解説を読むとわかりやすいと思います。

- Container Component
  - [Presentational and Container Components][container-component-description] [[日本語訳][container-component-description-jp]]
- HOC(Higher Order Components)
  - [Higher-Order Components(React公式)][hoc-description-react]
  - [React Higher Order Components in depth][hoc-description] [[日本語訳][hoc-description-jp]]


[container-component-description]:https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
[container-component-description-jp]:http://better-than-i-was-yesterday.com/presentational-and-container-components/
[hoc-description-react]:https://reactjs.org/docs/higher-order-components.html
[hoc-description]:https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e
[hoc-description-jp]:https://postd.cc/react-higher-order-components-in-depth/
[relay-repository]:https://github.com/facebook/relay
[apollo-repository]:https://github.com/apollographql/react-apollo
[mobx-repository]:https://github.com/mobxjs/mobx
[react-redux-repository]:https://github.com/reduxjs/react-redux
[vuex-connect-repository]:https://github.com/ktsn/vuex-connect
[sample-repository]:https://github.com/pocka/vue-container-component-example

