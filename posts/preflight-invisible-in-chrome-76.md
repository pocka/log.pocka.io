---
name: preflight-invisible-in-chrome-76
title: Chrome76からCORSのpreflight(OPTION)リクエストが見えない
description: Chrome76からデフォルトで有効化されたOOR-CORSによってdevtoolでpreflightが見れなくなる現象について
createdAt: 2019-08-31T20:00:00.000+09:00
updatedAt: 2019-08-31T20:00:00.000+09:00
tags:
  - blog
  - chrome
  - cors
  - preflight
---

# 現象

Chrome76 から、クロスオリジンのネットワークリクエストを発行した際の preflight(OPTION リクエスト)が devtool 上で見れなくなっている。

# 原因

Chrome76 から OOR-CORS(Out-of-Blink web security implementation)というプロジェクト(?)によってネットワークのセキュリティ関係の処理が Blink から移され、その影響で devtool から preflight を確認することができなくなったらしい。
ちなみに OOR-CORS 自体は v76 以前から実装されていたが、v76 でデフォルトで有効になるように変更された模様。

# 対処

`chrome://flags/#out-of-blink-cors`を**無効**にし、Chrome を再起動することで preflight がネットワークタブでも確認できるようになる。

ただ、あくまでもセキュリティを強化するための変更であるため、確認等が終わったら戻しておくことを推奨する。

# 備考

ちなみに OOR-CORS によって[Chrome 拡張がクロスオリジンで通信する際にも CORS が適用されるようになった](https://www.chromium.org/Home/chromium-security/extension-content-script-fetches/)らしい。

# 参考リンク

- [Chrome not showing OPTIONS requests in Network tab (Stack Overflow)](https://stackoverflow.com/questions/57410051/chrome-not-showing-options-requests-in-network-tab)
- [Issue 736308: [META] OOR-CORS: Out-of-Blink web security implementation (e.g. CORS) (chromium のバグトラッカー)](https://bugs.chromium.org/p/chromium/issues/detail?id=736308)
