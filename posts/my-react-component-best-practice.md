---
name: my-react-component-best-practice
title: pocka流Reactコンポーネントの書き方ベストプラクティス
description: 自分がReactのコンポーネントを書く際に意識していることや個人的なベストプラクティスを共有するよ
createdAt: 2019-05-30T14:00:00+09:00
updatedAt: 2019-05-30T14:00:00+09:00
tags:
  - article
  - typescript
  - react
---

# 概要

普段プライベート/仕事共に React を書くことが多いのですが、その中で得た知見や経験則といったものを、他の人のコードレビュー時や設計時に上手く伝えられないケースが多々ありました。また、他の人がどういった書き方をしているか、ということを知るのは引き出しの幅を広げたり意外な発見ができたりします。
そのため、これまでの自分の経験を元にした自己流ベストプラクティスを共有したいと思います。

なお、メモ的な役割があったり、感覚的な部分もあるのであまりまとまった文章になっていないです。

<div class="notification is-info">- これらはあくまでも個人的なベストプラクティスであり全ての開発者/プロジェクトに当てはまるとは限りません。
- 全てTypeScript導入を前提としています。
</div>

---

# スタイリング可能なコンポーネント

原則全てのコンポーネントが`className`と`style`を受け取り、最も外側にある要素に受け渡すようにします。これにより、スタイルの拡張が簡単に行えます。

```jsx
// css-modules
return <Foo className={styles.centered} />

// styled-components
const CenteredFoo = styled(Foo)`
  margin: auto;
`

// emotion(css)
const centered = css`
  margin: auto;
`

return <Foo css={centered} />
```

また、このパターンを使っていると`コンポーネント内でどこまでスタイリングをするか`が自然と綺麗に行われるようになり、コンポーネントの抽象化を上手く行えるようになります。

実装する際はこれらだけの Props を作り、Intersection してやる(?)といいです。

```jsx
import { CSSProperties } from 'react'

interface StyleProps {
  className?: string
  style?: CSSProperties
}

// /components/Foo.ts
import { FC } from 'react'

interface Prop {
  bar: string
}

export const Foo: FC<Props & StyleProps> = ({ bar, ...rest }) => (
  <button {...rest}>{bar}</button>
)
```

## 適用例外

- 最も外側にあるのが`React.Fragment`
- Context.Provider のようなロジックのみのコンポーネント

---

# `children`を使う

特に React やコンポーネント設計に慣れていない人がやりがちなのが、`なんでもかんでもPropsに入れてしまう`というもの。`children`をしっかりと使うとコンポーネントツリーが綺麗になるだけでなく以下のようなメリットがあります。

- リスト表示の際にハンドラをキャッシュ(`useCallback`等)しやすくなる
- スタイルの境界線が自然と綺麗になる
- コンポーネントの抽象化として自然
- 無駄な Props のバケツリレーが起きづらくなる

余談ですが、このやり方は Web Components でコンポーネントを作成する際には必須となります。

```jsx
// 一覧表示の例

// 微妙
const PostsPage: FC<{ posts: IPost[] }> = ({ posts }) => <Posts posts={posts} />

// いい感じ
const PostsPage: FC<{ posts: IPost[] }> = ({ posts }) => (
  <Posts>
    {posts.map(post => (
      <Post name={post.name} />
    ))}
  </Posts>
)
```

感覚としては"スタイルを司るコンポーネント"と"動きを司るコンポーネント"に分離する、という感じです。Container/Presentational Component パターンに近いです。

## 適用例外

- 要素毎`useMemo`する場合
- このやり方を好かない場合
- Props として渡したほうが適当な場合

---

# スタイリングは既存のプロパティや属性を使う

これは styled-components や emotion を使っている場合のみですが、コンポーネントの状態に応じてスタイルを切り替える場合に HTML の属性を使う、というものです。
styled-components や emotion では Props に応じて中のスタイルを変えることができますが、変更の都度計算を行うためパフォーマンスに悪影響があります。そのため、HTML の属性やアクセシビリティ系のプロパティを変更して、スタイル側ではそれを参照するようにすると無駄なパフォーマンスコストが発生しなくなります。
`style`プロパティを使うのもいいですが、`useMemo`を使わないと参照が毎回変わる、詳細度が高くなる、座標のような超動的なものと一緒になってしまう、等の理由からこちらのやり方を推奨します。

```jsx
const Dialog = ({ children, visible }) => (
  <Container aria-hidden={!visible}>
    {children}
  </Contaienr>
)

const Container = styled.div`
  display: none;

  &[aria-hidden="false"] {
    display: block;
  }
`
```

特にアクセシビリティ系(主に`aria-*`)のものを使うと、自然とアクセシビリティも高くなり<sup>※1</sup>一石二鳥なので非常におすすめです。

<small>※1 ... どんなプロパティがあってどう使うかの知識がある、もしくは学びながら進める前提です。知らずに適当に使えばアクセシビリティはめちゃくちゃ下がります。</small>

## 適用例外

- クラス再生成のコストを気にしない場合
- クラス再生成のコストよりも Props を主軸とした抽象化が大事な場合

---

# Storybook, Container/Presentational Component

プロジェクトに Storybook を導入し、Container/Presentational Component パターンでコンポーネントを作成することで、コンポーネントとロジックの作成作業が**完全に**分離されます。複数人で作業をする場合はもちろん、個人で作業する場合でも非常に効果があります。

## 適用例外

- コンポーネントがめっちゃ少ない
- ロジックも見た目も全部ごちゃまぜにしたい
  - 見た目を気にしない適当な PoC やプロトタイプとか

---

# 終わりに

React やコンポーネント作成に限らないですが、しっかりと方針やルール、ガイドラインを設けてやるのが大切です。
もし、`これ違くない？`とか、`こうやったらもっとシンプルになるよ`とかあれば[Issue](https://github.com/pocka/log.pocka.io/issues)でも[PR](https://github.com/pocka/log.pocka.io/edit/master/posts/my-react-component-best-practice.md)でももらえると嬉しいです！
