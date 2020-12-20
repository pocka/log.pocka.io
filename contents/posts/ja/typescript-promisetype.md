---
name: typescript-promisetype
title: TypeScriptでPromiseの型パラメータを取り出す
description: 型パラメータを取り出す簡単な方法
createdAt: 2020-01-31T13:00:00.000+09:00
updatedAt: 2020-01-31T13:00:00.000+09:00
tags:
  - blog
  - typescript
---

# やりたいこと

型`A = Promise<B>`である際に`A`から`B`を導き出したい。

```ts
type A = Promise<B>

type C = /* AからBを取り出したい */
```

# やりかた

`infer`を使う。

```ts
type PromiseType<T extends Promise<any>> = T extends Promise<infer P>
  ? P
  : never

type A = Promise<B>

type C = PromiseType<A> // B
```

型名の直後の`extends Promise...`はなくても動くが、使う際にわかりやすくなるため個人的には書くことを推奨。

ちなみに[utility-types](https://github.com/piotrwitek/utility-types)というパッケージがこの型を公開しているので、ユーティリティ型を多用する場合はそちらを使ったほうがよい。

また、Bluebird のような似非 Promise を(or も)使いたい場合は`PromiseLike`を使うとよい。

```ts
type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer P>
  ? P
  : never

type A = PromiseType<Promise<number>> // number

import * as Bluebird from 'bluebird'

type B = PromiseType<Bluebird<string>> // string
```

この`infer`を使った型パラメータの抽出は書き方を覚えておくと、さくっと書けて結構便利。

```ts
interface Box<T> {
  value: T
}

type BoxType<T extends Box<any>> = T extends Box<infer P> ? P : never

type A = Box<number>

type B = BoxType<A> // number
```

# どんなときに必要か

基本的には外部のライブラリを使う際、特に`Promise`を返す関数の結果の型を使いたい場合に役立つ。

```ts
// a.ts
export const someApi = () => Promise.resolve(0)

// b.ts
import { someApi } from 'a.ts'

type ResponseOfApi = PromiseType<ReturnType<typeof someApi>>

function mutateApiResponse(res: ResponseOfApi) {
  /* ... */
}

mutateApiResponse(await someApi())
```
