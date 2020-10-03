---
layout: post
title:  "jQuery基础教程-学习笔记（10）"
date:   2015-10-05 18:28:16
categories:
- jquery
---

### JavaScript闭包

+ 所谓内部函数,就是定义在另一个函数中的函数。

```JavaScript
function outerFn() {
  function innerFn() {
  }
}
```
在outerFn()内部调用innerFn()是有效的,而在outerFn()外部调用innerFn()则是无效的

+ JavaScript则允许开发人员像传递任何类型的数据一样传递函数。也就是说,JavaScript中的内部函数能够逃脱定义 它们的外部函数。逃脱的方式有很多种。

例如,可以将内部函数指定给一个全局变量:

```JavaScript
var globalVar;
function outerFn() {
  console.log('Outer function');
  function innerFn() {
    console.log('Inner function');
  }
  globalVar = innerFn;
}

console.log('outerFn():');
outerFn();
console.log('globalVar():');
globalVar();
```
在函数定义之后调用outerFn()会修改全局变量globalVar,此时它引用的是innerFn()。这意味着,后面调用globalVar()的操作就如同调用innerFn()一样,也会执行输出消息的语句

通过在父函数中返回值来“营救出”内部函数的引用:

```javascript
function outerFn() {
  console.log('Outer function');
  function innerFn() {
    console.log('Inner function');
  }
  return innerFn;
}
console.log('var fnRef = outerFn():');
var fnRef = outerFn();
console.log('fnRef():');
fnRef();
```
这里,并没有在outerFn()内部修改全局变量,而是从outerFn()中返回了一个对innerFn()的引用。通过调用outerFn()能够取得这个引用,而且,这个引用可以保存在变量中,也可以自己调用自己,从而触发消息输出

这种即使在离开函数作用域的情况下仍然能够通过引用调用内部函数的事实,意味着只要存在调用这些内部函数的可能,JavaScript就需要保留被引用的函数。而且,JavaScript运行时需要跟踪引用这个内部函数的所有变量,直至最后一个变量废弃,JavaScript的垃圾收集器才能出面释放相应的内存空间。

+ 当内部函数在定义它的作用域的外部被引用时,就创建了该内部函数的一个闭包。在这种情况下,我们称既不是内部函数局部变量,也不是其参数的变量为自由变量,称外部函数的调用环境为封闭闭包的环境。从本质上讲,如果内部函数引用了位于外部函数中的变量,相当于授权该 变量能够被延迟使用。因此,当外部函数调用完成后,这些变量的内存不会被释放,因为闭包仍然需要使用它们。

```javascript
function outerFn() {
  var outerVar = 0;
  function innerFn() {
    outerVar++;
    console.log('outerVar = ' + outerVar);
  }
  return innerFn;
}
var fnRef = outerFn();
fnRef();
fnRef();
var fnRef2 = outerFn();
fnRef2();
fnRef2();
```
这在本质上是创建了一个新对象,自由变量就是这个对象的实例变量,而闭包就是这个对象的实例方法。而且,这些变量也是私有的,因为不能在封装它们的作用域外部直接引用这些变量,从而确保了面向对象的数据专有特性。


### 使用QUnit测试JavaScript

+ QUnit是一个测试框架，一个自动化的系统,它来帮我们运行测试。这个框架是由jQuery团队编写和维护的。

+ 下载了QUnit文件之后,接下来要设置HTML测试文档。而且HTML文件与qunit.js和qunit.css放在相同的测试文件夹中。

+ QUnit提供两个级别的分组,分别以它们的函数调用命名:module()和test()。其中,module 类似于通用的类别,测试将在该类别下运行;而test实际上是一组接收回调函数的测试,在这些回调函数中运行相应测试的特定单元测试。

+ 测试在页面中选择元素的能力

```javascript
test('Child Selector', function() {
  expect(1);
  var topLis = $('#selected-plays > li.horizontal');
  equal(topLis.length, 3, 'Top LIs have horizontal class');
});
```
这里实际上加入了两个测试。第一个是expect()测试,它告诉QUnit我们想在这个测试集中运行多少个测试。然后,因为我们想要测试在页面中选择元素的能力,所以使用equal()测试来比较顶级li元素与数值3。如果这两个值相等,测试通过且通过的次数会加1。

```javascript
test('Attribute Selectors', function() {
  expect(2);
  ok(this.topLis.find('.mailto').length == 1, 'a.mailto'); equal(this.topLis.find('.pdflink').length, 1, 'a.pdflink');
});
```
另一种测试方式:ok()。这个测试接收两个参数:一个应该被求值为true的表达式和一个描述。把topLis变量的Child Selector测试转移到了模块的setup()回调函数中。module()接收可选的第二个参数,这个参数是一个对象,可以包含setup()和teardown()函数。在这两个函数中,可以使用this关键字为模块中的所有测试一次性地指定变量。

+ 异步测试

在QUnit中,我们要使用一个特殊的测试集,它的名字叫asyncTest()。这个测试集与常规的test()测试集很相似;不同的是,在我们调用一个特殊的start()函数恢复它们之前,它们会暂停运行。

```javascript
asyncTest('JSON', function() {
  $.getJSON('b.json', function(json, textStatus) {
    //在这里添加测试
  }).always(function() {
    start();
  });
});
```
