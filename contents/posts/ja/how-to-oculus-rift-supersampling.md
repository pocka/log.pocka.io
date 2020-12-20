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
    ![Oculus Debug Tool](/images/oculus-debug-tool.png)
1. Oculus Debug Toolを閉じずにVRアプリケーションを起動する

なお、設定する数値についてはピクセル倍率となるため、`1.0`で等倍、`2.0`で(横解像度x2)x(縦解像度x2)=4倍となる点に注意。

ちなみに、__以前はOculus SDKに同梱されていたがある時点から同梱されなくなり、代わりにOculusインストールフォルダに入るようになった__ので注意。

# Oculus TrayToolを使う方法

こちらは有志の作成したOculus TrayToolを使う方法。
Oculus TrayToolはタスクトレイに常駐してOculus Riftを使う際に便利な機能を提供してくれるユーティリティソフトウェア。スーパーサンプリングはその中の機能のひとつで、他にもASWの設定(Oculus DebugToolでもできる)やオーディオデバイスの切り替え機能などもある。

1. [公式フォーラムにスレッドが立っており、](https://forums.oculus.com/community/discussion/47247/oculus-traytool-supersampling-profiles-hmd-disconnect-fixes-hopefully)そこにリンク(Dropbox)が貼ってあるのでインストーラをダウンロードする
1. ダウンロードしたインストーラを起動し、Oculus TrayToolをインストールする
1. インストール後、Oculus TrayToolを起動して`Game Settings`にある`Super Sampling`から設定値を選ぶ
   ![Oculus TrayTool](/images/oculus-traytool.png)
1. Oculus TrayToolは最小化させて常駐させておくと便利

設定値についてはおそらくDebugToolと同じで、`1.0`が等倍で`2.0`が2x2の4倍になると思われる。
また、TrayToolはOculusHomeに登録されたゲームであれば、ゲーム毎のプリセットを設定することが可能。

1. `Game Settings`の`Profile`にある`View/Add Profiles`ボタンをクリック
1. OculusHomeのライブラリに登録されているゲーム一覧が出てくるので、設定したいゲームの行の`Super Sampling`列をクリックして設定値を選択


ちなみにプロファイル設定でのスーパーサンプリング設定だと何故か2.5まで選べる。

# どっちを使えばいい？

個人的にはOculus TrayToolをオススメする。
というのも、Oculus Debug Toolは特に公式にやり方が書いてある方法でもなく、かつ"デバッグツール"をゲーム目的で使うのはどうかと思うためである。

サードパーティのよくわからないソフトウェアが嫌だ！というならばOculus Debug Toolでもいいが、使い勝手やweb上の情報量を考えるとOculus TrayToolを使うのが安全かな、と思う。
