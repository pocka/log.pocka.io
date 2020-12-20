---
name: typescript-builtin-type-functions
title: TypeScript特有の組み込み型関数
description: TypeScript特有のジェネリックな組み込み型関数の一覧と説明、及び使用例
createdAt: "07/22/2018 15:00"
updatedAt: 2019-09-20T14:30:00.000+0900
tags:
  - article
  - typescript
---

TypeScript には Promise や Symbol といった Javascript 特有のグローバルオブジェクト以外に、型を扱う上で便利になるような組み込みのジェネリックな型関数<sup>※1</sup>が存在します。これらは非常に便利で様々なプロジェクトで使われているので~すが、公式にリストもなく、説明も主にリリースノート等にしかないため、~使い方等を交えて説明を書いていきたいと思います。

<blog-alert variant="note">

公式の[ドキュメントページ(英語)](https://www.typescriptlang.org/docs/handbook/utility-types.html)ができたようです。いくつか載っていないものもありますが、一先ずそちらを参照することをおすすめします。

</blog-alert>

なお、各定義は[Microsoft/TypeScript の`src/lib/es5.d.ts`にあります](https://github.com/microsoft/TypeScript/blob/v3.6.3/lib/lib.es5.d.ts#L1424)。

<small>※1 ... 型を受け取って新しい型を返す型。多分正しい呼び名ではない。</small>

## Partial

- 利用可能バージョン: TypeScript2.1~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick>

```ts
type Partial<T>
```

型 T のすべてのプロパティを省略可能(つまり`| undefined`)にした新しい型を返す Mapped Type です。

```ts
interface Foo {
  bar: number;
  baz: boolean;
}

type PartialFoo = Partial<Foo>;

// PartialFoo {
//   bar?: number
//   baz?: boolean
// }
```

ライブラリのオプションの型を書く時なんかに非常に役立ちます。

```ts
interface Options {
  host: string;
  port: number;
}

const defaultOptions: Options = {
  host: "localhost",
  port: 3000,
};

const main = (options: Partial<Options> = {}) => {
  const opts = { ...defaultOptions, ...options };

  // ...
};

// 使う側

main({
  port: 8080,
});
```

## Required

- 利用可能バージョン: TypeScript2.8~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#improved-control-over-mapped-type-modifiers>

```ts
type Required<T>
```

型 T の全てのプロパティを必須にした新しい型を返します。

```ts
interface Foo {
  bar?: number;
  baz: boolean;
}

type RequiredFoo = Required<Foo>;

// RequiredFoo {
//   bar: number
//   baz: boolean
// }
```

## Readonly

- 利用可能バージョン: TypeScript2.1~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick>

```ts
type Readonly<T>
```

型 T の全てのプロパティに`readonly`属性をつけた新しい型を返します。

```ts
interface Foo {
  bar: number;
  baz: boolean;
}

type ReadonlyFoo = Readonly<Foo>;

// ReadonlyFoo {
//   readonly bar: number
//   readonly baz: boolean
// }
```

## Pick

- 利用可能バージョン: TypeScript2.1~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick>

```ts
type Pick<T, K extends keyof T>
```

型 T の中から K に当てはまるプロパティのみを抜き取った新しい型を返します。
なお、K には型 T に存在するキーを指定する必要があります。

```ts
interface Foo {
  bar: number;
  baz: boolean;
  qux: string;
}

type BarAndQux = Pick<Foo, "bar" | "qux">;

// BarAndQux {
//   bar: number
//   qux: string
// }
```

react-redux 等の HoC を作成/使用する際に多用します。

## Omit

- 利用可能バージョン: TypeScript3.5~
- リリースノート: <https://devblogs.microsoft.com/typescript/announcing-typescript-3-5/>(TODO: TS 公式サイトの what's new に差し替え)

```ts
type Omit<T, K extends keyof any>
```

型 T の中から、キー名が K に当てはまるプロパティを*除外した*新しい型を返します。
なお、Pick とは異なり K には T のキー名以外を指定することができます。

```ts
interface Foo {
  foo: string;
  bar: number;
  baz: boolean;
}

type FooWithoutBar = Omit<Foo, "bar">;

// FooWithoutBar {
//   foo: string
//   baz: boolean
// }
```

## Record

- 利用可能バージョン: TypeScript2.1~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick>

```ts
type Record<K extends keyof any, T>
```

型 T なプロパティ K を持つレコード型を作成します。

```ts
interface Foo {
  bar: number;
  baz: boolean;
}

type StringFoo = Record<keyof Foo, string>;

// StringFoo {
//   bar: string
//   baz: string
// }
```

## Exclude

- 利用可能バージョン: TypeScript2.8~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types>

```ts
type Exclude<T, U>
```

型 T が型 U に代入可能であれば`never`、そうでなければ型 T を返す Conditional Type です。
主に Union Types から特定の型を取り除く際に使われます。

```ts
type A = Exclude<string, number>; // string
type B = Exclude<string, any>; // never
type C = Exclude<string | number | boolean, string | boolean>; // number
```

## Extract

- 利用可能バージョン: TypeScript2.8~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types>

```ts
type Extract<T, U>
```

型 T が型 U に代入可能であれば型 T、そうでなければ`never`を返す Conditional Type です。
Exclude の逆ですね。
主に Union Types から特定の型を抽出する際に使われます。

```ts
type A = Extract<string, number>; // never
type B = Extract<string, any>; // string
type C = Extract<string | number | boolean, string | boolean>; // string | boolean
```

## NonNullable

- 利用可能バージョン: TypeScript2.8~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types>

```ts
type NonNullable<T>
```

型 T から`null`と`undefined`を取り除いた型を返します。

```ts
type A = NonNullable<string | null>; // string
type B = NonNullable<null>; // never
type C = NonNullable<string>; // string
```

## Parameters

- 利用可能バージョン: TypeScript3.1~
- リリースノート及びドキュメントに記載なし

```ts
type Parameters<T extends (...args: any[]) => any>
```

関数型 T の引数の型をタプルとして抽出します。

```ts
function foo(arg1: string, arg2: number): void {}
function bar(): void {}

type Foo = Parameters<typeof foo>; // [string, number]
type Bar = Parameters<typeof bar>; // []
```

ちょくちょく使える場面はあるので覚えておくと便利です。

## ConstructorParameters

- 利用可能バージョン: TypeScript3.1~
- リリースノート及びドキュメントに記載なし

```ts
type ConstructorParameters<T extends new (...args: any[]) => any>
```

型 T のコンストラクタの引数の型をタプルとして抽出します。
`Parameters`のコンストラクタ版です。

```ts
class Foo {
  constructor(arg1: string, arg2?: boolean) {}
}

type Bar = ConstructorParameters<typeof Foo>; // [string, boolean] | [string]
```

## ReturnType

- 利用可能バージョン: TypeScript2.8~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types>

```ts
type ReturnType<T extends (...args: any[]) => any>
```

型 T の戻り値の型を返します。なお、T には関数型のみ指定可能です。

```ts
const foo = () => "foo";

type A = ReturnType<typeof foo>; // string
type B = ReturnType<typeof window.setTimeout>; // number
type C = ReturnType<() => void>; // void
```

## InstanceType

- 利用可能バージョン: TypeScript2.8~
- リリースノート: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types>

```ts
type InstanceType<T extends new (...args:any[]) => any>
```

型 T のコンストラクタの返り値の型を返す型です。

```ts
class Foo {}

type A = InstanceType<typeof Foo>; // Foo
type B = InstanceType<any>; // any
type C = InstanceType<never>; // any
```

使いどころが全くわからない...。

## ThisType

- 利用可能バージョン: TypeScript2.3~
- リリースノート及びドキュメントに記載なし

```ts
type ThisType<T>
```

this の型を T とすることができる特殊な型です。型関数ではないですが便利なので一応記載します。

```ts
interface Foo {
  bar: number;
}
interface Baz {
  qux(): string;
}

const quux: ThisType<Foo> = {
  myMethod() {
    return this.bar;
  },
};

const corge: Baz & ThisType<Foo> = {
  qux() {
    return this.bar.toString(16);
  },
};
```

Javascript のライブラリを使う際にあると便利な型です。
詳細は Qiita に記事を上げてくれている人がいるので、それを参照してください。

[TypeScript 2.3 RC 変更点@vvakame](https://qiita.com/vvakame/items/d926f0e1b02397dbd5df#this%E3%81%AE%E5%9E%8B%E3%81%AE%E3%82%B3%E3%83%B3%E3%83%88%E3%83%AD%E3%83%BC%E3%83%AB%E3%81%8C%E3%82%88%E3%82%8A%E6%9F%94%E8%BB%9F%E3%81%AB%E8%A1%8C%E3%82%8F%E3%82%8C%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%AA%E3%81%A3%E3%81%9F)
