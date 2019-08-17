---
name: js-bitwise-64bit
title: Javascriptでの64bit演算
description: かなり時間を食われてしまったので備忘録として残す
createdAt: 2014-08-01T00:00:00+09:00
updatedAt: 2017-11-03T11:44:28.236Z
tags:
  - blog
  - javascript
---

**2017/11/03 追記**
[ECMAScript Proposal Stage-3 に BigInt が入っており](https://github.com/tc39/proposal-bigint)、これが使用可能になればネイティブで 64bit 数値でのビット演算ができるようになる。それを使えばここに書かれている事象は発生しないし、ここに書かれていることを行う必要もなくなる。

# 概要

[このサイト](https://pocka.onl/app/moe/db/)にある MoE 装備 DB では、アイテムの産出\(アイテムの出どころ\)属性をビットフラグで管理している。
ある日、防具装飾武器に加え飲食物データも管理できるようにしようと思いたち、4 つくらい項目\(というか状態?\)を増やした。
ところが追加した項目を含めようとしても\(ビット OR\)全くビットの状態に変化がない...。
色々調べてみた結果、Javascript、もとい ECMAScript の仕様が原因だとわかった。

# 原因

ECMAScript では[64 ビットの整数でもビット演算時は 32 ビットに丸められてしまう。](http://rakuto.blogspot.jp/2007/11/javascript-64.html)

# 対処

**2016/09/06 追記**
Github にリポジトリを作っているので、そっちを見て下さい
[pocka/bitwise64](https://github.com/pocka/bitwise64)

64bit 演算を行うためのモジュールを作成した。

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

XOR,NOT には未対応\(力尽きた\)。
Prototype 拡張してるし、かなりの力技だけど、動けばそれでいいのだ。

## 参考にさせてもらったサイト

- [Young risk taker.: \[Javascript\] 64bit Number 型を上位 32bit と下位 32bit に分割:](http://rakuto.blogspot.jp/2007/11/javascript-64bit-nuber32bit32bit.html)
- [JavaScript のビット演算子に unsigned を期待してはいけない : document:](http://imaya.blog.jp/archives/5156823.html)
- [64bit - bitwise AND in Javascript with a 64 bit integer - Stack Overflow:](http://stackoverflow.com/questions/2983206/bitwise-and-in-javascript-with-a-64-bit-integer)
