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

+ 各記事は`posts`ディレクトリ配下にMarkdown形式で保存します
+ Markdownの先頭部分にYAML形式で記事のメタ情報を記述します

## 開発にあたって

+ 記事JSON、記事リストJSON、読み込まれるメインのJSファイルをビルドコマンドで生成し、静的サイトを組み上げます
+ バージョン統一のために`nvm install`と`nvm use`コマンドを実行してから開発を行ってください
+ Netlifyデプロイ時に自動的にビルドコマンドが走るため、ビルドして生成されたファイルはコミットしないでください

### 開発ビルドモード

```sh
npm run dev
```

+ `localhost:8080`に開発サーバを立てます
    - ブラウザのURLバーに`localhost:8080`とうち移動すると開発モードのサイトに移動できます
    - `src`ディレクトリ配下のJSファイルに変更があると変更されたファイルのみをコンパイルし、できればその部分だけをリロードせずに置き換え、できなければブラウザをリロードします(HMR)
+ 終了したい場合は起動したコンソールで`Ctrl + C`を押します

### まとめてビルド

```sh
npm run build
```

+ `npm run build:posts`と`npm run build:app`を実行します

### 記事JSONの生成

```sh
npm run build:posts
```

+ `posts`ディレクトリの中にある記事のMarkdownを変換し、`public/posts`配下へJSONとして出力します
+ `posts`ディレクトリの中にある記事のMarkdownを読み取り、その一覧を`public/posts.json`として保存します

### JSファイルの生成

```sh
npm run build:app
```

+ `src`ディレクトリの中身をコンパイルし、`public/bundle.js`に出力します

## Contributing

内容・誤字脱字の指摘(Issue)や修正(PR)、その他Issue/PRは大歓迎です!!

PRやIssueを投げる練習なんかにもどうぞ
