---
name: npm-package-config
title: package.jsonのconfigを使おう
createdAt: 2019-12-26T15:30:00.000+09:00
updatedAt: 2019-12-26T15:30:00.000+09:00
tags:
  - blog
  - javascript
  - npm
---

`package.json`の中の`config`プロパティ、使っていますか？

# `config`とは

[[公式リンク](https://docs.npmjs.com/files/package.json#config)]

JS のプロジェクトを動かす場合にはほぼ必ず作成する`package.json`、その中に設定するプロパティの一つです。
基本的な用途としては名前の通り、設定を保持することとなります。
値にはオブジェクトを指定することができ、その中身については自由に指定することができます。

```js
// package.json
{
  "name": "foo",
  "config": {
    "port": 8080,
    "dev": {
      "hmr": false
    },
    // 何を書いてもおｋ
    "foo": {
      "bar": ["baz"]
    }
  }
}
```

また、`npm config`コマンドや`.npmrc`ファイルによってユーザが値を上書きすることができます。

# どういう風に使うの？

基本的な使い方としては、`package.json#config`に設定を書き、利用側は環境変数`$npm_package_config_xxx`(`xxx`はプロパティ名)を使って値を取得します。

```js
// package.json
{
  "name": "foo",
  "scripts": {
    "start": "node ./index.js",
    "dev": "http-server -p $npm_package_config_dev_port"
  },
  "config": {
    "dev": {
      "port": 3000
    }
  }
}
```

```js
// index.js
const port = process.env.npm_package_config_dev_port;

someApp.start(port);
```

## `npm_package_config_xxx`で何故値が取得できるのか？

npm script を実行すると、`package.json`の中身が`npm_package_xxx`という形で自動的に展開されます。
例えば以下の`package.json`がある場合:

```js
// package.json
{
  "name": "foo",
  "version": "1.2.3",
  "config": {
    "bar": {
      "baz": 3
    }
  }
}
```

以下のような環境変数がセットされます。

```
npm_package_name = "foo"
npm_package_version = "1.2.3"
npm_package_config_bar_baz = 3
```

プロパティアクセサは`_`になります。(`$npm_package_config_bar_baz ≒ npm.package.config.bar.baz`)

また、`config`の内容に関しては`npm config`や`.npmrc`の内容が優先されるため、`ユーザの設定値 || デフォルト設定値`という挙動になります。
なお、`const pkg = require('./package.json')`としてしまうとユーザの設定値が反映されないため注意が必要です。

# 何がいいの？

これの優れている点は"標準的な方法で、ユーザが上書き可能な設定値を記載できる"というものです。

一般的にはこういった設定は環境変数で指定することが多いと思いますが、その場合 README に説明を記載したり、利用側で初期値を指定することになります。npm script で直接利用する場合は(特にクロスプラットフォームを意識するなら)簡単には初期値を指定できません。
また、クレデンシャルといったセンシティブな情報と設定値が一緒に管理されてしまうというデメリットもあります。

この方式の中で、`.env`を使って無理やりやっているケースをたまに見ます。どうやっているんだろうとよく見てみると、大量の変数が書き込まれたサンプルをコピーさせたり<sup>※1</sup>特定の`.env`ファイル(`.env.local`等)を git 管理に含めるような、アンチパターンのオンパレードとなっていることが殆どです。

`config`プロパティの場合、使うのは npm と環境変数だけで外部ツールには一切依存しません。
また、初期値の上書きは`npm config`コマンドや`.npmrc`の編集でできます<sup>※2</sup>。

```js
// package.json
{
  "name": "foo",
  "scripts": {
    "dev": "echo $npm_package_config_dev_port"
  },
  "config": {
    "dev": {
      "port": 3000
    }
  }
}
```

```shell
$ npm config set foo:dev.port 8080
$ npm run dev
# 8080
```

<small>※1 ... サンプルの値 != 初期値</small>
<small>※2 ... `npm config`は`~/.npmrc`をいじるコマンドだからやってることはぶっちゃけ一緒</small>

# どうやって上書きすればいいの？

上述したように、基本的には`npm config set`で`~/.npmrc`に値を書き込むのが一番簡単です。

ただ、これはグローバルな設定なのでプロジェクトルートに`.npmrc`ファイルを作成し、そこに値を書き込むのが個人的にはおすすめです。
.npmrc`ファイルをプロジェクトで使っていない/すべて Yarn を使うようにしている場合は`.npmrc`を git 管理から外したうえでプロジェクトルートに`.npmrc`を作成して値の上書きをさせるとよいでしょう。

なお、既にプロジェクトで`.npmrc`を使っている(git 管理対象内)の場合は、個人で上書きした設定がコミットされてしまう可能性があるため、グローバル設定に書き込むことをおすすめします。

# 具体的にどんなものを書けばいい？

以下のようなものが適しています。基本的に開発時に使うものが殆どになると思います。

- 開発サーバのポートやホスト名、バインドするインターフェイス名等(ネットワーク周り)
- ファイル監視(watch)の有効/無効化
- コンパイル先ディレクトリの指定
- etc...

また、`webpack.config.js`の中で`npm_package_config_xxx`を参照して〜といったことも可能です。(npm scripts で動く前提...普通はそうするはずなので)

ただ、npm scripts は(yarn も)コマンドライン引数をコマンドに渡せるため、内容がシンプルかつプログラムの初期値を利用する/他で初期値を指定できる場合は、コマンドライン引数を使ったほうがいいです。

```js
// package.json
{
  "name": "foo",
  "scripts": {
    // npm run dev --port 3030 / yarn dev --port 3030
    "dev": "webpack-dev-server",
    // こういうのだとcpコマンドにしか引数を渡せない
    // tscに上書き可能な設定を渡したいならconfigを使ったほうがいい
    "build": "tsc && cp ./docs ./dist/"
  }
}
```

# デメリットは？

正しく利用する(センシティブな情報を含めない等)分には基本的にはないです。

しかし、環境変数名が滅茶苦茶長くなるので npm script に書く場合はある程度気をつけたほうがいいかもしれません。
