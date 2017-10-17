---
name: azure-appservice-port-80
title: AzureWebAppsでポート80が使えない
description: AzureWebAppsでポート80がlistenできなかった話
createdAt: 2017-10-17T02:21:57.388Z
updatedAt: 2017-10-17T02:21:57.390Z
tags:
  - blog
  - azure
  - azurewebapps
---
# 経緯

仕事でAzureの[AppService(旧WebApps)](https://azure.microsoft.com/ja-jp/services/app-service/web/)を使い、Nodeで普通のExpressサーバを作っていた。
しかし、試しにデプロイしてみるとサーバが立ち上がらず、デプロイのログに以下のようなエラースタックが出力されていた。

```
Error: listen EACCES 0.0.0.0:80
```

# 原因

AzureWebAppsの仕組みはIISがフロントに立って`80`と`443`ポートでリクエストを受け付け、サーバが立っていればそこにプロキシ、静的サイトの場合はファイルを配信する、というもの。
そのためAzureWebAppsで80ポートをlistenしてはいけない(できない)。

# 対策

環境変数`PORT`にサーバ用のポートが用意されている為、そちらを使う。
サンプルとしてAzureWebApps上で動くHelloWorldのExpressサーバのコードを書いておく。

```js
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(process.env.PORT || 80)
```
