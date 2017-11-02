---
name: mongoose-save-not-update
title: 'Mongoose#Documentのsaveメソッドで更新できないとき'
description: 'Mongoose#Documentのsaveメソッドでドキュメントが更新できなかった話とその対処法'
createdAt: 2017-11-02T14:51:18.010Z
updatedAt: 2017-11-02T14:51:18.011Z
tags:
  - blog
  - nodejs
  - mongodb
  - mongoose
---
# 概要

仕事で[Mongoose](http://mongoosejs.com/)を使ったプロジェクトをやっていたときに、ドキュメントが更新されない事象に遭遇。
そのまんまは書けないが、モデルは大体こんな感じで

```js
const Photo = mongoose.Model('Photo', {
  // オーナユーザID
  owner: ObjectId,
  // 写真のメタ情報
  metadata: Object
```

スキーマがきっちり決まっていない外部のJSON(Object)をそのままDBに突っ込むということをしていた。

ちなみに保存処理はこんな感じ。

```js
const photos = await Photo.find({/* てきとうなクエリ */})

return Promise.all(photos.map(photo => {
  photo.metadata.tags = photo.metadata.tags ? ['myawesomeapp', ...photo.metadata.tags] : ['myawesomeapp']

  return photo.save()
})
```

しかし実行してデータを確認してみると`metadata.tags`に`myawesomeapp`がない...。

# 原因

Mongooseがドキュメントに変更があったと認識していない為、保存処理が走っていない模様。

# 対処

[Document#markModified](http://mongoosejs.com/docs/api.html#document_Document-markModified)を呼んでから`save`メソッドを呼ぶ。

さっきの例だとこんな感じ。

```js
const photos = await Photo.find({/* てきとうなクエリ */})

return Promise.all(photos.map(photo => {
  photo.metadata.tags = photo.metadata.tags ? ['myawesomeapp', ...photo.metadata.tags] : ['myawesomeapp']

  photo.markModified('metadata') // 追加

  return photo.save()
})
```

# 参考

<https://stackoverflow.com/a/39823651>
<https://qiita.com/Eiryyy/items/2b287023256e67172203>

