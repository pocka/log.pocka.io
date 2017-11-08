---
name: postcss-autoprefixer-caniuse-error
title: PostCSSのautoprefixerでUnexpected token < in JSON at position 0
description: Can I Useのモジュールのせいでautoprefixerがこけた記録
createdAt: 2017-11-08T05:01:59.248Z
updatedAt: 2017-11-08T05:01:59.250Z
tags:
  - blog
  - javascript
  - postcss
  - webpack
---
# 概要

Vue.jsのプロジェクトを作成してプロダクションビルドしたら以下のようなエラーが出た。

```shell
ERROR in ./node_modules/extract-text-webpack-plugin/dist/loader.js?{"omit":1,"remove":true}!./node_modules/vue-style-loader!./node_modules/css-loader?minimize!./node_modules/vue-loader/lib/style-compiler?{"vue":true,"id":"data-v-f9c44480","scoped":true,"hasInlineConfig":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/components/App.vue
Module build failed: ModuleBuildError: Module build failed: SyntaxError: /path/to/project/node_modules/caniuse-db/data.json: Unexpected token < in JSON at position 0
    at JSON.parse (<anonymous>)
    at Object.Module._extensions..json (module.js:588:27)
    at Module.load (module.js:503:32)
    at tryModuleLoad (module.js:466:12)
    at Function.Module._load (module.js:458:3)
    at Module.require (module.js:513:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (/path/to/project/node_modules/autoprefixer/node_modules/browserslist/index.js:5:15)
    at Module._compile (module.js:569:30)
    at Object.Module._extensions..js (module.js:580:10)
    at Module.load (module.js:503:32)
    at tryModuleLoad (module.js:466:12)
    at Function.Module._load (module.js:458:3)
    at Module.require (module.js:513:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (/path/to/project/node_modules/autoprefixer/lib/autoprefixer.js:5:18)
    at Object.<anonymous> (/path/to/project/node_modules/autoprefixer/lib/autoprefixer.js:92:4)
    at Module._compile (module.js:569:30)
    at Object.Module._extensions..js (module.js:580:10)
    at Module.load (module.js:503:32)
    at tryModuleLoad (module.js:466:12)
    at Function.Module._load (module.js:458:3)
    at Module.require (module.js:513:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (/path/to/project/node_modules/cssnano/dist/index.js:45:21)
    at Module._compile (module.js:569:30)
    at Object.Module._extensions..js (module.js:580:10)
    at Module.load (module.js:503:32)
    at tryModuleLoad (module.js:466:12)
    at Function.Module._load (module.js:458:3)
    at runLoaders (/path/to/project/node_modules/webpack/lib/NormalModule.js:195:19)
    at /path/to/project/node_modules/loader-runner/lib/LoaderRunner.js:364:11
    at /path/to/project/node_modules/loader-runner/lib/LoaderRunner.js:230:18
    at runSyncOrAsync (/path/to/project/node_modules/loader-runner/lib/LoaderRunner.js:143:3)
    at iterateNormalLoaders (/path/to/project/node_modules/loader-runner/lib/LoaderRunner.js:229:2)
    at iterateNormalLoaders (/path/to/project/node_modules/loader-runner/lib/LoaderRunner.js:218:10)
    at /path/to/project/node_modules/loader-runner/lib/LoaderRunner.js:233:3
    at context.callback (/path/to/project/node_modules/loader-runner/lib/LoaderRunner.js:111:13)
    at postcss.process.then.result (/path/to/project/node_modules/vue-loader/lib/style-compiler/index.js:71:11)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:169:7)
```

肝心なのはここ

```shell
Module build failed: ModuleBuildError: Module build failed: SyntaxError: /path/to/project/node_modules/caniuse-db/data.json: Unexpected token < in JSON at position 0
```

JSONのパースで`Unexpected token < in JSON at position 0`っていうのはJSONじゃなくてHTMLを読み込もうとしている割とよくあるエラー。

# 原因

autoprefixerはブラウザの対応状況をCan I Useの公式パッケージである[caniuse-db](https://www.npmjs.com/package/caniuse-db)というのを使って取得している。
caniuse-dbのGitHubリポジトリは[ここ](https://github.com/Fyrd/caniuse)。
このリポジトリには、<https://caniuse.com>の元データとすべての情報が詰まった`data.json`が入っている。
この`data.json`はおそらく作者が<https://caniuse.com/data.json>の内容を取得して保存している。その際間違ったURLを指定したか、URLが変わったにもかかわらず古いURLを参照したかで`301 Moved Permanently`のHTMLが保存されてしまった模様。
そして、それがnpmに公開され、そのバージョンのcaniuse-dbをインストールしてしまった場合にこのエラーが発生する。

# 対処

`node_modules`ディレクトリを消して`npm install`を行う。もしも新しいnpmを使っていて`package.lock.json`がある場合はそこにエラーバージョンが固定されてしまっているので、caniuseに依存しているモジュール(autoprefixer、もしくはそれに依存しているモジュール)を再インストールする。
今回の場合は`css-loader -> cssnano -> autoprefixer -> caniuse-db`というように依存していたので以下のコマンドで解決した。
```shell
npm uninstall --save-dev css-loader && npm install --save-dev css-loader
```

`package.lock.json`消して再インストールでもいいけど、なんかね...

# ちなみに...

今回の対象バージョンは`1.0.30000759`で、ビルドがこけたのですぐに`1.0.30000760`をリリースして修正しているので、よっぽどタイミングがよかった(悪かった)らしい。

# 参考

- HTMLが入っている`data.json`
  <https://github.com/Fyrd/caniuse/blob/2155ae55c247357dc46d289054a773f3fcc51757/data.json>
