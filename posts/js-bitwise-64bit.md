---
name: js-bitwise-64bit
title: Javascriptでの64bit演算
description: かなり時間を食われてしまったので備忘録として残す
createdAt: 08/17/2016
updatedAt: 2017-11-03T11:44:28.236Z
tags:
  - blog
  - javascript
---
<div class="notification is-info"><strong>2017/11/03追記</strong>
[ECMAScript Proposal Stage-3にBigIntが入っており](https://github.com/tc39/proposal-bigint)、これが使用可能になればネイティブで64bit数値でのビット演算ができるようになる。そうなった場合はここに書かれている事象は発生しないし、ここに書かれていることを行う必要もなくなる。
</div>

# 概要

[このサイト](https://pocka.onl/app/moe/db/)にあるMoE装備DBでは、アイテムの産出\(アイテムの出どころ\)属性をビットフラグで管理している。
ある日、防具装飾武器に加え飲食物データも管理できるようにしようと思いたち、4つくらい項目\(というか状態?\)を増やした。
ところが追加した項目を含めようとしても\(ビットOR\)全くビットの状態に変化がない...。
色々調べてみた結果、Javascript、もといECMAScriptの仕様が原因だとわかった。

# 原因

ECMAScriptでは[64ビットの整数でもビット演算時は32ビットに丸められてしまう。](http://rakuto.blogspot.jp/2007/11/javascript-64.html)

# 対処

<div class="notification is-info"><strong>2016/09/06追記</strong>
Githubにリポジトリを作っているので、そっちを見て下さい
[pocka/bitwise64](https://github.com/pocka/bitwise64)</div>

64bit演算を行うためのモジュールを作成した。

```javascript
//bitwise64.js
(function(root,factory){
  if(typeof define==='function'&&define.amd){
    define([],factory);
  }elseif(typeof exports==='object'){
    module.exports=factory();
  }else{
    root.NS=root.NS||{};
    root.NS['bitwise64']=factory();
  }
})(this,function(){
  "use strict";
  var
  bit64=Math.pow(2,32),
  padding='';
  for(let i=0,l=64;i<l;i++)padding+='0';

  var emulate=function(n,o){
    var
    r=Number(0),
    ts=(padding+this.toString(2)).slice(-64),
    tl=parseInt(ts.slice(-32),2),
    th=parseInt(ts.slice(0,32),2),
    ns=(padding+(Number(n)).toString(2)).slice(-64),
    nl=parseInt(ns.slice(-32),2),
    nh=parseInt(ns.slice(0,32),2);
    r=parseInt(
        (padding+(o==='&'?((th&nh)>>>0):((th|nh)>>>0)).toString(2)).slice(-32)+
        (padding+(o==='&'?((tl&nl)>>>0):((tl|nl)>>>0)).toString(2)).slice(-32)
        ,2);
    return r;
  };

  Number.prototype.bitAnd = function(n) {
    return (this>=bit64||n>=bit64)?emulate.call(this,n,'&'):(this&n);
  };
  Number.prototype.bitOr = function(n) {
    return (this>=bit64||n>=bit64)?emulate.call(this,n,'|'):(this|n);
  };
  return0;
});
```

XOR,NOTには未対応\(力尽きた\)。
Prototype拡張してるし、かなりの力技だけど、動けばそれでいいのだ。

## 参考にさせてもらったサイト

* [Young risk taker.: \[Javascript\] 64bit Number型を上位32bitと下位32bitに分割:](http://rakuto.blogspot.jp/2007/11/javascript-64bit-nuber32bit32bit.html)
* [JavaScript のビット演算子に unsigned を期待してはいけない : document:](http://imaya.blog.jp/archives/5156823.html)
* [64bit - bitwise AND in Javascript with a 64 bit integer - Stack Overflow:](http://stackoverflow.com/questions/2983206/bitwise-and-in-javascript-with-a-64-bit-integer)


