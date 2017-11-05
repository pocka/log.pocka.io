---
name: how-to-oculus-rift-supersampling
title: OculusRiftCV1でスーパーサンプリング
description: OculusRiftCV1でスーパーサンプリングを設定する方法
createdAt: 2016/10/28
updatedAt: 2017-11-05T04:14:10.825Z
tags:
  - article
  - oculus rift
  - vr
---
# 概要

Oculus Rift CV1ではツールを使うことによってスーパーサンプリング(実際に表示される解像度よりも高い解像度でレンダリングを行うこと)をすることができる。スーパーサンプリングを行うことで、表示解像度は変わらないものの、より精細で高品質なグラフィックを表示することができる。
スーパーサンプリング自体についての詳細は[Wikipediaとか見といてくださいな。](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%B3%E3%83%81%E3%82%A8%E3%82%A4%E3%83%AA%E3%82%A2%E3%82%B9#3DCG.E3.81.AB.E3.81.8A.E3.81.91.E3.82.8B.E3.82.A2.E3.83.B3.E3.83.81.E3.82.A8.E3.82.A4.E3.83.AA.E3.82.A2.E3.82.B7.E3.83.B3.E3.82.B0)

Oculus Rift CV1でスーパーサンプリングを行う方法は2017/11/05現在、以下の3つがある。

- ソフト内の設定で変更する(対応ソフトのみ)
- 公式の用意したデバッグツールを使用する
- 有志の作成したツールを使用する

3つとは書いたが、うち1つはソフト側の対応が必須な為、ソフトを限定せずに使う場合は選択肢は2つとなる。

ここではその2つの方法について説明する。

# 公式ツールを使う方法

Oculusの用意したデバッグツールを使用してスーパーサンプリングを行う方法。
こちらは、OculusHomeがインストールされた際に一緒に入ってくるOculus Debug Toolを使い、"1ピクセルに表示するピクセル密度"(直訳)を上書きする。

1. **先ず、先にOculusHomeを立ち上げておく**

1. `<Oculusインストールフォルダ>/Support/oculus-diagnostics/OculusDebugTool.exe`を起動する
   普通にインストールした場合は以下のパスにあるはず
  `C:/Program Files/Oculus/Support/oculus-diagnostics/OculusDebugTool.exe`

1. 一番上の`Service`内にある`Pixels Per Display Pixel Override`に`1.0`から`2.0`までの数値を入力する
1. Oculus Debug Toolを閉じずにVRアプリケーションを起動する

なお、設定する数値についてはピクセル倍率となるため、`1.0`で等倍、`2.0`で(横解像度x2)x(縦解像度x2)=4倍となる点に注意。

ちなみに、__以前はOculus SDKに同梱されていたがある時点から同梱されなくなり、代わりにOculusインストールフォルダに入るようになった__ので注意。

# Oculus TrayToolを使う方法

このあと書く予定...


