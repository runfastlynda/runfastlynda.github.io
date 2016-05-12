---
layout: post
title: "JavaScript setTimeout 为什么立即执行了"
categories:
- 博客
---

我们都知道setTimeout是用来延时执行的，可有时确定了延迟时间，延迟执行的函数确立即执行了，这到底是为什么呢？下面分两种情况进行分析：

### 情况一

```javascript
setTimeOut(  test(), 100000 );
function test(){
  alert("it's A good question");
}
```
重点就是不是test，而是test()，这样浏览器解码的时候扫到这一行的代码直接就执行了！

setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。

### 情况二

```javascript
setTimeout(function() { console.log('sam chen'); }, 2200000000);
```
立即执行了。而不是我们所预想的，会在至少 2200000000ms 后触发。

原因是这样的：

setTimeout 的第二个参数 timeout 的最大值是 21474836472，我们的设定值超过它，回调函数就会立即执行。

