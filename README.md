<div align="center">

# log.pocka.io

[![Netlify](https://www.netlify.com/img/global/badges/netlify-dark.svg)](https://www.netlify.com)

[![GitHub top language](https://img.shields.io/github/languages/top/pocka/log.pocka.io.svg)]()
[![GitHub last commit](https://img.shields.io/github/last-commit/pocka/log.pocka.io.svg)]()
[![GitHub commit activity the past week, 4 weeks, year](https://img.shields.io/github/commit-activity/y/pocka/log.pocka.io.svg)]()
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/pocka/log.pocka.io.svg)]()
[![GitHub issues](https://img.shields.io/github/issues/pocka/log.pocka.io.svg)]()

これは[log.pocka.io](https://log.pocka.io)のリポジトリです

</div>

---

## 記事の編集

* 各記事は`posts`ディレクトリ配下に Markdown 形式で保存します
* Markdown の先頭部分に YAML 形式で記事のメタ情報を記述します

## 開発にあたって

* 記事 JSON、記事リスト JSON、読み込まれるメインの JS ファイルをビルドコマンドで生成し、静的サイトを組み上げます
* バージョン統一のために`nvm install`と`nvm use`コマンドを実行してから開発を行ってください

### 開発ビルドモード

```sh
npm run dev
```

* `localhost:8080`に開発サーバを立てます
  * ブラウザの URL バーに`localhost:8080`とうち移動すると開発モードのサイトに移動できます
  * `src`ディレクトリ配下の JS ファイルに変更があると変更されたファイルのみをコンパイルし、できればその部分だけをリロードせずに置き換え、できなければブラウザをリロードします(HMR)
* 終了したい場合は起動したコンソールで`Ctrl + C`を押します

### まとめてビルド

```sh
npm run build
```

* `npm run build:posts`と`npm run build:app`を実行します

### 記事 JSON の生成

```sh
npm run build:posts
```

* `posts`ディレクトリの中にある記事の Markdown を変換し、`src/pages/posts`配下へ Vue のコンポーネントとして保存します
* `posts`ディレクトリの中にある記事の Markdown を読み取り、その一覧を`src/assets/posts.json`として保存します

### JS ファイルの生成

```sh
npm run build:app
```

* `src`ディレクトリの中身をコンパイルし、`public`ディレクトリに出力します

## Contributing

内容・誤字脱字の指摘(Issue)や修正(PR)、その他 Issue/PR は大歓迎です!!

PR や Issue を投げる練習なんかにもどうぞ
