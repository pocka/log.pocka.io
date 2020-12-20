---
name: fcitx-blink-weird-behaviour
title: fcitxでChrome/Electronの日本語入力がおかしい場合の対処法
description: "fcitxを使っていてChromeやChromium,Electron製のアプリケーションで日本語入力がおかしい場合の対処法"
createdAt: 2018-03-19T11:45:30.366Z
updatedAt: 2018-03-19T11:45:30.368Z
tags:
  - blog
  - chrome
  - linux
  - fcitx
---

# 現象

X 環境で fcitx を使っている時に、日本語入力がおかしくなる環境がある。
具体的にいうと、IME で入力中に入力したキーがたまに直接入力されてしまう。

例えば、「あいうえお」という文字列を打っていた場合、`i`キーを押した時にその入力が IME にわたらずに直接編集エリアに入力されてしまう。
IME 上に渡っている未確定文字列には影響がないため、そのまま確定すると「i あうえお」という文字列が入力されてしまう。

Chrome(Chromium)、及びそれらをレンダリングエンジンとして使うアプリケーション全てで発生する。
Electron でも発生するため、Atom や VSCode 等でも例外なく発生する。

# 原因

何らかの理由で Chrome が fcitx を使わずに xim(XInputManager)直接使ってしまっているのが原因。
Gnome 環境でのみ発生？

# 対処

環境変数`XMODIFIERS`を設定しても無視されるため、Gnome の設定に焼きこんでしまう。

```shell
gsettings set org.gnome.settings-daemon.plugins.xsettings overrides "{'Gtk/IMModule':<'fcitx'>}"

```

# 参考

- [Fcitx - ArchWiki # Ctrl+Space が GTK のプログラムで機能しない](https://wiki.archlinux.jp/index.php/Fcitx#Ctrl.2BSpace_.E3.81.8C_GTK_.E3.81.AE.E3.83.97.E3.83.AD.E3.82.B0.E3.83.A9.E3.83.A0.E3.81.A7.E6.A9.9F.E8.83.BD.E3.81.97.E3.81.AA.E3.81.84)
