---
name: react-context-api-tabindex
title: ReactのContextを使ったtabindex制御
description: ReactアプリケーションでContext APIを使い柔軟かつ直感的にtabindexのON/OFFを制御する方法について説明します
createdAt: 2019-09-20T18:00:00.000+09:00
updatedAt: 2019-09-20T18:00:00.000+09:00
tags:
  - blog
  - javascript
  - react
  - a11y
---

# はじめに

Web のアクセシビリティの話でまず出てくる`tabindex`属性、皆さんちゃんと使っていますでしょうか。
特にスタイルに凝っていない、普通の web サイトを作る場合は特に指定しなくても勝手にいいかんじに動いてくれる<sup>※1</sup>ので、もしかしたら使ったことがない人もいるかもしれません。

この属性は Web アクセシビリティ的には非常に重要となります。
しかし、特に SPA を実装する場合なんかに割と無視されがち<sup>※2</sup>なうえ、単純だけどちゃんと設定しようと思うと地味に面倒なんですよね。

この記事では React を使ったアプリケーションにおいて、簡単、直感的かつ柔軟に`tabindex`を管理する方法について説明します。

**なお、[`inert`](https://html.spec.whatwg.org/multipage/interaction.html#inert)を使う場合(要[polyfill](https://github.com/search?q=inert+polyfill))はこの記事の内容は必要なくなります。**

<small>※1 ... `:focus`のスタイルを外したりしない前提</small>
<small>※2 ... 筆者の体感です</small>

## 想定読者

- React を使ったアプリケーションを書ける
- React の [Context API](https://reactjs.org/docs/context.html) についてある程度理解している
- `tabindex`属性がどんなものか知っている([`tabindex` at MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/tabindex))

# TL;DR

- `TabNavigatableContext(boolean)`のようなコンテキストを作成する
- タブによるフォーカス可能な要素はそのコンテキストの値を見て`tabindex`を`0`か`-1`を設定する
- あるコンポーネント以下の要素全てにフォーカスを巡らせたくない場合は`<TabNavigatableContext.Provider value={false}>`で要素を包む
- モーダルがある場合は Provider 内で参照 or トップレベルコンポーネントで制御

```jsx
const Button = () => {
  const isTabNavigatable = useContext(TabNavigatableContext)

  return <button tabIndex={isTabNavigatable ? 0 : -1}>BUTTON</button>
}

const App = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <TabNavigatableContext.Provider value={!modalVisible}>
      <TabNavigatableContext.Provider value={modalVisible}>
        <Modal visible={modalVisible}>
          <Button />
        </Modal>
      </TabNavigatableContext.Provider>
      <Button />
    </TabNavigatableContext.Provider>
  )
}
```

# タブナビゲーション可能かどうかのコンテキスト

このテクニックの中心は、「コンテキスト内の要素のフォーカス可/不可」を提供するコンテキストです。

```jsx
// コンテキスト外で使った際にフォーカスが当たらなくなってしまうのを防ぐため
// 初期値はフォーカスが当たるようにしている
const TabNavigatableContext = createContext(true)

// コンテキストのプロバイダ
const TabNavigatableProvider = ({ children, navigatable = true }) => {
  return (
    <TabNavigatableContext.Provider value={navigatable}>
      {children}
    </TabNavigatableContext.Provider>
  )
}
```

このコンテキストは `navigatable`の値を伝播するだけのものとなります。
そして、フォーカスが当たる可能性のある要素全てでこのコンテキストの値を参照します。

```jsx
const MyButton = props => {
  // navigatable: boolean
  const navigatable = useContext(TabNavigatableContext)

  return <button tabIndex={navigatable ? 0 : -1} {...props} />
}
```

あとは普通にコンポーネントを使うだけです。
もし、子要素にフォーカスを当てたくないコンポーネントがある場合は、`TabNavigatableProvider`で子要素を優しく包み込んであげましょう。

```jsx
const WhimsicalUI = ({ children }) => {
  const navigatable = useContext(TabNavigatableContext)

  const [visible, setVisible] = useState(true)

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none'
      }}
    >
      <TabNavigatableProvider navigatable={visible}>
        {children}
      </TabNavigatableProvider>
    </div>
  )
}
```

# モーダル表示中にモーダル外にフォーカスを移動させない

モーダルダイアログ UI では、[ダイアログの外にフォーカスを回さないようにするのが一般的](https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex#%E3%83%A2%E3%83%BC%E3%83%80%E3%83%AB%E3%81%A8%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89%E3%81%AE%E3%83%88%E3%83%A9%E3%83%83%E3%83%97)です(トラップ)。[`<dialog>`要素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)を使うことで簡単に実現できますが、ブラウザ対応状況が芳しくないため、まだまだ実用は難しい状況です。

しかし、このコンテキストを使えば、はためんどくさいトラップの実装が簡単にできてしまいます。

```jsx
// モーダルが開いているかどうかの状態を保持するだけのコンテキスト
// トップレベルでモーダルを管理していたり、別の機構がある場合は必要なくなる場合も
const ModalContext = useContext({
  exists: false,
  open: () => 0,
  close: () => 0
})

const ModalProvider = ({ children }) => {
  const [count, setCount] = useState(0)

  const value = useMemo(
    () => ({
      exists: count > 0,
      open() {
        setCount(prev => prev + 1)
      },
      close() {
        setCount(prev => prev - 1)
      }
    }),
    [count]
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

// コンテキストのプロバイダにもちょっと手を加える
const TabNavigatableProvider = ({
  children,
  navigatable = true,
  force = false
}) => {
  const modal = useContext(ModalContext)

  const value = (force || !modal.exists) && navigatable

  return (
    <TabNavigatableContext.Provider value={value}>
      {children}
    </TabNavigatableContext.Provider>
  )
}
```

あとは、モーダル UI となるコンポーネントで`ModalContext`を操作すれば完成です。

```jsx
const Modal = ({ open, children }) => {
  const modal = useContext(ModalContext)

  useEffect(() => {
    if (!open) {
      return
    }

    // 開く際にコンテキストのメソッドを呼ぶ
    modal.open()

    // 閉じる際にもコンテキストのメソッドを呼ぶ
    return modal.close
  }, [open])

  return (
    <div className="backdrop">
      <div className="container">
        {/* forceがないとnavigatableの値が無視されてしまう */}
        <TabNavigatableProvider navigatable={open} force>
          {children}
        </TabNavigatableProvider>
      </div>
    </div>
  )
}
```

モーダルをどのように実装するかによって詳細な実装は変わってきますが、基本的に`<TabNavigatableProvider>`の中でモーダルが存在しているかどうかを知り、存在していれば値を強制的に`false`にするだけです。

DOM を走査してフォーカス可能な要素を取得して`tabindex`を変えて...とやるよりは、宣言的に書くことができるためバグも入りにくく、予期せぬ挙動が起きにくくなります。

# おわりに

このテクニックを使えば、子要素をプロバイダで囲うだけで簡単かつ柔軟に`tabindex`の制御を行うことができます。また、プロバイダの中にさらに条件等を追加することも可能です。

しかし、簡単になっても「いかに開発者がアクセシビリティを意識できるか」が重要であることには変わりません。`tabindex`はアクセシビリティ対応としてだけではなく、一般のユーザに向けた操作性向上にもなるのでしっかりと意識して実装していきましょう。
