---
name: container-component-pattern-in-vuex
title: Vue.js+VuexでContainer Componentパターン
description: Vue.js+VuexなアプリケーションをContainer Componentパターンを使って書いてみよう!
createdAt: 2018-06-11T10:20:37.000Z
updatedAt: 2018-06-11T10:20:37.588Z
tags:
  - article
  - vue.js
  - vuex
---
# まえがき

この記事はVue.js+Vuexなアプリケーションを、React+Reduxでよく用いられるContainer Componentパターンで設計する手法や、そのメリット/デメリット等について記載したものです。

## 想定読者

- Vue.jsとVuexについて知っている

## 出てくる概念

この記事の説明でよくわからない場合はリンク先の解説を読むとわかりやすいと思います。

- Container Component
  - [Presentational and Container Components][container-component-description] [[日本語訳][container-component-description-jp]]
- HOC(Higher Order Components)
  - [Higher-Order Components(React公式)][hoc-description-react]
  - [React Higher Order Components in depth][hoc-description] [[日本語訳][hoc-description-jp]]

# UIのコンポーネント/ロジックのコンポーネント

# Presentational/Container Component

# Reduxに限らない

# vuex-connect

[ktsn/vuex-connect](https://github.com/ktsn/vuex-connect)

# サンプル

[pocka/vue-container-component-example](https://github.com/pocka/vue-container-component-example)

# まとめ

[container-component-description]:https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
[container-component-description-jp]:http://better-than-i-was-yesterday.com/presentational-and-container-components/
[hoc-description-react]:https://reactjs.org/docs/higher-order-components.html
[hoc-description]:https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e
[hoc-description-jp]:https://postd.cc/react-higher-order-components-in-depth/
