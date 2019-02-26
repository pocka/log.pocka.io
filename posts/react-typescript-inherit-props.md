---
name: react-typescript-inherit-props
title: React+TypeScriptでPropsを継承する
description: TypeScriptでReactコンポーネントを書く際に中で使用するコンポーネントのPropsを継承する方法
createdAt: 2019-02-26T12:00:00.000Z
updatedAt: 2019-02-26T12:00:00.000Z
tags:
  - blog
  - typescript
  - react
---

# やりたいこと

React でよくあるパターンとして、親コンポーネントの Props の一部 or 全部を子コンポーネントに渡す、というものがあります。

```js
// Fooが受け取ったbaz以外のpropsをBarに渡す
const Foo = ({ baz, ...rest }) => <Bar {...rest} />

// Quxが受け取ったbaz以外のpropsをdivに渡す
const Qux = ({ baz, ...rest }) => <div {...rest} />
```

これを TypeScript で書く、というのがこの記事の目的です。

# コンポーネントに渡す場合

`extends`または Intersection Type を使います。

```ts
import { SFC } from 'react'

interface FooProps {
  hoge: string
  fuga: number
}

const Foo: SFC<FooProps> = ({ hoge, fuga }) => <div />

interface BarProps extends FooProps {
  piyo: boolean
}

// Intersection Typeの場合
type BarProps = FooProps & {
  piyo: boolean
}

const Bar: SFC<BarProps> = ({ piyo, ...rest }) => <Foo {...rest} />
```

もしも同名の Prop を追加したい場合は、その Prop を明示的に外す必要があります。

```ts
// ある型から特定のプロパティを取り除いた型を返す
type Omit<T, K> = Pick<T, Exclude<keyof T, k>>

// Bar固有のProps
interface BarOwnProps {
  hoge: string[]
  piyo: boolean
}

// Omit<FooProps, keyof BarOwnProps> = FooPropsからBarOwnPropsと同じキーを取り除いたもの
type BarProps = Omit<FooProps, keyof BarOwnProps> & BarOwnProps

const Bar: SFC<BarProps> = ({ hoge, piyo, ...rest }) => (
  <Foo hoge={hoge.join('')} {...rest} />
)

// もちろんこうしてもOK
interface BarProps extends Omit<FooProps, 'hoge'> {
  hoge: string[]
  piyo: boolean
}
```

毎回指定するのが面倒な場合は型のユーティリティを作ってもよいかもしれません。

```ts
/**
 * TとPを合成した型を返す。TとPに同名のキーが存在した場合はPのものが優先される。
 */
type Extend<T, P> = Pick<T, Exclude<keyof T, keyof P>> & P

type BarProps = Extend<
  FooProps,
  {
    hoge: string[]
    piyo: boolean
  }
>

// もしくは
interface BarProps {
  hoge: string[]
  piyo: boolean
}
const Bar: SFC<Extend<FooProps, BarProps>> = /* ... */
```

また、対象のコンポーネントの Props の型が取得できない場合は`ComponentProps`という型関数を使う必要があります。
なお、`ref`の扱いがわかる場合は`ComponentPropsWithRef`もしくは`ComponentPropsWithoutRef`を使ったほうがよいです。

```ts
import { ComponentProps, SFC } from 'react'

interface FooProps {
  hoge: string
  fuga: number
}
const Foo: SFC<FooProps> = props => <div />

interface BarProps extends ComponentProps<typeof Foo> {
  piyo: boolean
}

/*
BarProps = {
  hoge: string
  fuga: number
  piyo: boolean
}
*/
```

# 組み込み要素(HTML タグ)に渡す場合

`ComponentProps`と`ReactHTML`を使います。
なお、この場合は型の特性上`interface`での継承は使えないので Intersection Type を使う必要があります。

```ts
type FooProps = ComponentProps<ReactHTML['a']> & {
  hoge: string
}
```

コンポーネントの場合と同じく、同名のキーがある場合は一度 Omit してから合成する必要があります。

```ts
// Extendは上で定義しているもの
type FooProps = Extend<
  ComponentProps<ReactHTML['a']>,
  {
    title: boolean
  }
>
```

## おまけ

ジェネリクスを使うとこんなこともできます。

```ts
import { createElement, ComponentProps, ReactElement, ReactHTML } from 'react'

type Tags = 'p' | 'input'

type FooProps<T extends Tags> = ComponentProps<ReactHTML[T]> & {
  htmlTag?: T
}

const Foo: <T extends Tags = 'p'>(p: FooProps<T>) => ReactElement = ({
  htmlTag: Component = 'p',
  ...rest
}) => createElement(Component, rest)

const Bar = <Foo htmlTag="input" value="" /> // OK
const Baz = <Foo value="" /> // Error: Property 'value' does not exist on ...
const Qux = <Foo htmlTag="p" value="" /> // Error: Property 'value' does not exist on ...
```

# おわりに

コンポーネントを TypeScript で書いたり、型定義を置いておくと利用する側が非常に使いやすくなります。
なのでどんどん TypeScript でコンポーネントを書いていきましょう。特にライブラリを書く場合は絶対に型定義を置きましょう！
