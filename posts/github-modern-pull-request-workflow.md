---
name: github-modern-pull-request-workflow
title: モダンなPull Requestの回し方
description: GitHubの機能をフルに活かして効率よくPull Requestを回す方法
createdAt: 2019-04-26T16:00:00.000+09:00
updatedAt: 2019-04-26T16:00:00.000+09:00
tags:
  - article
  - github
  - pullrequest
  - workflow
---

# はじめに

今の時代、GitHub を使って複数人で開発する場合は、基本的に Pull Request(以降 PR)を使って開発することが殆どだと思います。
GitHub 側もここを重要視しているようで、色々な新しい機能や改善を継続的に投入してくれています。しかし、実際の利用シーンではこれらの機能があまり使われておらず、原始的な PR を見ることが多々あります<sup>※1</sup>。

エンジニアならば自動化/効率化はして当たり前だよね！<sup>※2</sup>ということで、PR 周りの便利な機能や運用方法を紹介したいと思います。

<small>※1 ... 注: 個人の感想です</small>
<small>※2 ... 本音は「レビューめんどいからもっと楽させて」</small>

# 準備編

PR を建てる前にリポジトリの設定をしておきましょう。

## Pull request template

- [公式の説明ページ(English)](https://help.github.com/en/articles/creating-a-pull-request-template-for-your-repository)

PR のテンプレートを設定できる機能です(そのまま)。`.github/PULL_REQUEST_TEMPLATE.md`のように特定の場所にテンプレートファイル(Markdown)を作成すると、PR を建てる際にその内容が初期値として入力された状態になります。
種類ごとにテンプレートを作成することができるので、バグ修正や機能追加、その他軽微な変更等で分けておくといいかもしれません。

```hbs
.github/
  PULL_REQUEST_TEMPLATE/
    feature.md
    fix.md
```

これを使うことで PR のフォーマットを統一することができ、レビュアーに優しいデベロッパーになれます。個人的にはほぼ必須レベルです。

テンプレート内に入れておくといい項目としては、

- 概要
- 関連 Issue/PR
- (ある場合)Netlify や now.sh でのプレビュービルド URL
  - Storybook 等との相性が最高
- チェックリスト

あたりがメジャーかと思います。

## CODEOWNERS

- [公式の説明ページ(English)](https://help.github.com/en/articles/about-code-owners)

![code ownersがレビュアーに指定されているところ](/images/article-20190426-02.png)

`このファイルを編集したらこの人をReviewerに指定する`というルールをファイルに書いておき、それを自動でやってくれるシステムです。

`.github/CODEOWNERS`というファイルを作成して、`ファイルパターン @ユーザ1 @ユーザ2 ...`というようなルールを書いていくだけです。コード化されたルールに基づいて自動でやってくれるので、新しい開発メンバが入ってきたときに説明する手間もなくなり、面倒なレビュアー指定もやらなくて済みます。

また、この機能は後述する Draft 機能と非常に相性がいいので、Draft を使う場合には是非導入したほうがいいです。

ファイル単位の指定になるので、`package.jsonの更新はJSエキスパートに見てもらいたい` `docs/配下はPMにも見てほしい`といった様々なわがままを叶えることができます。面倒な場合は`* @レビュー担当`でも十分です。

便利でシンプルな機能ですが、ルールの適用順に少し癖があるので公式のドキュメントをちゃんと読み込んでおいたほうがいいです。

# PR 建てるぜ編

PR を建てるところです。

## Draft pull requests

- [公式の説明ページ(English)](https://help.github.com/en/articles/about-pull-requests#draft-pull-requests)
- [公式リリースアナウンス](https://github.blog/jp/2019-02-19-introducing-draft-pull-requests/)

よく「公式 WIP 機能」と呼ばれるやつです。PR を Draft(直訳だと下書き)として作成し、まだマージできる状態じゃないよ！と明示することができます。

DraftPR は`Ready for review`ボタンを押すまではマージできず、`CODEOWNERS`が設定してある場合は Reviewer の自動アサインもペンディングされます。

`タイトルの頭に"WIP:"をつける`という手動運用と大差ないと思えるかもしれませんが、マージができませんし WIP の取り忘れ等もなくなるのでこちらのほうが断然いいです。

## Issue の自動クローズ

- [公式の説明ページ(English)](https://help.github.com/en/articles/closing-issues-using-keywords)

PR がアップストリームブランチ(大体 master)にマージされたタイミングで、特定の Issue を自動的に Close する機能です。使い方は超絶簡単、特定の単語のあとに Issue への参照を書くだけです。

```hbs
fix #6
close #7
resolve #8
```

これすら書き忘れる~輩~人がいる場合はテンプレートに入れておくといいでしょう。

## セルフコメント

PR のレビューコメントは Approve/Request changes でなければ自分で書くこともできます。これを利用して、コード中の気になる部分にコメントを書いたり、コードに書くほどでもないメモやちょっとしたことを書いておき、レビュアーに見てもらうことができます。

どういう意図で書いたのかがわかるだけでレビューの負担や、やり取りのコストはかなり減る(と個人的に感じている)ので必要に応じて書くといいです。

ちなみに、割と大きい OSS ではよく見かける行為です。

# レビューするぜ編

レビューをします。

## Auto suggestion

![Auto suggestionのボタン](/images/article-20190426-01.png)

レビュアーが修正内容を提示して、レビュイー(レビュー受ける側)がそれをボタンぽちっで取り込む機能です。
誤字やちょっとした修正に使うと便利ですが、レビュアーはエディタで編集しているわけではなく、テストも走らせているわけではないので、クリティカルな部分はちゃんとレビュイーが修正したほうがいいです。

## Resolve conversation

- [公式の説明ページ(English)](https://help.github.com/en/articles/commenting-on-a-pull-request#resolving-conversations)

レビューコメントが解決されたら`Resolve conversation`ボタンを押して、コメントを折りたたみましょう。以前は該当部分のコードが変更されたら自動で非表示になる仕様でしたが、アップデートで手動 Resolve しないと非表示にならなくなりました。

レビュイー/レビュアー両方のためにもちゃんと押してあげると、情報ノイズが減りやりとりの効率があがります。

なお、どちらが押すかについてはプロジェクト内で決めたほうがよさそうです。

# マージするよ編

ついにマージします。

## Delete branch

マージ後に該当のブランチをボタンぽちっで消せます。
後始末はきちんとしましょう。

# おわりに

GitHub は単なる git リポジトリとしての機能だけでなく、ワークフローに関わる様々な機能を提供してくれています。また、それらは日々改善されたり追加されたりしているため、定期的に GitHub ブログを見てみたり「このボタンなんだろうな〜」って調べてみたりするといいかと思います。大した変化に見えなくても塵も積もれば山となるのです。
