---
name: try-wasm-using-parcel-and-rust
title: Parcel+Rustで超お手軽WebAssembly体験
description: Parcel@1.5.0から導入されたRustサポートを使って超簡単にWebAssemblyを体験してみよう!
createdAt: 2018-02-22T14:33:47.625Z
updatedAt: 2018-02-22T14:33:47.627Z
tags:
  - article
  - javascript
  - parcel
  - rust
  - webassembly
---
# Rustをimportできるモジュールバンドラ

[Parcel](https://github.com/parcel-bundler/parcel)とは「Blazing fast, zero configuration web application bundler」を謳い文句にするフロントエンドのモジュールバンドラ。
`index.html`をエントリポイントとして多様なアセットを自動判別しバンドルすることができる。
[Webpack](https://github.com/webpack/webpack)が「JS以外のファイルもimportできるJSバンドラ」<sup>(1)</sup>なのに対して、こちらは「今のフロントエンドに必要なものをよしなに纏めてくれるモジュールバンドラ」といったところみたい。

この、「今のフロントエンドに必要なもの」はどうやら何でも取り込めるようにしたいようで、なんとバージョン1.5.0のリリースでwasm(WebAssembly)と[Rust](https://github.com/rust-lang/rust)がサポートされた。

<small>(1) ... プラグインで他のファイルも吐けるが基本はJSファイルのためのバンドラ</small>


# Rustって何よ

Rustとはなんぞやという人のために適当に説明すると、RustとはCやC++といったプログラミング言語の置き換えを狙うシステムプログラミング言語である。
特徴としては「GCはないけどメモリの手動管理も不要」だとか「関数型のフレーバーが強く安全で高速なプログラムが書ける」とかいろいろある。
ただ、ぶっちゃけフロントエンド的には「WebAssemblyを生成できる<sup>(2)</sup>プログラミング言語」ということさえ覚えておけばとりあえずは問題ない。

<small>(2) ... ちなみにasm.jsも吐ける</small>


# 普通にWebAssemblyを使うには...

Parcelを使わずにWebAssemblyを使用するのは正直めんどくさい。
まずRustやCなんかを`.wasm`に変換し、それをfetch APIやXHRで読み込み、内容をWebAssembly APIで生成して、取得したオブジェクトの中のプロパティを参照して...とする必要がある。
何よりも`.wasm`ファイルという中間ファイルが必要になってくる上、開発環境のセットアップも必要になる<sup>(3)</sup>のがかったるい。
というか何より、今時のフロントエンドエンジニアならJSで使う処理はJSでimportしたいよね！

<small>(3) ... ぶっちゃけそこまで手間ではないが、複数人で開発するときは面倒になる</small>

# 試してみる

ということで、Parcelを使って超お手軽にwasm体験をしてみよう!
ちなみに実際に動かすまでに叩くコマンドは4つだけ。やばい。

## 前提環境

- Node.js(nvmでも)インストール済み(この記事ではnpxを使うため、`npm@>=5.2.0`を推奨)
- LinuxとかMacOS(他UNIX系OSなら多分大丈夫)
  - Windowsは知らない
- 適当に作業用ディレクトリが切ってある

## Rustupのインストール

ParcelのRustサポートを使うために唯一必要な依存物。
Rustとかその周辺ツールを簡単にインストールしてくれる便利ツールで、Rustを使うならほぼ必須(らしい)。

1. [Rustupの公式サイト](https://www.rustup.rs/)に書いてあるとおりに、表示されているコマンドをターミナルで叩く

これで事前準備はおわり。

## Parcelのインストール

作業用ディレクトリでいつものようにnpmを初期化。

```sh
$ npm init
# 適当に質問に答える
```

parcel本体をインストール。

```sh
$ npm i --save-dev parcel-bundler
```

## アプリケーションを書く

まずエントリポイントとなる`index.html`を適当に書く。

```html
<html>
  <body>
    <div id="app"></div>
    <script src="./index.js"></script>
  </body>
</html>
```

次に`index.js`を書く。

```js
import { add } from './math.rs'

document.querySelector('#app').innerHTML = add(1, 2)
```

最後に`math.rs`を書く。`.rs`はRustのソースコード拡張子。

```rust
#[no_mangle]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

これで、「数値を足すwasm内関数」をimportして実行、表示するアプリケーションができた。


## 動かしてみる

ローカルnpmパッケージを起動するnpxを使ってparcelを実行する。

```sh
$ npx parcel index.html

# npxがない場合は以下のコマンド
# node node_modules/.bin/parcel index.html
```

起動に成功すると`Server running at http://localhost:1234`みたいに出力されるため、ブラウザに表示されたアドレス(この場合は`http://localhost:1234`)を打ち込んでみると、作成したアプリケーションが起動しているのがわかるはずだ。

## wasmの力を体感してみる

これだけだと処理速度もへったくれもないので重たい処理を動かしてwasmの速さを体感してみよう。
お題として、[フィボナッチ数](https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A3%E3%83%9C%E3%83%8A%E3%83%83%E3%83%81%E6%95%B0)の計算速度をJavascriptと比較してみる。
計算方法はWikipediaにのってるやつをそのまま使うものとする。

まず、先ほどの`math.rs`に以下の内容を追記する。

```rust
#[no_mangle]
pub fn fibo(n: i32) -> i32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibo(n - 2) + fibo(n + 1)
    }
}
```

次に`index.js`のimport文で作成した`fibo`関数を読みこむようにし、

```js
import { fibo, add } from './math.rs'
```

以下の内容を追記する。
変数`times`の値はPCスペックによっては下げた方がいいかも。

```js
const fiboJS = n => {
  switch (n) {
    case 0:
      return 0
    case 1:
      return 1
    default:
      return fiboJS(n - 2) + fiboJS(n - 1)
  }
}

const times = 40

console.time('wasm')
fibo(times)
console.timeEnd('wasm')

console.time('js')
fiboJS(times)
console.timeEnd('js')
```

ファイルを保存すると、ブラウザの内容が自動更新される。
ブラウザの開発者ツール(`Ctrl+Shift+I`)を開くと、コンソールタブにwasm版関数の処理時間とjs版関数の処理時間が出ているはずだ。

ちなみに以下の環境で上記コードを実行するとwasm版: 580ms~700ms、js版: 2100ms~2200msとなった。

- Firefox 58.0.2(64bit)
- Core i5-7500
- RAM 32GB
- Linux(ElementaryOS)

# 実用できるか

wasmの面倒な手続きを踏まずに直接importできるのは(個人的には)革命的に素晴らしい機能だ。
しかし、現状(1.6.2)ではHMR(Hot Module Replacement)もLive reloadも効かないので快適に作業できるかと言われたら微妙と答えてしまうだろう<sup>(4)</sup>。
また、wasmの関数に渡せるのは数値型のみであり、配列や文字列を扱おうとなるとwasmの仮想メモリをいじることになり、お手軽さが失われてしまう。
なので、「単純だが処理の重い数値計算」という用途以外には現状では使えないと思う。

ただ、Rustにはwasm側(Rust側)からブラウザAPIを叩くことのできる[stdweb](https://github.com/koute/stdweb)というライブラリがあり、それをParcelからも使えるようにする[同じ作者のプラグイン(実験段階)](https://github.com/koute/parcel-plugin-cargo-web)もある。
もしかしたら将来的にはRustでゴリゴリのフロントエンドアプリケーションを簡単に書けるようになるのかもしれない。
stdwebのparcelプラグインについては試してみてから使えそうであればまた記事を書く予定。

<small>(4) ... HMRに慣れすぎた人間の末路である</small>

# おまけ

## Rustソースコードの適当な解説

特に関数型言語を触ったことがない人にはいろいろと不思議なソースコードに見えるだろうからざっくりと解説。

```rust
#[no_mangle]
```

デフォルトだと関数名が最適化だかなんだかで勝手にいじくられてしまうため(mangle)、「そのままにしといて!!」とコンパイラにお願いする記述。
`#[foo]`というシンタックスは[Attributes](https://doc.rust-lang.org/book/first-edition/attributes.html)という言語機能で、JSのデコレータを強くしたものだと思っておけばいい。

---

```rust
pub fn add(a: i32, b: i32) -> i32 {
  a + b
}
```

- `pub`は[エクスポート指定子](https://doc.rust-lang.org/book/first-edition/crates-and-modules.html#exporting-a-public-interface)。JSの`export`みたいなもん。
- `fn`はJSで言うところの`function`。ちなみにGo言語は`func`だよ。
- 関数名と引数名は特に問題はないかと思う。型指定はTypescriptと殆ど同じだけど、返り値の指定にシングルアロー演算子(`->`)を使うところが独特。
  - ちなみに`i32`は32bitの整数型のこと。Integer(32bit)。
  - この関数は「32bitの整数を2つ受け取って32bitの整数を返す公開関数」ということになる。
- `a + b` ... Rustは関数ボディの最後にセミコロンなしで式文を書くことで、その値を返すことができる。明示的に`return`することもできるけど、できるだけ暗黙のreturnを使ったほうがいいらしい。
    ```rust
    pub fn add(a: i32, b: i32) -> i32 {
        return a + b;
    }
    ```

---

```rust
match n {
    0 => 0,
    1 => 1,
    _ => fibo(n - 2) + fibo(n - 1)
}
```

- `match`は関数型言語でよく見るパターンマッチ式。JSの`switch`文に似ているけれども、こっちは「式」なので、変数に代入したり値を返したりすることができる。
  - このコードだと暗黙のreturnで`match`の値を返している。


## Rustが気になったあなたへ

上の説明で「Rustすごい!」とか「こんな説明じゃわかんねぇよ!」ってなった人はRustの[The Book(英語)](https://doc.rust-lang.org/book/first-edition/)を読むと幸せになれる。
英語だけれどもかなりわかりやすいのでおすすめ。

[日本語版もあるみたいだけど](https://rust-lang-ja.github.io/the-rust-programming-language-ja/1.6/book/README.html)バージョンどうなってんのかとか更新状況とかは不明。英語読めるなら英語版を読んだほうがいいと思う。

