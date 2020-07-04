---
date: 2015-08-26
title: "说说Collapsing Margins"
tags: ["CSS"]
categories:
- css
---

经常遇到Collapsing Margins，也就是margin折叠的情况，可总是不知道哪里出现了问题。
那就让我们来探讨下这个 margin 折叠 到底是什么鬼？它们是如何影响页面上的元素的？我们该如何拿下它？

### margin折叠是什么？

在W3C规范是这样定义margin折叠的：相邻的2个或多个盒子排列时会形成一个单一的margin。
也就是说，当两个元素的垂直边缘是相接触的，只有拥有大的margin的元素的margin将被实现，
而margin较小的元素的margin将被折叠到零。

如果两者均为负，则使用那个大的的负值做margin。当然这个定义适用于相邻元素和嵌套元素。

##### 相邻元素之间的margin折叠。

简单来说，这意味着在正常文档流中相邻的垂直块级元素，相比之下最大的margin值将被认可为的元素的margin，而具有较小的margin的元素的margin将被折叠到零。

例如，

```html
    <div class="a">
        A
    </div>
    <div class="b">
        B
    </div>
```
A有一个25px的底部margin而在它下面的B有一个20px的顶部margin

```css
    .a{
      margin-bottom: 25px;
    }
    .b{
      margin-top: 20px;
    }
```
那么此时只有25像素的底部margin会被执行，两个元素之间的距离是25px，而不是预想中的45px（25+20）。

到目前为止，我们只讨论了相邻元素的margin 折叠效应，但同样的事情对于父元素和子元素也是成立的。包括有几个子元素（即嵌套元素）的时候。

例如:

```html
    <div class="a">
        A
        <div class="b">
          B
        </div>
    </div>
```
CSS部分

```css
    .a{
      margin-top: 25px;
    }
    .b{
      margin-top: 20px;
    }
```
A，B的顶部margin此时是25px，而不是45px。

### 特殊情况

有一种情况，会导致结果和margin折叠的行为不一致：当一个元素拥有负margin，相邻元素拥有正的margin时，
两个元素之间的距离将是正负margin相加在一起得到的值。

例如：

```html
    <div class="a">
        A
    </div>
    <div class="b">
        B
    </div>
```
CSS部分：

```css
    .a{
      margin-bottom: -25px;
    }
    .b{
      margin-top: 20px;
    }
```
此时A，B之间的距离是-5px.

### 什么情况可以阻止margin折叠

如果我们简单地给div元素添加一个边框，我们可以阻止margin折叠，
当我们不想要一个可见的顶部边框的设计时，那么给div元素添加padding-top：1px 会取得同样的效果。
同样，如果将overflow属性添加除visible以外的值，同样的效果也会发生。


注意，border和padding都应适用于父元素，给子元素添加border不会阻止margin折叠，因为子元素的margin此处是在border的外边。
