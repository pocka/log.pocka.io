---
name: chrome-devtool-full-size-screenshot-bug
title: Chrome開発者ツールのスクリーンショットバグ
description: ページ全体のスクリーンショットを撮る時のバグ
createdAt: 2017-09-29T05:38:12.812Z
updatedAt: 2017-09-29T05:38:12.815Z
tags:
  - blog
  - chrome
  - chromium
---
# 概要

HeadlessなChromeを[Remote Debugging Protocol](https://chromedevtools.github.io/devtools-protocol/)経由で操作してスクリーンショットを撮っていたらバグに遭遇した。

# 事象

ページ全体のスクリーンショットをとった際に、一部サイトのレイアウトがおかしくなる。

# 原因

サイト内CSSで`vh`を使っている場合、それがスクリーンショット範囲(クリップ領域)の高さで計算される為、その要素の高さがおかしくなる(ページコンテンツの総高さに引っ張られる)。
特にサイトのメインコンテンツを`100vh`とかで指定している場合は顕著。

# 対処

公式にバグ報告が上がっているので祈りながら待つしかない...

<https://bugs.chromium.org/p/chromium/issues/detail?id=761136>
