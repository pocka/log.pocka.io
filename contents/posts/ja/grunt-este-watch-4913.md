---
name: grunt-este-watch-4913
title: grunt-este-watchで謎のファイルが検知される
description: grunt-este-watchで"4913"が検知されるお話
createdAt: 2015-02-01T21:08:17+09:00
updatedAt: 2015-02-06T21:08:17+09:00
tags:
  - blog
  - javascript
  - vim
---
# 概要

UbuntuからFedoraに開発環境を変えた際に起こったこと。いつも開発ディレクトリ以下を[grunt-este-watch](https://github.com/steida/grunt-este-watch)で監視し、コンパイルやファイルの移動等行っている。

しかし、Fedoraに変えてから、「"4913"というファイルが見つからないよ！」というエラーを吐いてタスクが止まってしまうことが頻発していた。

# 原因

## "4913"とは？

vimが生成するテンポラリファイル。 編集中のファイルを保存する際に、保存先のディレクトリにファイルを書き込むことができるかを判別するために生成される。 確認用のため、確認が終わるとすぐに削除される。

## エラーになる理由

こんな流れになっているため

1. "4913"が生成される
1. ファイル監視が検知する
1. イベントハンドラを通してeste-watchに渡される
1. 書き込みに成功したので"4913"が削除される
1. este-watchが見に行く
1. ファイルがないからエラーになる

# 対処
[@steida](https://github.com/steida)\(este-watchの作者\)はすでにglupに移行していて、grunt-este-watchは既にdeprecatedな為、~~"4913"は無視する強引なコードをソースに書き足した。ついでにエラー時にトレースログ吐くようにもした。~~\(2015.02.06追記\)
結局リポジトリをForkして修正した。[ pocka/grunt-este-watch](https://github.com/pocka/grunt-este-watch)


# 参考URL
[Temporary files creation in Linux](http://www.linuxquestions.org/questions/linux-general-1/temporary-files-creation-in-linux-675002/)内、10-08-2008, 09:54 AM のjlliagreさんのポスト
[vimのソースコードの該当箇所](https://github.com/vim/vim/blob/53076830fea6df737455523f7e235bfe4f79864d/src/fileio.c#L3704)

