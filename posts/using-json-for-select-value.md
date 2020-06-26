---
name: using-json-for-select-value
title: select要素の値にJSONを使う
description: 主にSPAを使ってコンポーネントを作る際に役立つTIPS
createdAt: 2020-06-26T10:00:00.000+09:00
updatedAt: 2020-06-26T10:00:00.000+09:00
tags:
  - blog
  - html
  - javascript
---

# `<select/>` は地味に面倒

複数の選択肢の中から一つを選ばせる UI である`<select/>`は便利なのでよく使われますが、SPA などを使った抽象化レイヤーに慣れていると地味に扱いが面倒です。というのも、`<option/>`の`value`は文字列だからオブジェクトをそのまま突っ込んだりできず、オブジェクトの ID やインデックスをとったりシリアライズ処理を書いて選ばれた値と欲しいデータのマッピングをするケースがよくあります。

```jsx
// Reactの場合
const items = [
  {
    id: 1,
    name: 'Foo'
  },
  {
    id: 2,
    name: 'Bar'
  }
]

const MyComponent = () => {
  const [selected, setSelected] = useState(null)

  const handleChange = ev => {
    setSelected(items.find(item => item.id === Number(ev.currentTarget.value)))
  }

  return (
    <select value={selected?.id} onChange={handleChange}>
      {items.map(item => (
        <option key={item.id} value={String(item.id)}>
          {item.name}
        </option>
      ))}
    </select>
  )
}
```

選択肢がオブジェクトだけの場合は比較的シンプルですが、`null`が混じってきたりオブジェクトではなく配列だった場合はさらに面倒になります。

# JSON で DX を爆上げする

こういった場合は`<select/>`のラッパーコンポーネントを用意することが多いですが、その際に<sup>※1</sup>オススメなのが JSON value 方式です。これは単純に、`<option/>`の`value`に`JSON.stringify`した値を使い、`<select/>`の`value`を`JSON.parse`する、というものです。

<small>※1 ... もちろんラッパーを用意しなくても使えます。</small>

```jsx
// Reactの場合

// MyOption.jsx
export const MyOption = ({ children, value }) => {
  const serialized = useMemo(() => JSON.stringify(value), [value])

  return <option value={serialized}>{children}</option>
}

// MySelect.jsx
export const MySelect = ({ children, value, onChange }) => {
  const handleChange = ev => {
    onChange(JSON.parse(ev.currentTarget.value))
  }

  const serialized = useMemo(() => JSON.stringify(value), [value])

  return (
    <select value={serialized} onChange={handleChange}>
      {children}
    </select>
  )
}

// 使い方
const Page = () => {
  const items = [
    {
      id: 1,
      name: 'Foo'
    },
    {
      id: 2,
      name: 'Bar'
    }
  ]

  const MyComponent = () => {
    const [selected, setSelected] = useState(null)

    return (
      <MySelect value={selected} onChange={setSelected}>
        {items.map(item => (
          <MyOption key={item.id} value={item}>
            {item.name}
          </MyOption>
        ))}
      </MySelect>
    )
  }
}
```

React の Context のような値の伝播を使うこともできますが、実装が複雑になる上 straight forward な使い方ではなくなってしまいます。JSON value であれば基本的な HTML(JavaScript)の利用方法で使える上、どんなフレームワークやライブラリ(ライブラリを使わなくても)でも使えます。

```html
<!-- Vueの場合(色々省略) -->
<script>
  export default {
    props: {
      value: {}
    },
    computed: {
      $_value() {
        return JSON.stringify(this.value)
      }
    },
    methods: {
      handleChange(ev) {
        this.$emit('change', JSON.parse(ev.currentTarget.value))
      }
    }
  }
</script>

<template>
  <select :value="$_value" @change="handleChange">
    <slot />
  </select>
</template>
```

# 注意点

当たり前ですが、この方法にもいくつかダウンサイド/注意点があります。

- JSON シリアライズ/デシリアライズは比較的コストの高い処理なので、パフォーマンスに気をつける必要がある(キャッシュする等)
- `Symbol`/ネイティブオブジェクト/関数等のシリアライズできないものや、`NaN`のように変換されてしまうものは値として利用できない
- オブジェクトのキー順序は担保されない: 常に同じ結果が返ってくるプラットフォームが多いが、一部(例: Go 言語)では並び順は常に同じとは限らない

パフォーマンスに関しては適切なキャッシュやメモ化をしていれば特に問題になることはないでしょう。2 つ目に関しても通常の利用であればそこまで問題になることはないですが、頭の隅にでも入れておく必要はあります。最後のものに関しては主に SSR や既にある HTML を JS でいじるときに気をつける必要が出てきます。
