---
name: typescript-builtin-type-functions
title: Typescript特有の組み込み型関数
description: Typescript特有のジェネリックな組み込み型関数の一覧と説明、及び使用例
createdAt: '07/22/2018 14:00'
updatedAt: '07/22/2018 14:00'
tags:
  - article
  - typescript
---
TypescriptにはPromiseやSymbolといったJavascript特有のグローバルオブジェクト以外に、型を扱う上で便利になるような組み込みのジェネリックな型関数<sup>※1</sup>が存在します。これらは非常に便利で様々なプロジェクトで使われているのですが、公式にリストもなく、説明も主にリリースノート等にしかないため、使い方等を交えて説明を書いていきたいと思います。

なお、各定義は[Microsoft/TypeScriptの`src/lib/es5.d.ts`にあります](https://github.com/Microsoft/TypeScript/blob/93ab352189245fd3b2751e5ab0ad3ffee4906fca/src/lib/es5.d.ts)。

<small>※1 ... 型を受け取って新しい型を返す型。多分正しい呼び名ではない。</small>

## Partial

- 利用可能バージョン: Typescript2.1~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick>

```ts
type Partial<T>
```

型Tのすべてのプロパティを省略可能(つまり`| undefined`)にした新しい型を返すMapped Typeです。

```ts
interface Foo {
  bar: number
  baz: boolean
}

type PartialFoo = Partial<Foo>

// PartialFoo {
//   bar?: number
//   baz?: boolean
// }
```

ライブラリのオプションの型を書く際等に非常に役立ちます。

```ts
interface Options {
  host: string
  port: number
}

const defaultOptions: Options = {
  host: 'localhost',
  port: 3000
}

const main = (options: Partial<Options> = {}) => {
  const opts = { ...defaultOptions, ...options }

  // ...
}

// 使う側

main({
  port: 8080
})
```

## Required

- 利用可能バージョン: Typescript2.8~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#improved-control-over-mapped-type-modifiers>

```ts
type Required<T>
```

型Tの全てのプロパティを必須にした新しい型を返します。

```ts
interface Foo {
  bar?: number
  baz: boolean
}

type RequiredFoo = Required<Foo>

// RequiredFoo {
//   bar: number
//   baz: boolean
// }
```

## Readonly

- 利用可能バージョン: Typescript2.1~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick>

```ts
type Readonly<T>
```

型Tの全てのプロパティに`readonly`属性をつけた新しい型を返します。

```ts
interface Foo {
  bar: number
  baz: boolean
}

type ReadonlyFoo = Readonly<Foo>

// ReadonlyFoo {
//   readonly bar: number
//   readonly baz: boolean
// }
```

## Pick

- 利用可能バージョン: Typescript2.1~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick>

```ts
type Pick<T, K extends keyof T>
```

型Tの中からKに当てはまるプロパティのみを抜き取った新しい型を返します。
なお、Kには型Tに存在するキーを指定する必要があります。

```ts
interface Foo {
  bar: number
  baz: boolean
  qux: string
}

type BarAndQux = Pick<Foo, 'bar' | 'qux'>

// BarAndQux {
//   bar: number
//   qux: string
// }
```

react-redux等のHoCを作成/使用する際に多用します。

なお、逆の「特定のプロパティを取り除く」という動きをする型関数は、[「既存の型を組み合わせれば簡単にできるからTypescript本体にはのっけないよ」とのことです(リンク先NOTE参照)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)。

以下のように書くことで実装できます(Typescript2.8~)。また、react-reduxは利便性の為かそれをexportしてくれています。

```ts
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// react-reduxを使っている場合
import { Omit } from 'react-redux'
```

## Record

- 利用可能バージョン: Typescript2.1~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick>

```ts
type Record<K extends keyof any, T>
```

型TなプロパティKを持つレコード型を作成します。

```ts
interface Foo {
  bar: number
  baz: boolean
}

type StringFoo = Record<keyof Foo, string>

// StringFoo {
//   bar: string
//   baz: string
// }
```

## Exclude

- 利用可能バージョン: Typescript2.8~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types>

```ts
type Exclude<T, U>
```

型Tが型Uに代入可能であれば`never`、そうでなければ型Tを返すConditional Typeです。
主にUnion Typesから特定の型を取り除く際に使われます。

```ts
type A = Exclude<string, number> // string
type B = Exclude<string, any> // never
type C = Exclude<string | number | boolean, string | boolean> // number
```

## Extract

- 利用可能バージョン: Typescript2.8~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types>

```ts
type Extract<T, U>
```

型Tが型Uに代入可能であれば型T、そうでなければ`never`を返すConditional Typeです。
Excludeの逆ですね。
主にUnion Typesから特定の型を抽出する際に使われます。

```ts
type A = Extract<string, number> // never
type B = Extract<string, any> // string
type C = Extract<string | number | boolean, string | boolean> // string | boolean
```

## NonNullable

- 利用可能バージョン: Typescript2.8~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types>

```ts
type NonNullable<T>
```

型Tから`null`と`undefined`を取り除いた型を返します。

```ts
type A = NonNullable<string | null> // string
type B = NonNullable<null> // never
type C = NonNullable<string> // string
```

## ReturnType

- 利用可能バージョン: Typescript2.8~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types>

```ts
type ReturnType<T extends (...args: any[]) => any>
```

型Tの戻り値の型を返します。なお、Tには関数型のみ指定可能です。

```ts
const foo = () => 'foo'

type A = ReturnType<typeof foo> // string
type B = ReturnType<typeof window.setTimeout> // number
type C = ReturnType<() => void> // void
```

## InstanceType

- 利用可能バージョン: Typescript2.8~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types>

```ts
type InstanceType<T extends new (...args:any[]) => any>
```

型Tのコンストラクタの返り値の型を返す型です。

```ts
class Foo {}

type A = InstanceType<typeof Foo> // Foo
type B = InstanceType<any> // any
type C = InstanceType<never> // any
```

使いどころが全くわからない...。

## ThisType

- 利用可能バージョン: Typescript2.3~
- リリースノート及びドキュメントに記載なし

```ts
type ThisType<T>
```

thisの型をTとすることができる特殊な型。型関数ではないが便利なので一応記載します。

```ts
interface Foo { bar: number }
interface Baz { qux(): string }

const quux: ThisType<Foo> = {
  myMethod() {
    return this.bar
  }
}

const corge: Baz & ThisType<Foo> = {
  qux() {
    return this.bar.toString(16)
  }
}
```

Javascriptのライブラリを使う際にあると便利な型。
詳細はQiitaに記事を上げてくれている人がいるので、それを参照してください。

[TypeScript 2.3 RC 変更点@vvakame](https://qiita.com/vvakame/items/d926f0e1b02397dbd5df#this%E3%81%AE%E5%9E%8B%E3%81%AE%E3%82%B3%E3%83%B3%E3%83%88%E3%83%AD%E3%83%BC%E3%83%AB%E3%81%8C%E3%82%88%E3%82%8A%E6%9F%94%E8%BB%9F%E3%81%AB%E8%A1%8C%E3%82%8F%E3%82%8C%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%AA%E3%81%A3%E3%81%9F)


